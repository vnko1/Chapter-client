export enum EndpointsEnum {
  Email_register = "/auth/register/email",
  Email_confirm = "/auth/register/confirm",
  Resent_otp = "/auth/register/otp",
  Nickname_validation = "/auth/register/nickname",
  Account_create = "/auth/register/account",
  Login = "/auth/login",
  Reset_pass = "/auth/pass-reset",
  Update_pass = "/auth/pass-upd",
  Restore_acc = "/auth/restore",
  Confirm_restore_acc = "/auth/restore/confirm",
  Refresh_Token = "/auth/refresh",

  Profile = "/users",
  Password = "/users/password",
  Subscribe = "/users/subscribe",

  Post = "/posts/post",

  Search = "/search",
}
