export interface userLoginDto {
  email: string;
  password: string;
}

export interface createdUserDto {
  role: string;
  id: string;
  email: string;
  updatedAt: string;
  createdAt: string;
  first_name?: null;
  second_name?: null;
  password?: string;
}
