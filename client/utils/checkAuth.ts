import axios from "@/core/axios";
import * as Api from "@/api";
import nookies from 'nookies';
import {GetServerSidePropsContext} from "next";

export const checkAuth = async (ctx: GetServerSidePropsContext) => {

    const { _token } = nookies.get(ctx);

    axios.defaults.headers.Authorization = "Bearer " + _token;

    try {
        await Api.auth.getMe();

        return {
            props: {}
        }
    } catch (e) {
        return {
            redirect: {
                destination: "/dashboard/auth",
                permanent: false,
            }
        }
    }
}
