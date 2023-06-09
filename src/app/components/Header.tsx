'use client';
import Link from "next/link";
import {Menu} from "@headlessui/react";
import React, {Fragment, useState} from "react";
import menu from "./menu";
import c from "classnames";
import Logo, {LogoName} from "./Logo";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
import LanguageMenu from "./LanguageMenu";
import {Bars3Icon, MoonIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {useBoolean, useDarkMode, useToggle} from "usehooks-ts";
import ToggleTheme from "@/app/components/ToggleTheme";
import {usePathname} from "next/navigation";
const MobileMenu = (): React.JSX.Element => {
    const pathname = usePathname();
    const body: HTMLElement = document.body as HTMLElement;
    const closeOverflow = (): void => enableBodyScroll(body);
    const openOverflow = (): void => disableBodyScroll(body);
    return (
        <Menu as='div' className='inline-block text-left'>
            <Menu.Button onClick={openOverflow} className='flex items-center justify-center'>
                <Bars3Icon className='h-8 w-8'/>
            </Menu.Button>
            <Menu.Items
                as='div'
                className='p-8 fixed left-0 top-0 w-screen h-[100dvh] backdrop-filter backdrop-blur-lg backdrop-saturate-200 dark:text-white z-full bg-wash dark:bg-wash-dark bg-opacity-95 outline-none flex flex-col justify-start gap-y-6'>
                <div className='flex justify-between gap-x-4'>
                    <Logo link={false}/>
                    <Menu.Button onClick={closeOverflow} className='flex items-center justify-center'>
                        <XMarkIcon className='text-brand h-8 w-8'/>
                    </Menu.Button>
                </div>
                <Link href="/admin" className='transition px-4 py-2 text-green-400 rounded-md hover:bg-brand hover:text-white italic'>
                    Admin
                </Link>
                {menu.map((item, key) => (
                    <Menu.Item as={Fragment} key={key}>
                        <Link
                            onClick={(): void => {
                                closeOverflow();
                                window.scrollTo({top: 0, behavior: 'smooth'});
                            }}
                            href={item.href}
                            className={c(
                                'text-2xl font-semibold text-brand transition p-2 rounded-md',
                                pathname === item.href ? 'bg-brand text-white' : 'hover:bg-brand hover:text-white',
                            )}
                        >
                            {item.name}
                        </Link>
                    </Menu.Item>
                ))}
                <div className="flex flex-col gap-3">
                    <ToggleTheme bg={true} />
                    <LanguageMenu bg={true}/>
                </div>
                <Menu.Item onClick={closeOverflow} as={'div'}
                           className='text-md font-semibold text-brand mt-auto text-center'>
                    <LogoName/>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}
const Header = () => {
    return (
        <>
            <header className="z-10 sticky top-0">
                <nav
                    className={c(
                        'items-center w-full flex justify-between bg-wash dark:bg-wash-dark z-50 dark:shadow-nav-dark shadow-nav backdrop-blur-sm backdrop-saturate-200 bg-opacity-70 dark:bg-opacity-80',
                        'p-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40',
                    )}
                >
                    <Logo link={true}/>
                    <MobileMenu/>
                    <div className='hidden md:flex items-center md:gap-x-2 lg:gap-x-4'>
                        <LanguageMenu bg={false}/>
                        <ToggleTheme bg={false}/>
                        {menu.map((item, index) => (
                            <Link
                                href={item.href}
                                key={index}
                                className='transition px-4 py-2 text-brand rounded-md hover:bg-brand hover:text-white'>
                                {item.name}
                            </Link>
                        ))}
                        <Link href="/admin" className='transition px-4 py-2 text-brand rounded-md hover:bg-brand hover:text-white'>
                            Admin
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;

/*
    const [showHeader, setShowHeader] = useState<boolean>(true);
    const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
    const handlePrevScrollPos = useCallback((pos: number): void => setPrevScrollPos(pos), [setPrevScrollPos]);
    const handleShowHeader = useCallback((val: boolean): void => setShowHeader(val), [setShowHeader]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            if (prevScrollPos > currentScrollPos && currentScrollPos > 50) {
                handleShowHeader(true);
            } else if (prevScrollPos < currentScrollPos && currentScrollPos > 50) {
                handleShowHeader(false);
            }
            handlePrevScrollPos(currentScrollPos);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, handleShowHeader, handlePrevScrollPos, showHeader]);*/
