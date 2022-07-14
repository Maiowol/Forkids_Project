import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { REDIRECT_URI, REST_API_KEY } from "../../shared/kakaoData";

const KakaoLogIn = () => {
  const navigate = useNavigate();

  let params = new URL(document.URL).searchParams;
  let code = params.get("code");
  console.log(code);

  const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
  const KAKAO_GRANT_TYPE = "authorization_code";

  axios
    .post(
      `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${KAKAO_GRANT_TYPE}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    )
    .then((res) => {
      console.log(res);
      const token = res.data.access_token;
      console.log("token: ", token);

      axios
        .post("http://dlckdals04.shop/api/users/kakao/member", {
          token,
        })
        .then((res) => {
          console.log(res);
        });

      axios.post("");
    });

  useEffect(() => {
    KakaoLogIn();
  }, []);

  return <div>카카오 콜백 페이지</div>;
};
// axios.post(`https://kauth.kakao.com/oauth/token?
// grant_type=${grant_type}
// &client_id==${REST_API_KEY}
// &redirect_uri=${REDIRECT_URI}
// &code=${code}`
// , {
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
// })
//     .then(res => console.log(res))
//     .then(data => {
//         if (data.accessToken) {
//             localStorage.setItem('token', data.accessToken)
//         } else {
//             navigate('/');
//         }
//     });

// React.useEffect(() => {
//     if (!location.search) return;
//     getKakaoToken();
// }, []);

// return (
//     <div>
//         카카오 콜백 페이지
//     </div>
// )

export default KakaoLogIn;
