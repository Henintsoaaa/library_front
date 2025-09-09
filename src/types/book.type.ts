export interface Book {
  id?: string;
  _id?: string;
  title: string;
  author: string;
  isbn: string;
  category?: string;
  publishedYear?: number;
  copies?: number;
  availableCopies?: number;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookResponse {
  books: Book[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BookContextType {
  books: Book[];
  fetchBooks: (page?: number, pageSize?: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  category?: string;
  publishedYear?: number;
  copies?: number;
  availableCopies?: number;
  location?: string;
}

export interface BookUpdateData {
  title?: string;
  author?: string;
  isbn?: string;
  category?: string;
  publishedYear?: number;
  copies?: number;
}
