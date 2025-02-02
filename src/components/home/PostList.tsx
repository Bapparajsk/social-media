"use client";

import { useEffect } from "react";
import FetchPost from "./fetchPost";

let cachedScrollPosition = 0; // Cache scroll position

export default function PostList() {

    useEffect(() => {
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition) {
            cachedScrollPosition = parseInt(scrollPosition);
        }

        window.scrollTo(0, cachedScrollPosition);

        window.addEventListener("scroll", () => {
            cachedScrollPosition = window.scrollY;
        });

        return () => {
            sessionStorage
            .setItem("scrollPosition", cachedScrollPosition.toString());
        };
    }, []);

    return (
        <div className="w-full h-auto">
            <FetchPost userFetching={false}/>
        </div>
    );
}
