import React, { useState } from 'react';
import { Card, Image  } from 'antd';
import { useLocation } from 'react-router-dom';
const { Meta } = Card;

const AboutCard = () => {
    const location = useLocation();
    const card = location.state;
    const [visible, setVisible] = useState(false);
    return (
        <div style={{display: 'flex'}}>
            <Card
            // hoverable
            style={{
                width: 400,
                borderRadius: 10,
            }}
            cover={<>
                <Image
                preview={{ visible: false }}
                // width={300}
                src={card.thumbnail}
                onClick={() => setVisible(true)}
                />
                <div style={{ display: 'none' }}>
                <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                    {
                        card.images.map((item, index) => (
                            <Image key={index} src={item} />
                        ))
                    }
                </Image.PreviewGroup>
                </div>
            </>}
            >
            <Meta title={card.title} description={card.description} />
            </Card>
            <div style={{paddingLeft: '20px'}}>
                <p>Title: <b>{card.title}</b></p>
                <p>Brand: <b>{card.brand}</b></p>
                <p>Category: <b>{card.category}</b></p>
                <p>Description: <b>{card.description}</b></p>
                <p>Price: <b><i>{card.price}$</i></b></p>
                <p>Rating: <b>{card.rating}</b></p>
                <p>Stock: <b>{card.stock}</b></p>
            </div>
        </div>
    )
}

export default AboutCard