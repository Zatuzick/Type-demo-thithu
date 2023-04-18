
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

interface IProduct {
    id: number,
    name: string,
    price: number,
    cateId: number,
}
type Props = {
    products: IProduct[];
    onUpdate: (props: Props) => void;

};

const UpdateProduct = ({ products, onUpdate }: Props) => {
    const { id: id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    useEffect(() => {
        const data = products.find((item) => item.id == id);
        setProduct(data);
    }, [products]);
    useEffect(() => {

        setFields();
    }, [product]);
    const [form] = Form.useForm();

    const setFields = () => {

        form.setFieldsValue({

            id: product?.id,
            name: product?.name,
            price: product?.price,
            cateId: product?.cateId,

        });
    };

    const onFinish = (values: any) => {
        onUpdate({ id, ...values });
        navigate("/admin/products");
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };


    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}

            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Name Product"
                name="name"
                rules={[{ required: true, message: "Please input your name product!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Price Product"
                name="price"
                rules={[{ required: true, message: "Please input your price!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="CateId Product"
                name="cateId"
                rules={[{ required: true, message: "Please input your cateId!" }]}
            >
                <Input />
            </Form.Item>



            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Update Product
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateProduct;
