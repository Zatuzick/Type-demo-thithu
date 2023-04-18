

import React from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
interface IProduct {
    id: number,
    name: string,
    price: number,
    cateId: number,
}
type Props = {
    products: IProduct[];
    onRemove: () => void;
};

const ProductManagementPage = ({ products, onRemove }: Props) => {
    const data = products.map((product) => {
        return {
            key: product.id,
            name: product.name,
            price: product.price,
            cateId: product.cateId,
        };
    });
    interface DataType {
        key: string;
        name: string;
        price: number;
        cateId: number
    }
    const onHandleRemove = (id: number | string) => {
        const title = "Sure to delete?"
        if (title) {
            onRemove(id);
        }
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "Name Product",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Price Product",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "cateId",
            dataIndex: "cateId",
            key: "cateId",
        },

        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Button type="primary">
                        <Link to={`/admin/products/${record.key}/update`}>Edit</Link>{" "}
                    </Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => onHandleRemove(record.key)}>
                        <Button type="primary" danger>DELETE</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Quản lý sản phẩm</h1>
            <div>
                <a href="/admin/products/add">Add Product</a>
                <Table columns={columns} dataSource={data} />
            </div>

        </div>

    );
};

export default ProductManagementPage;
