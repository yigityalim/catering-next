'use client';
import './globals.css'
import {Inter} from 'next/font/google'
import React from "react";
import {NextFont} from "next/dist/compiled/@next/font";
import Header from "@/app/components/Header";
import MemoFooter from "@/app/components/Footer";
import {usePathname} from "next/navigation";
import Head from "next/head";

const inter: NextFont = Inter({subsets: ['latin']})
export default function RootLayout({children}: { children: React.ReactNode; }) {

    const pathname: string = usePathname()
    const isAdminPage: boolean = pathname.startsWith('/admin')

    return (
        <html lang="en">
        <Head>
            <title>Anasayfa</title>
        </Head>
        <body className={inter.className}>
        {!isAdminPage && <Header/>}
        {children}
        {!isAdminPage && <MemoFooter/>}
        </body>
        </html>
    )
}
