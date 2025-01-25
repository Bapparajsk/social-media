"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import ProfileHeading from "./ProfileHeading";
import UserPost from "./UserPost";
import { useProfile } from "@/contexts/profile.context";
import Redirect from "../ui/Redirect";
import Server from "@/lib/axios";


export default function FetchData() {

    const { profile, setProfile } = useProfile();
    const params = useSearchParams();


    const { data, isError } = useQuery({
        queryKey: ['profile', params.get('id')],
        queryFn: async () => {
            const response = await Server.get(`/api/user/${params.get('uid')}`);
            console.log(response.data.user);
            
            return response.data.user;
        },
        enabled: profile === null || profile.userId !== params.get('uid'),
    });

    useEffect(() => {
        if (data) {
            setProfile(data);
        }
    }, [data, setProfile]);

    if (isError) {
        return <Redirect to="/login" />;;
    }

    if (!params.get('uid')) {
        return <Redirect to="/login" />;
    }

    return (
        <>
            <ProfileHeading  />
            <UserPost />
        </>
    );
}
