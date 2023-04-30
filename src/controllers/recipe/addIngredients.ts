import { Request, Response } from "express";
import Deck from "../../models/recipe";

export async function addIngredients(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  if (!deck) return res.status(400).send("no deck of this id exists");
  const { text } = req.body;
  deck.ingredients.push(text);
  await deck.save();
  res.json(deck);
}
