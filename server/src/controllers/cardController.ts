import express, {Request, Response} from "express";
import Deck from '../models/Deck';

export async function getCardsController(req: Request, res: Response) {
    const decks = await Deck.find();
    res.json(decks)
};

export async function createCardController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);

    if (!deck) return res.status(400).send('no deck of this id exists');

    const { text } = req.body;
    deck.cards.push(text);

    await deck.save();
    res.json(deck);
};

export async function deleteCardController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const index = req.params.index;
    const deck = await Deck.findById(deckId);
    if(!deck) return res.status(400).send("No deck of this ID Exists.")
    console.log(deck)
    deck.cards.splice(parseInt(index),1);
    console.log(deck)
    await deck.save()
    res.json(deck)
};