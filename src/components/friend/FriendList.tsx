
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from '@mantine/hooks';

import FriendItem from "./FriendItem";
import Server from "@/lib/axios";


const fetchFriends = async ({ pageParam = 0 }) => {
    const res = await Server.get(`/api/friend/suggestions`);
    console.log(res.data.suggestions);
    
    return res.data;
};


export default function FriendList({env} : {env: string | null}) {

    const {
        data,
        fetchNextPage,
      } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: fetchFriends,
        getNextPageParam: (lastPage) => lastPage.page,
        initialPageParam: 0,
        retry: 1,
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        
    });

    const { ref, entry } = useIntersection({
        root: null,
        threshold: 0.5
    });

    useEffect(() => {
        if (entry?.isIntersecting) {  
            fetchNextPage();
        }
    }, [entry]);

    const friends = data?.pages.at(-1).suggestions;

    return (
        <div className="w-full flex gap-2 flex-wrap p-3 justify-center">
            {friends?.map((friend, idx) => {
                
                if (idx === friends.length - 1) {
                    return <FriendItem key={idx} id={friend._id} name={friend.name} ref={ref} />;
                }
                return <FriendItem key={idx} id={friend._id} name={friend.name}/>;
                // return <FriendItem key={friend.id} id={friend.id} />
            })}
            {/* <FriendItem id="1039"/> */}
        </div>
    );
}
