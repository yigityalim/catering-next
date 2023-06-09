import Link from "next/link";
import c from "classnames";
import React from "react";

type LogoProps = { link: boolean, className?: string };

const LOGO_NAME: string = 'XFOOD' as const;
const Logo = ({link, className}: LogoProps): React.JSX.Element => (
    <div className={c('flex flex-row items-center font-semibold', className)}>
        {link ? (
            <Link href='/' className='font-black text-4xl text-brand'>
                {LOGO_NAME}
            </Link>
        ) : (
            <div className='font-black text-4xl text-brand'>
                {LOGO_NAME}
            </div>
        )}
    </div>
)


const LogoName = (): React.JSX.Element => (
    <div className='flex flex-row text-sm gap-x-2 font-semibold'>
        <span>&copy;</span>
        <span>{new Date().getFullYear()}</span>
        <Link href='/' className='text-brand text-md'>{LOGO_NAME}.</Link>
        <span>Tüm hakları saklıdır</span>
    </div>
);

export default Logo;
export {LogoName};