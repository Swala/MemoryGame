//TODO make sure you cannot click on matched pair
//TODO start over button
import { useEffect, useState } from "react";
import Card from "./Card";
import image from "../playing-cards.png";

//could use an array ClickedCards instead of both first and second card

function Maps({ allCards }) {
  const [clickedCard, setClickedCard] = useState();
  const [firstCard, setFirstCard] = useState();
  const [secondCard, setSecondCard] = useState();
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);

  //compare first and second card if cards have been assigned
  useEffect(() => {
    function compareCards() {
      console.log("First Card: " + firstCard.alt);
      console.log("Second card: " + secondCard);

      if (firstCard.alt === secondCard) {
        window.alert("It's a match!");
        setScore(score + 1);
        //TODO remove click event from image
      } else {
        window.alert("Not a match, Try again");
        //turn cards back
        clickedCard.src = image; //latest card
        firstCard.src = image;
      }
      resetCards();
      setCounter(0);
    }

    if (firstCard && secondCard) {
      //console.log(firstCard);
      compareCards(firstCard, secondCard);
    } else {
      return;
    }
  }, [secondCard, firstCard, clickedCard, score]);

  //view card image on click
  useEffect(() => {
    async function assignCard() {
      if (counter === 0) {
        setFirstCard(clickedCard);

        setCounter(1);
      } else if (counter === 1 && firstCard) {
        setSecondCard(clickedCard.alt);
        setCounter(2);
      } else {
        console.log("2 cards have been choosen");
        resetCards();
      }
    }
    if (clickedCard) {
      clickedCard.src = clickedCard.id;
      assignCard();
    }
  }, [clickedCard]);

  const resetCards = () => {
    setFirstCard("");
    setSecondCard("");
    setClickedCard();
  };

  //The event for every image
  function handleOnClick(e) {
    e.preventDefault();
    setClickedCard(e.target);
  }

  return (
    <div>
      {allCards.map((card) => {
        return (
          <Card
            key={card.code} //Unique key prop
            cardDetails={card}
            event={handleOnClick}
          />
        );
      })}
      <h3>
        Score: <span>{score}</span>
      </h3>
    </div>
  );
}

export default Maps;
