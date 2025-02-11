import { TUsers } from "./users";

export interface IAuthStore {
  me: TUsers;
  setMe: (user: TUsers) => Promise<TUsers>;
}
