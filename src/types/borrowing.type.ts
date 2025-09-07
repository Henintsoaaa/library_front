import type { Book } from "./book.type";
import type { User } from "./user.type";

export interface Borrowing {
  _id: string;
  userId: string;
  bookId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string | null;
  status: "borrowed" | "returned" | "overdue";
}

export interface BorrowingWithDetails extends Borrowing {
  user?: User;
  book?: Book;
}

export interface CreateBorrowingDto {
  userId: string;
  bookId: string;
  borrowDate?: string;
  dueDate?: string;
}

export interface UpdateBorrowingDto {
  returnDate?: string;
  status?: "borrowed" | "returned" | "overdue";
}

export interface ReturnBookDto {
  returnDate?: string;
}

export interface BorrowingStats {
  totalBorrowings: number;
  activeBorrowings: number;
  returnedBorrowings: number;
  overdueBorrowings: number;
}
