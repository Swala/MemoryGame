import image from "../playing-cards.png";

function Card({ cardDetails, event }) {
  //cardSuit, cardValue, imageSrc, imageAlt

  return (
    <div className="card">
      <img
        onClick={event}
        id={cardDetails.image}
        src={image}
        alt={cardDetails.suit}
        className="cardImage"
      ></img>
    </div>
  );
}

export default Card;
