import { React } from "react";
import "./Card.scss";

function Card(props) {

  const handleClick = () => {
    props.clickCard(props.image);
  }
  return (
    <div className="Card" onClick={handleClick}>
      <img src={props.image} alt={props.image} />
    </div>
  )
}

export default Card;