import React, {useEffect} from "react";
import {useDarkMode} from "usehooks-ts";
import {SunIcon, MoonIcon} from "@heroicons/react/20/solid";
import classNames from "classnames";

const ToggleTheme = ({bg}: { bg: boolean }): React.JSX.Element => {
    const {isDarkMode, toggle} = useDarkMode();
    useEffect((): void => {
        const html: HTMLElement = document.documentElement as HTMLElement;
        html.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);
    return (
        <button
            onClick={toggle}
            className={classNames(
                'flex items-center justify-center px-4 py-2 rounded-md transition',
                bg ? 'w-full bg-brand text-wash' : ' bg-wash dark:bg-wash-dark text-brand hover:bg-brand dark:hover:bg-brand hover:text-wash',
            )}
        >
            {isDarkMode ? <SunIcon className='w-6 h-6'/> : <MoonIcon className='w-6 h-6'/>}
        </button>
    )
}

export default ToggleTheme;