import { Card } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const CustomCard = ({card}) => (
  <Link to={`/product/${card.id}`} state={card}>
    <Card
      hoverable
      style={{
      //   width: 240,
          borderRadius: 10,
      }}
      cover={<img alt="example" src={card.thumbnail} />}
    >
      <Meta title={card.title} description={card.description} />
    </Card>
  </Link>
);

export default CustomCard;