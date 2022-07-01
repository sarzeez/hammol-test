import React from 'react'
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import CustomCard from './Card'

const Products = () => {

    const loading = useSelector(state => state.products.loading)
    const products = useSelector(state => state.products.products)

    return (
        <div className='products'>
            {
                loading ? 'Loading...'
                : (
                    <Row gutter={[32, 16]} >
                        {
                            products.map((item, index) => (
                                <Col key={index} span={6} >
                                    <CustomCard card={item} />
                                </Col>
                            ))
                        }
                    </Row>
                )
            }
        </div>
    )
}

export default Products