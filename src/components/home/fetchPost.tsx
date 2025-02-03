"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from '@mantine/hooks';
import { useEffect, } from "react";

import { useUser } from "@/contexts/user.context";
import Server from "@/lib/axios";
import { Card } from "../postCard";
import SkeletonPostCard from "../skeletons/postCard";

export default function FetchPost({ userFetching }: { userFetching: boolean }) {

    const { user, setUser } = useUser();
    
    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['Post'],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await Server.get(`/api/post?page=${pageParam}`);
            
            return data;
        },
        getNextPageParam: (lastPage) => lastPage?.nextPage,
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

    const handleLike = async (id: string | undefined) => {
        if (!id) return;
        if (!user) {
            return;
        }

        await Server.post(`/api/post/${id}/like`);

        const like = user.likedPosts;
        if (like[id]) {
            delete like[id];
        } else {
            like[id] = id;
        }

        setUser({ ...user, likedPosts: like });
    };

    return (
        <div className="py-2">
            {userFetching ? <SkeletonPostCard count={2} /> : posts?.map((post: any, idx: number) => (
                <div key={idx} ref={idx === posts.length - 1 ? ref : null} className="mb-2">
                    <Card 
                        isLiked={user?.likedPosts[post._id] ? true : false}
                        likes={post.likes}
                        createdAt={post.createdAt} 
                        author={post.author} 
                        id={post._id} 
                        isOwner={post.author._id === user?.userId} 
                        key={idx} 
                        title={post.description || "nothing title"} 
                        postImage={post.postImage}
                        onLike={handleLike}
                        commentsCount={post.commentsCount}
                    />
                </div>
            ))}
            {isFetchingNextPage && <SkeletonPostCard count={3} />}
        </div>
    );
}
