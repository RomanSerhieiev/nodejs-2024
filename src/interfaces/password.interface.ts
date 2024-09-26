export interface IPasswordSet {
  newPassword: string;
  confirmPassword: string;
}

export interface IPasswordChange extends IPasswordSet {
  currentPassword: string;
}
