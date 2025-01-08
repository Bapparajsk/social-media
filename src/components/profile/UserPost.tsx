import { Card } from "@/components/postCard";

export default function UserPost() {
    return (
        <div className="py-2">
            <Card
                title={"hey there, this is a post card, it is a simple card that contains \n some information about the user who posted it."}
            />
        </div>
    );
}
