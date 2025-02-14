"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from '@mantine/hooks';
import { ModalBody, ModalHeader } from "@nextui-org/modal";

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
        <>
            <ModalHeader>
                <h2 className="text-lg font-bold">Notification</h2>
            </ModalHeader>
            <ModalBody>
                <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto overflow-x-hidden">
                    {notification.reverse().map((notify, index) => (<div ref={index === notification.length - 1 ? ref : null} key={index}>
                        <Notification {...notify} />
                    </div>))}
                </div>
            </ModalBody>
        </>
    );
}