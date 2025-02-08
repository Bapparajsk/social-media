export const getBorderColor = (type?: string): string => {
    const typeColorMap: Record<string, string> = {
        name: "border-blue-500",
        title: "border-gray-500",
        message: "border-green-500",
        success: "border-emerald-500",
        post: "border-indigo-500",
        comment: "border-purple-500",
        like: "border-red-500",
        unlike: "border-yellow-500",
        share: "border-cyan-500",
        "friend-accept": "border-teal-500",
        "friend-request": "border-orange-500",
        "friend-reject": "border-rose-500",
        "notification.ts": "border-pink-500",
        password: "border-lime-500",
        email: "border-amber-500",
        primaryDevice: "border-violet-500",
        login: "border-sky-500",
        register: "border-fuchsia-500",
        logout: "border-stone-500",
        notification: "border-gray-500",
    };

    return type ? typeColorMap[type] || "border-gray-300" : "border-gray-300";
};