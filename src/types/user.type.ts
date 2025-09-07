export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: "user" | "admin" | "librarian" | "member";
  membershipDate?: string;
  active?: boolean;
}
