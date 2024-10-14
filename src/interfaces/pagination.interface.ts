export interface IPaginated<T> {
  page: number;
  totalPages: number;
  limit: number;
  totalItems: number;
  data: T;
}
