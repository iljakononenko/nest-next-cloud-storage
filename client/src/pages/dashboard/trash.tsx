import React from 'react';
import {GetServerSidePropsContext, NextPage} from "next";
import {checkAuth} from "../../../utils/checkAuth";
import Layout from "@/layouts/Layout";
import * as Api from '@/api';
import {FileItem} from "@/api/dto/file.dto";
import DashboardLayout from "@/layouts/DashboardLayout";
import Files from "@/components/Files";

interface DashboardTrashProps {
    items: FileItem[]
}

const DashboardTrash: NextPage<DashboardTrashProps> = ({ items }) => {
    return (
       <DashboardLayout>
           <Files  items={items}/>
       </DashboardLayout>
    );
};

DashboardTrash.getLayout = (page: React.ReactNode) => {
    return <Layout title={'Dashboard / Trash'}>{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx);

    if ("redirect" in authProps) {
        return authProps;
    }

    try {
        const items = await Api.files.getAll('trash');

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

export default DashboardTrash;
