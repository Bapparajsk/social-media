import { ReactNode, Fragment, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, redirect } from "next/navigation";
import { useUser } from "@/contexts/user.context";
import { getUser } from "@/lib/user";
import { useNotification } from "@/contexts/notification.context";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const { user, setUser } = useUser();
    const { loginSocket } = useNotification();
    const queryClient = useQueryClient();
    const pathname = usePathname();

    const { isPending, isError, isSuccess, data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const userData = await getUser();
            
            return userData;
        },
        enabled: !user && !(pathname.startsWith('/login') || pathname.startsWith('/register')),
        retry: false,
    });

    useEffect(() => {   
        if (data) {
            loginSocket(data.userId);
            setUser(data);
        }
    },[data, setUser]);

    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        queryClient.cancelQueries({ queryKey: ['user'] });
        return <Fragment>{children}</Fragment>;
    }

    if (isError) {
        redirect('/login');
    }

    return (
        <Fragment>
            {isPending && <p>Loading...</p>}
            {isSuccess && children}
        </Fragment>
    );
}
