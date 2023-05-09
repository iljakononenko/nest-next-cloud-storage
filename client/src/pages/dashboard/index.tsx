import React from 'react';
import {GetServerSidePropsContext, NextPage} from "next";
import {checkAuth} from "../../../utils/checkAuth";
import Layout from "@/layouts/Layout";
import * as Api from '@/api';
import {FileItem} from "@/api/dto/file.dto";
import FileList from "@/components/FileList";
import DashboardLayout from "@/layouts/DashboardLayout";
import FileActions from "@/components/FileActions";
import Files from "@/components/Files";

interface DashboardPageProps {
    items: FileItem[]
}

const DashboardPage: NextPage<DashboardPageProps> = ({ items }) => {
    return (
        <DashboardLayout>
            <Files withActions items={items}/>
        </DashboardLayout>
    );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
    return <Layout title={'Dashboard / Main'}>{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx);

    if ("redirect" in authProps) {
        return authProps;
    }

    try {
        const items = await Api.files.getAll();

        return {
            props: {
                items
            }
        }
    } catch (e) {
        console.log(e)

        return {
            props: { items: [] }
        }
    }

    return {
        props: {}
    }
}

export default DashboardPage;
