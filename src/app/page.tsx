import { Card } from "@/components/postCard";

export default function Home() {
    return (
        <div className={"w-full flex flex-col items-center"}>
            <Card title={"ay there, this is a post card, \nit is a simple card that contains \nsome information about the user who posted it."}/>

        </div>
    );
}
