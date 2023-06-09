'use client';
import React from 'react';
import {Transition} from "@headlessui/react";
import c from "classnames";
import * as Yup from 'yup';
import Logo from "@/app/components/Logo";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Link from "next/link";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import {useAuthState, useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {getAuth, User} from "firebase/auth";
import {app} from "@/../firebase";
import Spinner from "@/app/components/Spinner";
import {useRouter} from "next/navigation";

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Geçerli bir e-posta adresi girin.')
        .max(255, 'E-posta en fazla 255 karakter olmalıdır.')
        .matches(/^(?:(?!.*[İıŞşĞğÜüÇçÖö]).)*$/, 'E-posta Türkçe karakter içermemelidir.')
        .required('E-posta zorunludur.'),
    password: Yup.string()
        .max(32, 'Şifre en fazla 32 karakter olmalıdır.')
        .matches(/^(?:(?!.*[İıŞşĞğÜüÇçÖö]).)*$/, 'Şifre Türkçe karakter içermemelidir.')
        .required('Şifre gereklidir.')
});

type FormValues = {
    email: string,
    password: string
}

const auth = getAuth(app);

const Login = (): React.ReactElement => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [
        signInWithEmailAndPassword,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    React.useEffect(() => {
        if (user && !error && !loading) {
            router.push("/admin");
        }
    }, [user, router, error, loading]);

    const handleSubmit = async ({email, password}: FormValues): Promise<void> => {
        try {
            await signInWithEmailAndPassword(email, password);
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) return <Spinner/>;

    return (
        <div className="flex items-start md:items-center justify-center w-full h-full">
            <div
                className="h-full flex flex-col max-w-lg md:max-w-lg lg:max-w-xl xl:max-w-2xl items-center justify-center md:px-6 md:py-8 mx-auto w-full md:h-screen lg:py-0 md:pt-10 lg:pt-12 xl:pt-16 gap-y-12">
                <Link href="/"
                      className="rounded-full p-2 absolute left-4 top-4 transform hover:-translate-x-1 transition bg-card dark:bg-card-dark">
                    <ArrowLeftIcon className="w-8 h-8 text-gray-900 dark:text-white"/>
                </Link>
                <div
                    className="flex flex-row items-center justify-end md:justify-center select-none w-full gap-2 p-6 md:p-0">
                    <Logo link={false}/>
                    <span
                        className="text-2xl font-bold tracking-tight text-brand/70 flex flex-col items-end justify-end">Admin</span>
                </div>
                <Transition
                    as="div"
                    appear={true}
                    show={true}
                    enter="transition-all ease-in-out duration-700 md:duration-500 transform"
                    enterFrom="translate-y-full md:translate-y-0 md:opacity-0"
                    enterTo="translate-y-0 w-full h-full md:opacity-100"
                    leave="transition-all ease-in-out duration-700 md:duration-500 transform"
                    leaveFrom="translate-y-0 w-full h-full md:opacity-100"
                    leaveTo="translate-y-full md:translate-y-0 md:opacity-0"
                >
                    <div
                        className="w-full h-full md:h-auto bg-card rounded-t-lg md:rounded-lg shadow dark:border xl:p-0 dark:bg-card-dark dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 h-full w-full">
                            <Formik
                                initialValues={{
                                    email: "",
                                    password: ""
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({errors, touched, isValidating, isValid}) => (
                                    <Form className="flex flex-col gap-y-4 w-full h-full">
                                        <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
                                            <div className="w-full md:w-1/2">
                                                <label htmlFor="email"
                                                       className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">E
                                                    Posta</label>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className={c(
                                                        "bg-wash dark:bg-wash-dark border",
                                                        {
                                                            "border-red-500": errors.email && touched.email,
                                                            "border-green-500": touched.email && !errors.email,
                                                            "border-gray-300": !errors.email && !touched.email
                                                        },
                                                        "text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-white"
                                                    )}
                                                    placeholder="Eposta"
                                                />
                                                {errors.email && touched.email &&
                                                    <div className="text-red-500 mt-3">{errors.email}</div>}
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <label htmlFor="password"
                                                       className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Şifre</label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    placeholder="••••••••"
                                                    className={c(
                                                        "bg-wash dark:bg-wash-dark border",
                                                        {
                                                            "border-red-500": errors.password && touched.password,
                                                            "border-green-500": touched.password && !errors.password,
                                                            "border-gray-300": !errors.password && !touched.password
                                                        },
                                                        "text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-white"
                                                    )}
                                                />
                                                <ErrorMessage name="password" component="div"
                                                              className="text-red-500 mt-3"/>
                                            </div>
                                        </div>
                                        {isValid && touched.password && (
                                            <button
                                                type="submit"
                                                className={c(
                                                    "transition duration-300 ease-in-out bg-brand w-full mt-4 text-white focus:ring-4 focus:outline-none rounded-lg text-smd font-bold px-5 py-2.5 text-center",
                                                    {
                                                        "bg-green-600 hover:bg-primary-700": !isValidating,
                                                        "bg-red-400 cursor-not-allowed": isValidating
                                                    }
                                                )}
                                            >
                                                Giriş Yap
                                            </button>
                                        )}
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    );
};

export default Login;
