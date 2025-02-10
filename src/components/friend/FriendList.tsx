import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from '@mantine/hooks';
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import FriendItem from "./FriendItem";
import { getFriendList } from "@/lib/friend";
import SkeletonFriendCard from "../skeletons/friendCard";
import { Button } from "@nextui-org/react";


export default function FriendList({ env = "friends" }: { env: "friends" | "friend-requests" | "suggestions" }) {
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
    }, [entry, isFetchingNextPage, fetchNextPage]);

    const friends = data?.pages.at(-1);

    return (
        <>
            <div className="w-full flex gap-2 flex-wrap p-3 justify-center">
                {isPending && <SkeletonFriendCard count={3} />}

                {friends?.map((friend: any, idx: number) => (
                    <FriendItem env={env} ref={((friends.length >= 5) && idx === friends.length - 1) ? ref : null} key={idx} id={env === "suggestions" ? friend._id : friend.userId} name={friend.name} />
                ))}
                {friends?.length === 0 && (
                    <motion.div
                    className="text-center text-gray-500 text-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    No {env} found 😢
                  </motion.div>
                )}
                {isFetchingNextPage && <SkeletonFriendCard count={6} />}
            </div>
            <GetButton env={env}/>
        </>
    );
}


function GetButton({ env = "friends" }: { env: "friends" | "friend-requests" | "suggestions" }) {

    const environments = ["friends", "friend-requests", "suggestions"] as const;
    const router = useRouter();

    function capitalize(str: string[]) {
        return str.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    }
    

    return (
        <div className="w-full flex justify-center gap-3 mb-3">
            {environments
                .filter((e) => e !== env)
                .map((e) => (
                    <Button 
                        fullWidth 
                        key={e} 
                        onPress={() => router.push(`/friend?env=${e}`)}
                        variant="faded"
                        color={e === "friends" ? "primary" : e === "friend-requests" ? "warning" : "success"}
                    >
                        {capitalize(e.split("-"))}
                    </Button>
                ))}
        </div>
    );
}