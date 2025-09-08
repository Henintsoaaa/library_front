export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  category?: string;
  publishedYear?: number;
  copies?: number;
}

export interface CreateBookDto {
  title: string;
  author: string;
  isbn: string;
  category?: string;
  publishedYear?: number;
  copies?: number;
}

export interface UpdateBookDto {
  title?: string;
  author?: string;
  isbn?: string;
  category?: string;
  publishedYear?: number;
  copies?: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BooksResponse {
  books: Book[];
  pagination: PaginationInfo;
}
