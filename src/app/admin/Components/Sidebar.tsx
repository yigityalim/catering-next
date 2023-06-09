'use client';
import React, {useCallback, useEffect, useState} from "react";
import {useDarkMode, useMediaQuery} from "usehooks-ts";
import c from "classnames";
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {app} from "@/../firebase";
import Link from "next/link";
import {MoonIcon, SunIcon} from "@heroicons/react/20/solid";
import Image from "next/image";
import menu from "@/app/admin/Components/menu";
import {usePathname} from "next/navigation";

const auth = getAuth(app);

const UnfoldLessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="rotate-90">
        <path
            d="m343-160-43-43 180-180 180 180-43 43-137-137-137 137Zm137-417L300-757l43-43 137 137 137-137 43 43-180 180Z"/>
    </svg>
)

const UnfoldMoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="rotate-90">
        <path
            d="M480-120 300-300l44-44 136 136 136-136 44 44-180 180ZM344-612l-44-44 180-180 180 180-44 44-136-136-136 136Z"/>
    </svg>
)
const Sidebar = (): React.JSX.Element => {
    const {isDarkMode, toggle} = useDarkMode();
    const [user] = useAuthState(auth);
    const isMobile: boolean = useMediaQuery('(max-width: 1200px)');
    const [width, setWidth] = useState<boolean>(() => {
        const storedWidth = window.sessionStorage.getItem("sidebarWidth");
        return storedWidth ? JSON.parse(storedWidth) : true;
    });

    const handleChangeSidebarWidth = useCallback(() => {
        setWidth((prev: boolean) => {
            const newWidth = !prev;
            window.sessionStorage.setItem("sidebarWidth", JSON.stringify(newWidth));
            return newWidth;
        });
    }, []);


    useEffect(() => {
        const html: HTMLElement = document.documentElement;
        if (html) {
            html.classList.toggle("dark", isDarkMode);
        }
    }, [isDarkMode]);

    useEffect(() => {
        const storedWidth = localStorage.getItem("sidebarWidth");
        if (storedWidth) {
            setWidth(JSON.parse(storedWidth));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("sidebarWidth", JSON.stringify(width));
    }, [width]);

    const pathname: string = usePathname()

    const menuWithActive = menu.map((item) => {
        if (pathname === item.to) {
            return {...item, active: true}
        }
        return {...item, active: false}
    })

    return (
        <div style={width ? {width: "15%"} : {width: "5%", minWidth: "5%"}}
             className="h-full bg-card dark:bg-card-dark rounded-lg transition-[width] duration-300 ease-out p-2">
            <div className="flex flex-col items-center justify-start gap-y-4 h-full w-full">
                {!isMobile && (
                    <button
                        className="flex items-center justify-center gap-x-2 w-full p-2 fill-wash-dark dark:fill-wash transition-all hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        onClick={handleChangeSidebarWidth}
                    >
                        {width ? <UnfoldLessIcon/> : <UnfoldMoreIcon/>}
                    </button>
                )}
                <div className={c(
                    "w-full hidden lg:flex flex-col items-center gap-y-2",
                    isMobile && 'pt-4'
                )}>
                    {user?.photoURL && (
                        <Image
                            src={user?.photoURL as string}
                            alt="Logo"
                            className="w-16 h-16 rounded-full"
                        />
                    )}
                    <h1 className="w-full text-3xl font-semibold text-dark-secondary dark:text-light-secondary capitalize select-none text-center">
                        {width ? user?.displayName : user?.displayName?.slice(0, 1)}
                    </h1>
                </div>
                <div className="flex flex-col items-center justify-start gap-y-2 w-full h-full">
                    {menuWithActive.map((item, index) => (
                        <Link
                            key={index}
                            href={item.to}
                            className={c(
                                "group w-full flex items-center gap-x-2 p-2 rounded transition-all",
                                width && !isMobile ? "justify-start" : "justify-center",
                                item.active ? "bg-brand/70 text-white dark:text-wash" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                            )}
                        >
                            <div
                                className="group-hover:fill-brand dark:group-hover:fill-wash fill-secondary-button-dark dark:fill-secondary-button"
                            >
                                {item.icon}
                            </div>
                            {width && !isMobile && <span className="text-sm">{item.title}</span>}
                        </Link>
                    ))}

                </div>
                <div className="flex flex-col items-center justify-center gap-y-2 w-full">
                    <button
                        className="flex items-center justify-center gap-x-2 w-full bg-secondary-button dark:bg-secondary-button-dark rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={toggle}
                    >
                        {isDarkMode ? <SunIcon className="w-6 h-6"/> : <MoonIcon className="w-6 h-6"/>}
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Sidebar;