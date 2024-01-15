import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Routers
import { authorRouter } from "./author/author.router";
import { bookRouter } from "./book/book.router";

dotenv.config();

const PORT: number = 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
