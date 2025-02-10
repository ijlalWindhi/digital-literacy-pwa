export interface IAuthStore {
  profile: TResponseProfile;
  permission: TResponsePermission[];
  menu: TResponseMenu[];
  getProfile: () => Promise<TResponseProfile>;
  getPermission: () => Promise<TResponsePermission[]>;
  getMenu: () => Promise<TResponseMenu[]>;
}

// Login
export type TPayloadLogin = {
  email: string;
  password: string;
};

export type TResponseLogin = {
  id: string;
  email: string;
  username: string;
  is_active: boolean;
  token: string;
};

// Profile
export type TResponseProfile = {
  id: string;
  email: string;
  username: string;
  name: string;
  is_active: boolean;
  refreshed_token: string;
  image: string;
  role: {
    id: number;
    nama: string;
  };
};

// Menu
export interface ISubNavItem {
  title: string;
  path: string;
}

export type TResponseMenu = {
  id: number;
  title: string;
  path: string;
  icon: string;
  sub: boolean | ISubNavItem[];
};

// Permission
export type TModule = {
  id: number;
  nama: string;
};

export type TResponsePermission = {
  id: number;
  permission: string;
  module: TModule;
};
