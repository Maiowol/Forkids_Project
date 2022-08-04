import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const KakaoLogIn = () => {
  const navigate = useNavigate();

  const params = new URL(document.URL).searchParams;
  const CODE = params.get("code");
  // console.log(CODE);

  const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
  const KAKAO_GRANT_TYPE = "authorization_code";
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const url = process.env.REACT_APP_URL;

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
      //   console.log(res);
      const access_token = res.data.access_token;
      //   console.log(access_token);

      axios
        .post(`${url}/api/users/kakao/member`, {
          access_token,
        })
        .then((res) => {
          //   console.log(res);
          const user_id = res.data.id;
          const user_email = res.data.kakao_account.email;
          const user_name = res.data.kakao_account.profile.nickname;

          axios
            .post(`${url}/api/users/kakao/parsing`, {
              user_id,
              user_email,
              user_name,
            })
            .then((res) => {
              console.log(res);

              Swal.fire({
                text: `카카오톡 로그인에 성공했습니다`,
                icon: "success",
                confirmButtonText: "확인",
                confirmButtonColor: "#ffb300",
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.setItem("profileUrl", res.data.profileUrl);
                  localStorage.setItem("accessToken", res.data.accessToken);
                  localStorage.setItem("nickname", res.data.nickname);
                  navigate("/");
                  window.location.reload();
                }
              });
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
