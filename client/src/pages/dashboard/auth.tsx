import React from 'react';
import {NextPage} from "next";
import Head from "next/head";
import LoginForm from "@/components/auth/LoginForm";
import {Tabs} from "antd";
import RegisterForm from "@/components/auth/RegisterForm";

const Auth: NextPage = () => {
    return (
        <>
            <Head>
                <title>Dashboard / Auth</title>
            </Head>
            <main style={{ width: 400, margin: '50px auto'}}>
                <Tabs
                    items={[
                        {
                            label: "Login",
                            key: '1',
                            children: <LoginForm />
                        },
                        {
                            label: "Register",
                            key: '2',
                            children: <RegisterForm />
                        }
                    ]}
                />
            </main>
        </>
    );
};

export default Auth;
