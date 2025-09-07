// Export des APIs
export { borrowingsApi } from "../apis/borrowings.api";

// Export des types
export type {
  Borrowing,
  BorrowingWithDetails,
  CreateBorrowingDto,
  UpdateBorrowingDto,
  ReturnBookDto,
  BorrowingStats,
} from "../types/borrowing.type";

// Export des composants
export { BorrowingsList } from "./BorrowingsList";
export { CreateBorrowingForm } from "./CreateBorrowingForm";
export { OverdueBooksList } from "./OverdueBooksList";
export { BorrowingsDashboard } from "./BorrowingsDashboard";
