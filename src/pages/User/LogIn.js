//로그인 페이지
import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { RiKakaoTalkFill } from "react-icons/ri";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
import Grid from "../../components/elements/Grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>;

function LogIn() {
  
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const navigate = useNavigate();

  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const url = process.env.REACT_APP_URL


  //카카오톡 로그인
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoURL = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  //로컬 로그인
  const submit = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/api/users/signin`, {
        email,
        password,
      })
      .then((response) => {
        Swal.fire({
          text: `로그인이 완료되었습니다!`,
          icon: "success",
          confirmButtonText: "확인",
          confirmButtonColor: '#ffb300'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
        localStorage.setItem("profileUrl", response.data.profileUrl);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem('nickname', response.data.nickname)
      })
      .catch((error) => {
        alert("로그인을 다시 해주세요");
        // console.log(error.message);
      });
  };

  return (
    <>
      <Header />
      <BackGround>
        <Grid height="100vh" overflowY="hidden">
          <Grid maxWidth="1440px" height="100%" margin="0 auto" padding="0 12px">
            <Box>
              <Container>
                <Grid height="700px">
                  <Grid maxWidth="550px" margin="0 auto">
                    <Grid align="center" height="100px" margin="0 0 32 0">
                      <LoginTitle>로그인</LoginTitle>
                    </Grid>
                    <form onSubmit={submit}>
                      <FormGroup>
                        <Grid margin="0 -32px; 0">
                          <label className="form-label">이메일</label>
                        </Grid>
                        <Grid margin="0 20% 0">
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            name="email"
                            placeholder="이메일을 입력하세요"
                            required
                          />
                        </Grid>
                      </FormGroup>
                      <FormGroup>
                        <Grid margin="0 -25px; 0">
                          <label className="form-label">비밀번호</label>
                        </Grid>
                        <Grid margin="0 20% 0">
                          <input
                            onChange={(e) => setPw(e.target.value)}
                            className="form-input"
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력하세요"
                            maxLength="20"
                            required
                          />
                        </Grid>
                      </FormGroup>
                      <Grid height="auto">
                        <Grid margin="0 20% 0" height="auto">
                          <LoginBtn type="submit">로그인</LoginBtn>
                        </Grid>
                        <Grid height="auto">
                          <FormSeperator>OR</FormSeperator>
                        </Grid>
                        <Grid margin="32px 0 0 0" height="auto" align="center">
                          <SocialLogin
                            onClick={kakaoURL}
                          >
                            <RiKakaoTalkFill size="30" />
                            <p style={{
                              fontFamily: 'Nanum Gothic',
                              fontWeight: "700"
                            }}>
                              Login with Kakao
                            </p>
                          </SocialLogin>
                        </Grid>
                        <Grid margin="42px 0 0 0" height="auto" align="center">
                          {/* <JoinLink>아이디 찾기 | &nbsp;</JoinLink>
                      <JoinLink>비밀번호 찾기 | &nbsp;</JoinLink> */}
                          <JoinLink
                            onClick={() => {
                              navigate(`/signup`);
                            }}
                          >
                            회원가입 &nbsp;
                          </JoinLink>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Grid>
        </Grid>  
      </BackGround>
     <Footer />    
    </>
  );
}

const Container = styled.div`
  font-family: "Nanum Gothic"; 
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;

  .has-error {
    .form-label {
      color: #e25c3d;
      font-family: 'Nanum Gothic', sans-serif;
      font-weight: 700;
    }
    .form-input {
      border: 1px solid #e25c3d;
      &:focus {
        border: 1px solid #e25c3d;
      }
    }
    .email-validation {
      font-size: 12px;
      color: #e25c3d;
    }
  }
`;

const BackGround = styled.div`
background: #FAFAFA;
padding-bottom: 100px;
`;

const Box = styled.div`
width: 550px;
height: 650px;

background: white;

margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
margin-top: 80px;
margin-bottom: 32px;
display: flex;
flex-direction: column;

border: 1px solid lightgray;
border-radius: 10px;
`;

const LoginTitle = styled.h1`
  font-size: 28px;
  margin: 0 0 8px 0;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;
`;

const SocialLogin = styled.a`
  border-radius: 10px;
  display: inline-flex;
  color: #22211a;
  width: 60%;
  height: 50px;
  background-color: #fee501;
  justify-content: center;
  padding: 9px 0;
  font-weight: 500;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;

  transition: background-color 0.1s ease-in-out, border-color 0.1s ease-in-out,
    color 0.1s ease-in-out;

  p {
    margin-top: 3px;
  }
  
  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #ffdd00;
    color: black;
  }
`;

const FormSeperator = styled.p`
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 20px;
  margin-bottom: -12px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 800;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;

  .form-label {
    display: inline-flex;
    -webkit-box-align: baseline;
    -webkit-align-items: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
    width: 60%;
    justify-content: center;
    max-width: 100%;
    margin-bottom: 6px;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  }

  .form-input {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 60%;
    padding: 6px 12px;
    background-color: transparent;
    background-image: none;
    box-sizing: ${(props) => props.boxSizing};
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    -webkit-transition: border-color ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s;
    cursor: text;
    box-sizing: border-box;

    &:focus {
      border: 1px solid #F4B03E;
      outline: none;
    }

    ::placeholder {
      font-size: 15px;
      color: #A8A8A8;
    } 
  }
`;

const LoginBtn = styled.button`
  height: 44px;
  font-size: 15px;
  width: 60%;
  color: #ffffff;
  background-color: #3c3c3c;
  text-align: center;
  border-radius: 10px;
  touch-action: manipulation;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  cursor: pointer;

  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const JoinLink = styled.a`
  color: #767676;
  transition: color 0.1s ease-in-out, fill 0.1s ease-in-out,
    opacity 0.1s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;

  &:hover {
    color: #111111;
  }
`;

export default LogIn;