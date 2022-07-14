import { Cookies } from "react-cookie";


const cookies = new Cookies();

// [ 쿠키 데이터 저장 ]   사용법 => setCookie( 'KEY값' , 저장할데이터 )
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};



// [ 쿠키 데이터 가져오기 ]  사용법 => getCookie('KEY값')
export const getCookie = (name) => {
  return cookies.get(name);
};



// [ 쿠키삭제 ]  사용법 => removeCookie('삭제할 KEY값')
export const removeCookie = (name) => {
  return cookies.remove(name);
};