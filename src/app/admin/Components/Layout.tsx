import React from "react";
import c from "classnames";
import Sidebar from "@/app/admin/Components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";
import { app } from "@/../firebase";
import Header from "@/app/admin/Components/Header";

type LayoutProps = {
    children: React.ReactNode;
    className?: string;
};

const auth = getAuth(app);

const Layout = ({ children, className }: LayoutProps) => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (user) {
        return (
            <div className="w-full h-full flex flex-col gap-2 md:gap-3 lg:gap-4 p-2 md:p-3 lg:p-4">
                <Header />
                <div className="w-full h-full flex items-center justify-center gap-2 md:gap-3 lg:gap-4">
                    <Sidebar />
                    <main
                        className={c(
                            "bg-card dark:bg-card-dark rounded-lg h-full w-full p-4",
                            className
                        )}
                    >
                        {children}
                    </main>
                </div>
            </div>
        );
    }

    if (!user) {
        return <>{children}</>;
    }

    router.push("/admin/login");
};

export default Layout;