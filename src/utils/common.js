//토큰 쿠키에 저장
const setCookieToken = (value) => {
  document.cookie = `token=${value}`;
};

//리플래시토큰 쿠키에 저장
const setCookieRefresh = (value) => {
  document.cookie = `refresh=${value}`;
};
//user 정보 로컬스토리지에 저장
const setLocalStorageUser = (value) => {
  localStorage.setItem("userData", JSON.stringify(value));
};

//토큰 쿠키에서 불러오기
const getCookieToken = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
};

//리플래시토큰 쿠키에서 불러오기
const getCookieRefresh = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)refresh\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
};

//유저정보 로컬스토리지에서 불러오기
const getlocalStorageUser = () => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return storedData;
};

const deleteData = (location, key) => {
  if (location === "localStorage") {
    localStorage.removeItem(key);
  } else if (location === "cookie") {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
};

const Logout = () => {
  //로그아웃 이벤트
  deleteData("cookie", "token"); //토큰삭제
  deleteData("cookie", "refresh"); //리플리시토큰 삭제
  deleteData("localStorage", "userData"); //유저 정보 삭제
  window.location.href = "/login";
};

export {
  setCookieToken,
  setCookieRefresh,
  setLocalStorageUser,
  getCookieToken,
  getCookieRefresh,
  getlocalStorageUser,
  deleteData,
  Logout,
};
