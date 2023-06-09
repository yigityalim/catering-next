import React from "react";
import c from "classnames";

enum TextSize {
    base = 'text-base',
    md = 'text-md',
    lg = 'text-lg',
    xl = 'text-xl',
    '2xl' = 'text-2xl',
    '3xl' = 'text-3xl',
    '4xl' = 'text-4xl',
    '5xl' = 'text-5xl',
    '6xl' = 'text-6xl',
    '7xl' = 'text-7xl',
    '8xl' = 'text-8xl',
    '9xl' = 'text-9xl',
}

enum FontWeight {
    thin = 'font-thin',
    extralight = 'font-extralight',
    light = 'font-light',
    normal = 'font-normal',
    medium = 'font-medium',
    semibold = 'font-semibold',
    bold = 'font-bold',
    extrabold = 'font-black',
}

type TextProps = Pick<
    React.HTMLProps<HTMLParagraphElement>,
    'children' | 'className' | 'onClick' | 'style' | 'id'
> & {
    size?: keyof typeof TextSize;
    weight?: keyof typeof FontWeight;
};

function Text({children, size = 'base', weight = 'normal', className = '', onClick}: TextProps): React.JSX.Element {
    const classNames: string = c(TextSize[size], FontWeight[weight], className)
    return (
        <p className={classNames} onClick={onClick}>
            {children}
        </p>
    )
}

function Heading({children, size = '4xl', weight = 'semibold', className = '', onClick}: TextProps): React.JSX.Element {
    const props: string = c(TextSize[size], FontWeight[weight], className)
    return (
        <h1 className={props} onClick={onClick}>
            {children}
        </h1>
    )
}

export {Text, Heading}
