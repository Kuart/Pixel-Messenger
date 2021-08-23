enum CHAT_LIST {
  signup = 'signup',
  signin = 'signin',
  user = 'user',
  logout = 'logout',
}

enum CHAT {
  signup = 'signup',
  signin = 'signin',
  user = 'user',
  logout = 'logout',
}

enum MESSANGER_ERRORS {
  RFNV = 'Registration form is not valid',
  LFNV = 'Login form is not valid',
}

enum SETTING_OPTIONS {
  PROFILE = 'PROFILE',
  CREATE_CHAT = 'CREATE_CHAT',
  LOGOUT = 'LOGOUT',
}

const MESSANGER_SERVICE = {
  CHAT,
  CHAT_LIST,
};

export { MESSANGER_SERVICE, MESSANGER_ERRORS, SETTING_OPTIONS };
