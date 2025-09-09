export interface Borrow {
  id?: string;
  _id?: string;
  userId: string;
  bookId: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: "borrowed" | "returned" | "overdue";
}

export interface CreateBorrowingRequest {
  userId: string;
  bookId: string;
  borrowDate?: string;
  dueDate?: string;
}

export interface UpdateBorrowingRequest {
  returnDate?: string;
  status?: "borrowed" | "returned" | "overdue";
}

export interface ReturnBookRequest {
  returnDate?: string;
}
