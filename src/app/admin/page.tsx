'use client';
import React from "react";
import PrivatePage from "@/app/admin/Components/PrivateRoute";
import Layout from "@/app/admin/Components/Layout";

export function Main({children}: {children: React.ReactNode}): React.JSX.Element {
    return (
        <PrivatePage>
            <Layout>
                {children}
            </Layout>
        </PrivatePage>
    )
}

export default function home(): React.JSX.Element {
    return (
        <Main>
            <div className="h-full w-full flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Admin Paneli</h1>
                <p className="text-lg">Hoşgeldiniz!</p>
            </div>
        </Main>
    )
}