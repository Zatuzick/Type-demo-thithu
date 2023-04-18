

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
interface IProduct {
    id: number,
    name: string,
    price: number,
    cateId: number,
}
type Props = {
    onAdd: () => void;

};

const AddProduct = ({ onAdd }: Props) => {
    const navigate = useNavigate();

    const onFinish = async (values: Props) => {
        try {
            await onAdd(values);
            navigate("/admin/products");
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Add New Product</h2>
            <div style={{ justifyContent: "center" }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name Product"
                        name="name"
                        rules={[{ required: true, message: "Please input your name Product!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please input your Price!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="CateId"
                        name="cateId"
                        rules={[{ required: true, message: "Please input your CateId!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Add New Product
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
};

export default AddProduct;
