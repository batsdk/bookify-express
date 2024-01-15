import express from "express";
import type { Request, Response } from "express";

import { createBook, getBook, getBooks, updateBooke } from "./book.service";
import { body, validationResult } from "express-validator";

export const bookRouter = express.Router();

bookRouter.get("/ ", async (req: Request, res: Response) => {
  try {
    const books = await getBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(404).send("Can't find Books");
  }
});

bookRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const book = await getBook(parseInt(req.params.id));
    res.status(200).json(book);
  } catch (error: any) {
    res.status(404).send("Can't find Books");
  }
});

bookRouter.post(
  "/",
  body("title").isString(),
  body("authorId").isInt(),
  body("datePublished").isDate().toDate(),
  body("isFiction").isBoolean(),
  async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send(error.array());
    }

    try {
      const book = await createBook(req.body);
      res.status(201).json(book);
    } catch (error: any) {
      res.status(404).send("Can't Create Books");
    }
  }
);

bookRouter.put(
  "/:id",
  body("title").isString(),
  body("authorId").isInt(),
  body("datePublished").isDate().toDate(),
  body("isFiction").isBoolean(),
  async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).send(error.array());
    }

    try {
      const book = updateBooke(req.body, parseInt(req.params.id));
      res.status(201).json(book);
    } catch (error: any) {
      res.status(404).send("Can't find Books");
    }
  }
);
