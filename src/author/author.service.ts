import { db } from "../utils/db.server";
import { Author } from "../@types/author.type";

// Get All Authors
export const getAuthors = async (): Promise<Array<Author>> => {
  const authors = await db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  return authors;
};

// Get Single Author
export const getAuthor = async (id: number): Promise<Author | null> => {
  const author = await db.author.findUnique({
    where: {
      id,
    },
  });

  return author;
};

// Create Author
export const createAuthor = async (
  body: Omit<Author, "id">
): Promise<Author> => {
  const { firstName, lastName } = body;

  const author = await db.author.create({
    data: {
      firstName,
      lastName,
    },
  });

  return author;
};

// Update Author
export const updateAuthor = async (
  body: Omit<Author, "id">,
  id: number
): Promise<Author> => {
  const { firstName, lastName } = body;

  const author = await db.author.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
    },
  });

  return author;
};

// Delete Author
export const deleteAuthor = async (id: number): Promise<void> => {
  await db.author.delete({
    where: {
      id,
    },
  });
};
