"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from '@mantine/hooks';

import Notification from "./Notification";
import { useNotification } from "@/contexts/notification.context";
import { useEffect } from "react";
import Server from "@/lib/axios";

export default function NotificationContainer() {

    const { notification, setNotifications } = useNotification();

    const {
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['notification'],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await Server.get(`/api/notification?page=${pageParam}`);
            setNotifications(data.notifications);
            console.log(data.notifications);
            
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
    }, [entry, isFetchingNextPage, fetchNextPage]);
    
    return (
        <div className="w-full h-auto  md:columns-2 lg:columns-3">
            {notification.reverse().map((notify, index) => ( <div ref={notification.length >= 5 ? ref : null} key={index}>
                <Notification {...notify} />
            </div> ))}
        </div>
    );
}