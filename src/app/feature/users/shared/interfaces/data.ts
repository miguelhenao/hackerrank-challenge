import { UserResponse } from './user';

export interface DataResponse {
  data: UserResponse[];
  page: number;
  per_page: number;
  support: { text: string; url: string };
  total: number;
  total_pages: number;
}
