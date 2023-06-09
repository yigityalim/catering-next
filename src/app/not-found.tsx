import React from "react";
import Link from "next/link";

export default function NotFound(): React.JSX.Element {
    return (
        <div className="flex flex-col justify-center items-center gap-y-5 p-64">
            <h1 className="text-9xl font-bold text-brand italic">404</h1>
            <h2 className="text-3xl font-semibold italic">Sayfa Bulunamadı</h2>
            <Link href="/" className="text-2xl font-semibold italic text-brand hover:bg-brand hover:text-white py-2 px-4 rounded-full transition">
                Anasayfaya dön
            </Link>
        </div>
    )
}