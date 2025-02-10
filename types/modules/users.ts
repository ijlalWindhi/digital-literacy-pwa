export type TUsers = {
  uid: string;
  email: string;
  username: string;
  name: string;
  is_active: boolean;
  image: string;
  role: {
    id: number;
    nama: string;
  };
};
