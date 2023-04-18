import { Row, Col, Card, Image, Button } from 'antd'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
interface IProduct {
    id: number,
    name: string,
    price: number,

}
interface IProps {
    products: IProduct[],
    onRemove: (id: number) => void
}
const productsPage = (props: IProps) => {
    const [data, setData] = useState<IProduct[]>([])

    useEffect(() => {
        setData(props.products)
    }, [props])
    return (
        <div>
            <div>productsPage</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {data.map((item) => (
                    <div>
                        <h2>{item.name}</h2>
                        <h2>{item.price}</h2>
                        <button><a href={`/products/${item.id}`}>View</a></button>
                    </div>
                ))}
            </div>
            {/* <Row gutter={[16, 16]}>
                {data.map((item) => (
                    <Col key={item.id} span={6}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                        >
                            <Card.Meta title={item.name} description={<span>{item.price} ₫</span>} />
                            <Link to={`/products/${item.id}`}>
                                <Button>View Details</Button>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row> */}
        </div>
    )
}

export default productsPage