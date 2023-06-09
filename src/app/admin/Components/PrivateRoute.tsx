'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { app } from "@/../firebase";

const auth = getAuth(app);

const PrivateRoute = ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        const redirect = async (): Promise<void> => {
            if (!loading && !user) {
                await router.push("/admin/login");
            }
        };
        redirect().then(() => {
            console.log("redirected");
        });
    }, [user, loading, router]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-full text-2xl text-red-500">
                {error.message}
            </div>
        );
    }

    return <>{children}</>;
};

export default PrivateRoute;
