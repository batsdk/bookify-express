import { db } from "../src/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

const seed = async () => {
  await Promise.all([
    db.author.createMany({
      data: getAuthors(),
    }),
  ]);

  const author = await db.author.findFirst({
    where: {
      firstName: "Arthur",
    },
  });

  await Promise.all([
    getBooks().forEach(({ title, isFiction, datePublished }) => {
      db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: author?.id || 3,
        },
      });
    }),
  ]);

  console.log("working", author);
};

const getAuthors = (): Array<Author> => {
  return [
    {
      firstName: "John",
      lastName: "Martston",
    },
    {
      firstName: "Arthur",
      lastName: "Morgan",
    },
    {
      firstName: "Dutch",
      lastName: "Van der Linde",
    },
    {
      firstName: "Sadie",
      lastName: "Adler",
    },
  ];
};

const getBooks = (): Array<Book> => {
  return [
    {
      datePublished: new Date(),
      isFiction: true,
      title: "Red Dead 2",
    },
    {
      datePublished: new Date(),
      isFiction: true,
      title: "Spider Man",
    },
    {
      datePublished: new Date(),
      isFiction: false,
      title: "Ghost of Tsushima",
    },
    {
      datePublished: new Date(),
      isFiction: false,
      title: "Last of Us",
    },
  ];
};

seed();
