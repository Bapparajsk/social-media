import Notification from "./Notification";

export default function NotificationContainer() {
    
    return (
        <div className="w-full h-auto  md:columns-2 lg:columns-3">
            <Notification type="friend-reject" description={<div className="w-full h-[100px]"></div>}/>
            <Notification description={<div className="w-full h-[50px]"></div>}/>
            <Notification description={<div className="w-full h-[90px]"></div>}/>
            <Notification description={<div className="w-full h-[100px]"></div>}/>
            <Notification description={<div className="w-full h-[10px]"></div>}/>
        </div>
    );
}