const BASE = 'https:/ya-praktikum.tech/api/v2';

const BASE_URLS = {
  auth: `${BASE}/auth/`,
  user: `${BASE}/user/`,
  chats: `${BASE}/chats/`,
};

const CHATS = {
  user_base: 'users',
  avatar: 'avatar',
  chat_user: 'chat_user',
  archive: 'archive',
  unarchive: 'unarchive',
  users: (id: string) => `${id}/users`,
  common: (id: string) => `${id}/common`,
  new: (id: string) => `new/${id}`,
  files: (id: string) => `${id}/files`,
  token: (id: string) => `token/${id}`,
};

const USERS = {
  profile: 'profile',
  avatar: 'profile/avatar',
  password: 'password',
  search: 'search',
  user_id: (id: string) => `${id}`,
};

export { BASE_URLS };
