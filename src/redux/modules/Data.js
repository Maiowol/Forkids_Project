// Data.js   모듈 안에 있는 리듀서를 묶어서 스토어를 만드는 것
import axios from "axios";
import { getCookie } from "../../shared/Cookie";
import io from "socket.io-client";

const socket = io.connect("http://13.125.241.180");

// Actions      --> 저장변수 = 프로젝트명 / 모듈 명 (리듀서 명) / 액션
const GET = "MyPage/GET";
const ProfileGET = "Profile/GET";

// State 초기값
let initialState = {};

// Action Creators      --> 액션 생성 함수
export function GetMyPage(MyPage) {
  return { type: GET, MyPage };
}

export function GetProfile(Profile) {
  return { type: ProfileGET, Profile };
}

// middleware --> 미들웨어 /
export const GetMyPageAxios = (nickname) => {
  return function (dispatch) {
    axios
      .get("http://dlckdals04.shop/api/mypage/profile/" + nickname, {
        headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
      })
      .then((res) => {
        dispatch(GetMyPage(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// export const GetProfileAxois = (nickname) => {
//   return function (dispatch) {
//     axios
//       .get("http://dlckdals04.shop/api/mypage/profile/" + nickname)
//       .then((res) => {
//         dispatch(GetProfile(res.data));
//         console.log(res);
//       });
//   };
// };

// Reducer
export default function Data(state = initialState, action = {}) {
  switch (action.type) {
    case "MyPage/GET": {
      return { state: action.MyPage };
    }
    case "Profile/GET": {
      return { Profile: action.Profile };
    }
    default:
      return state;
  }
}
