import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { REDIRECT_URI, REST_API_KEY } from "../../shared/kakaoData";

const KakaoLogIn = () => {
  const navigate = useNavigate();

  const params = new URL(document.URL).searchParams;
  const CODE = params.get("code");
  console.log(CODE);

  const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
  const KAKAO_GRANT_TYPE = "authorization_code";

  axios
    .post(
      `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${KAKAO_GRANT_TYPE}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${CODE}`,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    )
    .then((res) => {
      console.log(res);
      const access_token = res.data.access_token;
      console.log(access_token);

      axios
        .post("http://dlckdals04.shop/api/users/kakao/member", {
          access_token,
        })
        .then((res) => {
          console.log(res);
          const user_id = res.data.id;
          const user_email = res.data.kakao_account.email;
          const user_name = res.data.kakao_account.profile.nickname;

          axios
            .post("http://dlckdals04.shop/api/users/kakao/parsing", {
              user_id,
              user_email,
              user_name,
            })
            .then((res) => {
              console.log(res);
              localStorage.setItem("accessToken", res.data.accessToken);
              localStorage.setItem("nickname", res.data.nickname);
              alert("카카오 로그인 완료!");
              navigate("/");
            });
        })
        .catch((err) => console.log(err));
    });

  useEffect(() => {
    KakaoLogIn();
  }, []);

  return <div>카카오 콜백 페이지</div>;
};

export default KakaoLogIn;
