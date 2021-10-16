import { useEffect, useState } from "react";
import "./App.css";
import Maps from "./components/Maps";

function App() {
  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]); //array of objects

  useEffect(() => {
    //get starter deck once when site loads
    async function getData() {
      setLoading(true);
      const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      const data = await res.json();
      //console.log(data);

      setDeck(data);
      setLoading(false);
    }

    getData();
  }, []);

  //draw cards to use in memory-board
  useEffect(() => {
    async function fetchCards() {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=20`
      );
      const data = await res.json();

      //console.log(data);
      setCards(data.cards);
    }
    deck.deck_id && fetchCards();
  }, [deck]);

  //test print
  useEffect(() => {
    cards.forEach((card) => {
      //console.log(card.suit);
    });
    //console.log(deck.deck_id);
  }, [cards, deck]);

  if (loading) return <div>Loading...</div>;
  if (!deck) return <div>Error</div>;

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <Maps allCards={cards} />
    </div>
  );
}

export default App;
