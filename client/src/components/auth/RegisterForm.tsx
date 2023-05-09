import React, {FC} from 'react';
import styles from "@/components/auth/Auth.module.scss";
import {Button, Form, Input, notification} from "antd";
import {LoginFormDTO, RegisterFormDTO} from "@/api/dto/auth.dto";
import * as Api from "@/api";
import {setCookie} from "nookies";

const RegisterForm: FC = () => {

    const onSubmit = async (values: RegisterFormDTO) => {

        try {

            const { token } = await Api.auth.register(values);

            notification.success({
                message: "Success!",
                description: "Login successful",
                duration: 2
            })

            setCookie(null, "_token", token, {
                path: '/'
            })

            location.href = '/dashboard';

        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className={styles.formBlock}>
            <Form
                name={'basic'}
                labelCol={{ span: 8 }}
                onFinish={onSubmit}
            >
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Full name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default RegisterForm;
