import React from "react";
import Link from "next/link";
import menu from './menu'

interface BreadcrumbProps {
    separator: Separator;
}

interface SeparatorProps {
    choose: Separator;
}

type Separator = "Slash" | "ForwardSlash" | "Arrow" | "Chevron" | "Dot";

const SeparatorComponent = ({choose}: SeparatorProps): JSX.Element => {
    switch (choose) {
        case "Slash":
            return <span className="mx-2 text-gray-400">/</span>;
        case "ForwardSlash":
            return <span className="mx-2 text-gray-400">\</span>;
        case "Arrow":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="14" className='fill-gray-400'>
                    <path d="m480 896-42-43 247-247H160v-60h525L438 299l42-43 320 320-320 320Z"/>
                </svg>
            );
        case "Chevron":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="14" className='fill-gray-400'>
                    <path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/>
                </svg>
            );
        case "Dot":
            return (
                <svg
                    className="w-3 h-3 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                >
                    <circle cx="6" cy="6" r="6"></circle>
                </svg>
            );
        default:
            return <span className="mx-2 text-gray-400">/</span>;
    }
};


const Breadcrumb = ({separator = "Slash"}: BreadcrumbProps) => {

    const menuItems = menu.filter((item): boolean => item.href === location.pathname);
    const items = [
        {name: 'home', href: '/'},
        ...menuItems,
    ];
    return (
        <nav className="flex items-center text-sm my-2">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {item.href === '/' ? (
                        <Link href='/' className="text-gray-500 underline font-medium">
                            Home
                        </Link>
                    ) : (
                        <span className="text-gray-500 font-medium">
                         {item.name}
                        </span>
                    )}
                    {index < items.length - 1 && item.href && <SeparatorComponent choose={separator}/>}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
