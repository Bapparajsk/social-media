"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from '@mantine/hooks';

// import { Card } from "@/components/postCard";
import { useProfile } from "@/contexts/profile.context";
import { useEffect, } from "react";
import Server from "@/lib/axios";
import { Card } from "../postCard";

export default function UserPost({ userFetching }: { userFetching: boolean }) {

    const { profile } = useProfile();

    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['userPost', profile?.userId],
        queryFn: async ({ pageParam = 1 }) => {
            if (profile === null) return;

            const { data } = await Server.get(`/api/post/${profile.userId}?page=${pageParam}`);
            return data;
        },
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
        retry: 1,
        gcTime: 1000 * 60,
    });

    const { ref, entry } = useIntersection({
        root: null,
        threshold: 0.5
    });

    useEffect(() => {
        if (entry?.isIntersecting && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [entry, isFetchingNextPage]);
    
    const posts = data?.pages.flat()?.map((post: any) => post.posts).flat();

    return (
        <div className="py-2">
            {userFetching ? <h1>lodiang</h1> : posts?.map((post: any, idx: number) => {
                if (idx === posts.length - 1) {

                    return <div key={idx} ref={ref} className="mb-2">
                        <Card likes={post.like} createdAt={post.createdAt} author={post.author} id={post._id} isOwner={true} key={idx} title={post.description || "nothing title"} postImage={post.postImage}/>
                    </div>;
                }
                return <div key={idx} className="mb-2">
                    <Card likes={post.like} createdAt={post.createdAt} author={post.author} id={post._id} isOwner={true} key={idx} title={post.description || "nothing title"} postImage={post.postImage}/>
                </div>;
            })}
        </div>
    );
}
