'use client';
import React, {Fragment} from "react";
import {useOnClickOutside} from "usehooks-ts";
import Link from "next/link";
import {Text} from "@/app/components/Text";
import c from "classnames";
import {Menu, Transition} from "@headlessui/react";
import Logo from "@/app/components/Logo";
import {getAuth, signOut} from "firebase/auth";
import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import Image from "next/image";

const auth = getAuth();

const ExpandMoreIcon = ({className}: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={className}>
        <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/>
    </svg>
)
const LogoutIcon = ({className}: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={className}>
        <path
            d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621-612l43-43 176 176-174 174Z"/>
    </svg>
)
const SettingsIcon = ({className}: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={className}>
        <path
            d="m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410-480q0-29 20.5-49.5T480-550q29 0 49.5 20.5T550-480q0 29-20.5 49.5T480-410Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z"/>
    </svg>
)
const HomeIcon = ({className}: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={className}>
        <path
            d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z"/>
    </svg>
)

const HeaderTitle = ({title}: { title: string }) => (
    <Text size="4xl" weight="bold" className="text-brand flex gap-x-2">
        <span
            className={c(
                "font-bold tracking-tight flex flex-col items-end justify-end text-lg md:text-lg lg:text-xl xl:text-2xl",
            )}>{title}</span>
    </Text>
)

const Header = (): React.JSX.Element => {
    const ref: React.RefObject<HTMLButtonElement> = React.useRef<HTMLButtonElement>(null)
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false)
    useOnClickOutside(ref, () => setIsMenuOpen(false))
    const [user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);

    return (
        <header
            className="flex flex-row items-center justify-between w-full bg-card dark:bg-card-dark p-2 px-4 rounded">
            <div className="flex gap-x-2">
                <Link href="/admin" className="flex items-center gap-x-2">
                    <Logo link={false} className="hidden md:flex"/>
                    <HeaderTitle title={"Kontrol Paneli"}/>
                </Link>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button
                            ref={ref}
                            onClick={() => setIsMenuOpen((prevState: boolean) => !prevState)}
                            className="inline-flex items-center justify-center gap-x-2 w-full h-full rounded-md bg-secondary-button dark:bg-secondary-button-dark px-4 py-2 text-sm font-medium text-dark dark:text-white focus:outline-none"
                        >
                            <div className="flex items-center justify-center gap-x-2">
                                {user?.photoURL && <Image src={user?.photoURL as string} alt="avatar" className="w-8 h-8 rounded-full"/>}
                                <span
                                    className="hidden md:inline text-lg capitalize font-semibold">{user?.displayName as string}</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <ExpandMoreIcon className={c(
                                    isMenuOpen ? 'transform rotate-180 duration-100' : 'transform rotate-0 duration-200',
                                    'transition-transform fill-wash-dark dark:fill-wash'
                                )}/>
                            </div>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-200"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            style={{width: '12rem'}}
                            className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-card dark:bg-card-dark">
                            <div className="p-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <button
                                            onClick={signOut}
                                            className={c(
                                                active ? 'bg-red-500 text-white' : 'text-red-500',
                                                'group flex rounded items-center w-full px-2 py-2 text-sm transition-colors'
                                            )}
                                        >
                                            <LogoutIcon className={c(
                                                active ? 'fill-white transform -translate-x-1' : 'fill-red-500 transform translate-x-0',
                                                'mr-2 transition-transform rotate-180'
                                            )}/>
                                            Çıkış Yap
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="p-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            href="/admin/settings"
                                            onClick={(): void => {
                                                setIsMenuOpen(false)
                                            }}
                                            className={c(
                                                active ? 'bg-gray-500 text-white' : 'text-gray-500 dark:text-gray-400',
                                                'group flex rounded-sm items-center w-full px-2 py-2 text-sm transition-colors'
                                            )}
                                        >
                                            <SettingsIcon className={c(
                                                active ? 'rotate-45 fill-white' : 'transform rotate-0 fill-gray-400',
                                                'mr-2 transition-transform'
                                            )}/>
                                            Ayarlar
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="p-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            href="/"
                                            onClick={(): void => {
                                                setIsMenuOpen(false)
                                            }}
                                            className={c(
                                                active ? 'bg-emerald-600 text-white' : 'text-emerald-600',
                                                'group flex rounded items-center w-full px-2 py-2 text-sm transition-colors'
                                            )}
                                        >
                                            <HomeIcon className={c(
                                                active ? 'fill-wash transition scale-110' : 'fill-emerald-600 transform scale-100',
                                                'mr-2'
                                            )}/>
                                            Anasayfa
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </header>
    )
}

export default Header