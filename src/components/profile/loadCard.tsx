import { Card } from "../postCard";


export const FetchPost = async () => {
    return (
        <div className="py-2">
            <Card
                isOwner
                title={"hey there, this is a post card, it is a simple card that contains \n some information about the user who posted it."}
            />
            <Card
                isOwner
                title={"hey there, this is a post card, it is a simple card that contains \n some information about the user who posted it."}
            />
            <Card
                isOwner
                title={"hey there, this is a post card, it is a simple card that contains \n some information about the user who posted it."}
            />
        </div>
    );
};