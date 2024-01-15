# Project ReadMe

This ReadMe file provides an overview of the project and outlines the tasks to be completed.

## Project Overview

The project aims to build a book management system with features such as book filtering, author-based book retrieval, user creation, and book-liking functionality.

## To-Do List

### 1. Implement Zod for Input Validation

- Replace the current usage of Express Validator with Zod for input validation.
- Update existing validation logic to use Zod schemas for improved validation.

### 2. Filter Books by Fiction or Non-Fiction

- Implement a feature to filter books based on their genre, specifically distinguishing between fiction and non-fiction.
- Update the API or user interface to allow users to filter books accordingly.

### 3. Retrieve Books by Author

- Develop functionality to retrieve books based on the author's name.
- Implement an API endpoint or a query mechanism to fetch books authored by a specific individual.

### 4. User Creation and Book Liking

- Create a user management system, including user registration and authentication.
- Implement a feature that allows users to 'like' or 'favorite' books.
- Ensure that users can only like a book once and provide a mechanism for them to unlike if necessary.

## Getting Started

Follow these steps to set up and run the project:

1. Clone the repository: `git clone https://github.com/batsdk/bookify-express.git`
2. Install dependencies: `npm install`
3. Configure the environment variables.
4. Run the application: `npm run dev`
5. Run `npx prisma db seed` to seed the DB

## Contributors

- Shemil Kaweesha

Feel free to contribute, report issues, or suggest improvements!
