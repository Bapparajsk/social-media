"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import ProfileHeading from "./ProfileHeading";
import UserPost from "./UserPost";
import { useProfile } from "@/contexts/profile.context";
import Redirect from "../ui/Redirect";
import Server from "@/lib/axios";


export default function FetchData() {
    const params = useSearchParams();
    const { profile, setProfile } = useProfile();


    const { data, isError, isFetching } = useQuery({
        queryKey: ['profile', params.get('id')],
        queryFn: async () => {
            const response = await Server.get(`/api/user/${params.get('uid')}`);
            setProfile(response.data.user);
            return response.data.user;
        },
        enabled: profile === null || profile.userId !== params.get('uid'),
    });

    if (isError) {
        return <Redirect to="/login" />;;
    }

    if (!params.get('uid')) {
        return <Redirect to="/login" />;
    }

    return (
        <>
            <ProfileHeading  profile={data} isFetching={isFetching}/>
            <UserPost userFetching={isFetching}/>
        </>
    );
}
