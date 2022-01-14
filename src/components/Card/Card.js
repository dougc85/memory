import { React } from "react";
import "./Card.scss";

function Card(props) {

  const { order } = props;


  const handleClick = () => {
    props.clickCard(props.image);
  }
  return (
    <div className="Card" style={{ order: order }} onClick={handleClick}>
      <img src={props.image} alt={props.image} />
    </div>
  )
}

export default Card;