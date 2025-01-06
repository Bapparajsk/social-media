import {ReactNode} from "react";

export default function AuthLayout ({
    children
} : {
    readonly children: ReactNode
}) {
    return (
        <main className={"w-full min-h-screen flex items-center justify-center"}>
            {children}
        </main>
    );
}
