import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
} from "./author.service";

export const authorRouter = express.Router();

authorRouter.get("/", async (req: Request, res: Response) => {
  try {
    const authors = await getAuthors();
    return res.status(200).json(authors);
  } catch (error: any) {
    return res.status(500).json(error?.message);
  }
});

authorRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const author = await getAuthor(parseInt(req.params?.id));

    if (author) {
      return res.status(200).json(author);
    }

    return res.status(404).send("Author not found");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

// Create an Author
// Body -> Firstname, Lastname
authorRouter.post(
  "/",
  body("firstName").isString(),
  body("lastName").isString(),
  async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      const author = await createAuthor(req.body);
      return res.status(201).json(author);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
);

// Updating Author
authorRouter.put(
  "/:id",
  body("firstName").isString(),
  body("lastName").isString(),
  async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const id: number = parseInt(req.params.id);
    try {
      const author = await updateAuthor(req.body, id);
      return res.status(200).json(author);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
);

// Delete User
authorRouter.delete("/:id", (req: Request, res: Response) => {
  try {
    deleteAuthor(parseInt(req.params.id));
    return res.status(201).send("Author successfully deleted");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
