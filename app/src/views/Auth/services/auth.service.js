import bimClient from '../../../core/connection/bimClient';

const signIn = async (username, passwd) => {
  const url = 'users/sign_in';
  return await bimClient.post(url, { username, passwd });
};

const signOut = () => {
  localStorage.removeItem('usk');
};

const storeUserInfo = (user, remember) => {
  localStorage.setItem('usk', JSON.stringify(user));
  if (remember) {
    localStorage.setItem('rem', user.username);
  } else {
    localStorage.removeItem('rem');
  }
};

const storeUserPermissions = (projectId) => {
  const res = bimClient.get(`projects/${projectId}/permissions`).then(json => {
    var permissions = [];
    if(json.status === 200){
      permissions = json.data;
    }
    localStorage.setItem('per', JSON.stringify(permissions));
    return JSON.parse(localStorage.getItem('per'));
  })
  return res;
}

const getRememberUsername = () => {
  const username = localStorage.getItem('rem');
  return username;
};

const signUp = async (fullName, username, email, passwd) => {
  const url = 'users/sign_up';
  return await bimClient.post(url, { fullName, username, email, passwd });
};

// const activeAccount = (code, name, username, email, passwd) => {
//   const url = `${GlobalConfig.api.URL}/api/confirm_code`;
//   return (
//     axios.post <
//     BaseResponse <
//     UserDto >>
//       (url,
//       {
//         Code: code,
//         Name: name,
//         Username: username,
//         Email: email,
//         Passwd: passwd,
//       })
//   );
// };

// const requestResetPasswd = (email) => {
//   const url = `${GlobalConfig.api.URL}/api/request_reset_passwd`;
//   return (
//     axios.post <
//     BaseResponse <
//     any >>
//       (url,
//       {
//         Email: email,
//       })
//   );
// };

// const userInfo = () => {
//   const userRaw = localStorage.getItem(GlobalConfig.app.USER_KEY);
//   const userDto = userRaw ? JSON.parse(userRaw) : null;
//   return userDto;
// };

// const isSigned = () => {
//   const currUser = userInfo();
//   const valid =
//     currUser && currUser.Token && !isExpired(currUser.Token) ? true : false;
//   return valid;
// };

// const changePassword = (username, currPasswd, newPasswd) => {
//   const url = `${GlobalConfig.api.URL}/api/change_passwd`;
//   return (
//     axios.post <
//     BaseResponse <
//     any >>
//       (url,
//       {
//         Username: username,
//         CurrPasswd: currPasswd,
//         NewPasswd: newPasswd,
//       })
//   );
// };

export {
  signIn,
  signOut,
  storeUserInfo,
  getRememberUsername,
  signUp,
  storeUserPermissions
  // requestSignUp,
  // activeAccount,
  // requestResetPasswd,
  // userInfo,
  // isSigned,
  // rememberUsername,
  // changePassword,
};
