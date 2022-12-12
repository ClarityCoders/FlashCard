import express, {Request, Response} from "express";
import mongoose from "mongoose";
import Deck from './models/Deck';

const PORT = 5000;
const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World");
});

app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck)
});

const db = mongoose.connect('mongodb+srv://flashcardsage:6OIRRgmxvUoVmW3G@cluster0.u2hbcfv.mongodb.net/?retryWrites=true&w=majority').then(()=> {
    console.log(`Listening on port ${PORT}`)
    app.listen(PORT);
})