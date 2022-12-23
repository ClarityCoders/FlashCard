import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { createCard } from './api/createCard';
import { createDeck } from './api/createDeck';
import { deleteDeck } from './api/deleteDeck';
import { getDeck } from './api/getDeck';
import { deleteCard } from './api/deleteCard';
import { getDecks, TDeck } from './api/getDecks';
import './App.css'

export default function Deck() {
    const [deck, setDeck] = useState<TDeck | undefined>(undefined)
    const [cards, setCards] = useState<string[]>([]);
    const [text, setText] = useState("");
    const {deckId} = useParams();

    async function handleCreateCard(e: React.FormEvent) {
        e.preventDefault();
        //console.log(deckId, text)
        const { cards: serverCards} = await createCard(deckId!, text)
        setCards(serverCards)
        setText("");
    }

    async function handleDeleteCard(index: number){
        console.log(deckId, index)
        if(!deckId) return;
        const newDeck = await deleteCard(deckId, index);
        setDeck(newDeck);
        setCards(newDeck.cards);
        // setDecks(decks.filter((deck) => deck._id !== deckId))
    }

    useEffect(() => {
        //console.log("WE are here")
        async function fetchDeck() {
            if(!deckId) return;
            const newDeck = await getDeck(deckId);
            setDeck(newDeck);
            setCards(newDeck.cards)
        }
        fetchDeck();
    },[deckId]);

    return (
    <div className="App">
        <ul className='cards'>
        {
            cards.map((card, index) => (
            <li key={index}>
                <button onClick={() => handleDeleteCard(index)}>X</button>
                {card}
            </li>
            ))
        }
        </ul>
        <form onSubmit={handleCreateCard}>
        <label htmlFor='card-text'>Card Text</label>
        <input 
            id='card-text'
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // Save what they typed
            setText(e.target.value)
            }}
        />
        <button>Create Card</button>
        </form>
    </div>
    )
}