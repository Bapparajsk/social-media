
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from '@mantine/hooks';

import FriendItem from "./FriendItem";
import { getFriendList } from "@/lib/friend";
import SkeletonFriendCard from "../skeletons/friendCard";


export default function FriendList({env = "friends"} : {env: "friends" | "friend-requests" | "suggestions"}) {
    env = env || "suggestions";
    
    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        isPending,
    } = useInfiniteQuery({
        queryKey: ['projects', env],
        queryFn: async ({ pageParam = 0 }) => getFriendList(pageParam + 1, env),
        getNextPageParam: (lastPage) => lastPage?.page,
        initialPageParam: 0,
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

    const friends = data?.pages.at(-1);
    console.log(friends);
    
    return (
        <div className="w-full flex gap-2 flex-wrap p-3 justify-center">
            {isPending && <SkeletonFriendCard count={3}/>}
            
            {friends?.map((friend: any, idx: number) => (
                <FriendItem env={env} ref={idx === friends.length -1 ? ref : null} key={idx} id={env === "suggestions" ? friend._id : friend.userId} name={friend.name}/>
            ))}
            {friends?.length === 0 && <p>No friends found</p>}
            {isFetchingNextPage && <SkeletonFriendCard count={6}/>}
        </div>
    );
}
