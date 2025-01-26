import { FetchData } from "@/components/profile";
import { ProfileProvider } from "@/contexts/profile.context";
export default function Profile() {

    return (
        <ProfileProvider>
            <div className="p-2">
                <FetchData />
            </div>
        </ProfileProvider>
    );
}