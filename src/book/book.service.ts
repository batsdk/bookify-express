import { BookRead, BookWrite } from "../@types/book.type";
import { db } from "../utils/db.server";

export const getBooks = async (): Promise<Array<BookRead>> => {
  const books = await db.book.findMany({
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return books;
};

export const getBook = async (id: number): Promise<BookRead | null> => {
  const book = await db.book.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return book;
};

export const createBook = async (body: BookWrite): Promise<BookRead> => {
  const { authorId, datePublished, isFiction, title } = body;

  const book = await db.book.create({
    data: {
      title,
      authorId,
      isFiction,
      datePublished,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return book;
};

export const updateBooke = async (
  body: BookWrite,
  id: number
): Promise<BookRead> => {
  const { authorId, datePublished, isFiction, title } = body;
  const book = await db.book.update({
    where: {
      id,
    },
    data: {
      title,
      isFiction,
      authorId,
      datePublished,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return book;
};

export const deleteBook = async (id: number): Promise<void> => {
  await db.book.delete({
    where: {
      id,
    },
  });
};
