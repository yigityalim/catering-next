'use client';
import Link from 'next/link'
import {useMediaQuery} from "usehooks-ts";
import Icon, {FacebookIcon, InstagramIcon, TwitterIcon} from "./Icon";
import menu from "./menu";
import React, {useState} from "react";
import Logo, {LogoName} from "./Logo";
import c from "classnames";
import {Text} from "./Text";
import LanguageMenu from "./LanguageMenu";
import ToggleTheme from "@/app/components/ToggleTheme";
import {usePathname} from "next/navigation";

const icons: { icon: React.JSX.Element | string; href: string }[] = [
    {
        icon: <FacebookIcon/>,
        href: ''
    },
    {
        icon: <TwitterIcon/>,
        href: ''
    },
    {
        icon: <InstagramIcon/>,
        href: ''
    },
];

function Footer(): React.JSX.Element {
    return (
        <footer className="w-full mx-auto bg-wash dark:bg-wash-dark p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <LogoSection/>
                <MenuSection/>
                <SocialMediaSection/>
            </div>
            <div className="w-full h-0.5 bg-brand my-8"/>
            <LogoName/>
        </footer>
    );
}

const LogoSection = (): React.JSX.Element => {
    return (
        <div
            className="col-span-1 lg:col-span-2 flex flex-col gap-6 justify-between border-b border-brand pb-8 md:border-none">
            <div>
                <Logo link={true} className='mb-4'/>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque commodi dicta, ducimus,
                    expedita harum inventore ipsam iusto laboriosam molestias, mollitia praesentium repudiandae saepe
                    sunt vel? Ab aut nesciunt veniam.
                </p>
            </div>
            <div className="flex justify-between flex-col gap-y-4 sm:flex-row sm:gap-x-4 items-center md:mt-0">
                <ToggleTheme bg={true}/>
                <LanguageMenu className='w-full' bg={true}/>
                <ul className="flex w-full gap-4 items-center justify-center">
                    {icons.map((icon, key) => (
                        <li key={key}>
                            <a href={icon.href} className="block hover:scale-110 transition duration-300">
                                {icon.icon}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const MenuSection = (): React.JSX.Element => {
    const pathname: string = usePathname();
    const scrollTop = () => window.scrollTo({top: 0, behavior: 'smooth'});
    return (
        <div className="col-span-1 lg:col-span-1">
            <Text className="text-xl font-semibold text-dark dark:text-light mb-4">Keşfet</Text>
            <ul className="flex flex-col w-full gap-y-4">
                {menu.map((item, index) => (
                    <li key={index}>
                        <Link onClick={scrollTop} href={item.href}
                              className={c(
                                  "text-dark dark:text-light transition duration-300 font-medium text-lg block py-2 px-4 rounded-md",
                                    pathname === item.href && 'bg-brand text-light'
                              )}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const SocialMediaSection = (): React.JSX.Element => {
    const [text, setText] = useState<string>('');
    const subscribeButton = useMediaQuery('(min-width: 1279px) and (max-width: 1766px)');
    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-1">
            <Text className="text-xl font-semibold text-dark dark:text-light mb-4">Haberler</Text>
            <form className="flex flex-col lg:flex-row gap-4">
                <input
                    value={text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                    className="w-full lg:w-64 p-2 pl-4 rounded-md outline-none border border-brand focus:ring-0 bg-light dark:bg-dark dark:placeholder-gray-400"
                    type="email"
                    placeholder="E-posta adresinizi giriniz"
                />
                <button disabled={text.length < 1} className={c(
                    "disabled:opacity-50 w-full lg:w-auto p-2 rounded-md bg-brand text-light font-semibold flex items-center justify-center gap-x-2",
                    subscribeButton && 'flex-1'
                )}>
                    Abone Ol
                </button>
            </form>
        </div>
    )
}

const MemoFooter = React.memo<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>(Footer);
export default MemoFooter;