export interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface UserRequest {
  name: string;
  job: string;
}
