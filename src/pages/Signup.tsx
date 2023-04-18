
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        try {
            const response = await axios.post('http://localhost:3000/users', values);
            message.success('Đăng ký thành công');
            navigate('/signin');
        } catch (error) {
            console.error(error);
            message.error('Register failed');
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <Form
                name="register-form"
                onFinish={onFinish}
                initialValues={{
                    remember: true,
                }}
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'The input is not valid email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: 6,
                            message: 'Password must be at least 6 characters',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Signup
                    </Button>

                </Form.Item>

            </Form>


        </div>
    );
};

export default Signup;
