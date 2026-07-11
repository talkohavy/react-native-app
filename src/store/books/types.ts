export type Book = {
  id: string;
  title: string;
  author: string;
  description?: string;
};

export type BooksState = {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  deleteBook: (id: string) => void;
};
