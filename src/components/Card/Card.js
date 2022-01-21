import { React } from "react";
import "./Card.scss";

function Card(props) {

  const { order, handleLoad } = props;


  const handleClick = () => {
    props.clickCard(props.image);
  }
  return (
    <div className="Card" style={{ order: order }} onClick={handleClick} >
      <div className="Card-image-container">
        <img className="Card-image" src={props.image} alt={props.image} onLoad={handleLoad} />
      </div>
    </div>
  )
}

export default Card;