import express, {Request, Response} from "express";
import mongoose from "mongoose";
import Deck from './models/Deck';
import {config} from "dotenv";
import cors from "cors";
import { getDecksController, getDeckController, createDeckController, deleteDeckController } from "./controllers/deckController";
import { createCardController, deleteCardController } from "./controllers/cardController";
config();

const PORT = 5000;
const app = express();
app.use(cors())
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World");
});

app.post('/decks', createDeckController);
app.get('/decks', getDecksController);
app.get('/deck/:deckId', getDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.post("/decks/:deckId/cards", createCardController)
app.delete("/decks/:deckId/cards/:index", deleteCardController)

const db = mongoose.connect(process.env.MONGO_URL!).then(()=> {
    console.log(`Listening on port ${PORT}`)
    app.listen(PORT);
})