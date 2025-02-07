import { ReactNode, Fragment, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/user.context";
import { getUser } from "@/lib/user";
import Redirect from "@/components/ui/Redirect";
import { useNotification } from "@/contexts/notification.context";

export default function AuthProvider({ children }: { children: ReactNode }) {

    const pathname = usePathname();
    const { user, setUser } = useUser();
    const { loginSocket } = useNotification();
    const queryClient = useQueryClient();

    const page = pathname.startsWith('/login') || pathname.startsWith('/register');

    const { isPending, isError, isSuccess, data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const userData = await getUser();
            console.log(userData);
            return userData;
        },
        enabled: !user && !page,
        retry: false,
    });

    useEffect(() => {   
        if (data) {
            loginSocket(data.userId);
            setUser(data);
        }
    },[data, setUser]);

    if (page) {
        queryClient.cancelQueries({ queryKey: ['user'] });
        return <Fragment>{children}</Fragment>;
    }

    if (isError) {
        return <Redirect to="/login" />;
    }

    return (
        <Fragment>
            {isPending && <p>Loading...</p>}
            {isSuccess && children}
        </Fragment>
    );
}
