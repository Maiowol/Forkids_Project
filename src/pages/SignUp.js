import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import Grid from '../components/elements/Grid';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { Navigate } from 'react-router-dom';
import axios from "axios";
import logo from '../images/logo.png';
import Header from "../components/Header"

function SignUp() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPw] = useState("");
  const [passwordCheck, setPwCheck] = useState("");
  const [navigate, setNavigate] = useState(false);

  const submit = e => {
    e.preventDefault();
    axios.post("http://13.124.212.159/api/users/signup", {
      email, nickname, password, passwordCheck
    });


    setNavigate(true);
  }
  if (navigate) {
    return <Navigate to="/login" />
  }

  if (navigate) {
    return <Navigate to="/login"/>
  }
  
  return (
    <>
    <Header/>
      <Grid height="100vh" overflowY="hidden">
        <Grid maxWidth="1320px" height="100%" margin="0 auto" padding="0 12px">
          <Container>
            <Grid height="750px">
              <Grid maxWidth="550px" margin="0 auto">
                <Grid align="center" height="100px" margin="0 0 32 0">
                  <Logo>
                    <div className="logo_img"
                      onClick={() => { navigate(`/`) }}
                    ><img src={logo} alt="로고" /></div>
                    <div className="logo">모두의 육아</div>
                  </Logo>
                </Grid>
                <form onSubmit={submit}>
                    <FormGroup>

                    <Grid margin="0 -32px; 0">
                      <label className='form-label'>이메일</label>
                    </Grid>
                    <Grid margin="0 20% 0">
                      <input
                      onChange={ e => setEmail(e.target.value)}
                        className='form-input'
                        placeholder="이메일을 입력하세요"
                        required
                      ></input>
                    </Grid>
                  </FormGroup>
                  <FormGroup>
                    <Grid margin="0 -32px; 0">
                      <label className='form-label'>닉네임</label>
                    </Grid>
                    <Grid margin="0 20% 0">
                      <input
                      onChange={ e => setNickname(e.target.value)}
                        className="form-input"
                        placeholder="닉네임을 입력하세요"
                        maxLength="20"
                        required
                      ></input>
                    </Grid>
                  </FormGroup>
                  <FormGroup>
                    <Grid margin="0 -25px; 0">
                      <label className='form-label'>비밀번호</label>
                    </Grid>
                    <Grid margin="0 20% 0">
                      <input
                     onChange={ e => setPw(e.target.value)}
                        className="form-input"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        maxLength="20"
                        required
                      ></input>
                    </Grid>
                  </FormGroup>
                  <FormGroup>
                    <Grid margin="0 -10px; 0">
                      <label className='form-label'>비밀번호 체크</label>
                    </Grid>
                    <Grid margin="0 20% 0">
                      <input
                      onChange={ e => setPwCheck(e.target.value)}
                        className="form-input"
                        type="password"
                        placeholder="비밀번호를 한 번 더 입력하세요"
                        maxLength="20"
                        required
                      ></input>
                    </Grid>
                  </FormGroup>
                  <Grid height="auto">
                    <Grid margin="0 20% 0" height="auto">
                      <LoginBtn 
                      // onClick={logout}
                      type='submit'>
                        회원가입
                      </LoginBtn>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}

// &nbsp; 공백없는 줄바꿈 
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;

  .has-error {
    .form-label {
      color: #e25c3d;
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
`

const Logo = styled.h1`
 display:flex;
 align-items: center;
 justify-content: center;

 .logo_img > img {
   width: 60px;
 }

 .logo {
   margin-left: 15px;
   color: #F4B03E;
   font-size: 35px;
 }
`


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
  }

  .form-input {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    width: 60%;
    padding: 6px 12px;
    background-color: transparent;
    background-image: none;
    box-sizing: ${(props) => props.boxSizing};
    border: 1px solid #E4E4E4;
    border-radius: 4px;
    -webkit-transition: border-color ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s;
    cursor: text;
    box-sizing: border-box;
    

    &:focus {
      border: 1px solid #111111;
      outline: none;
    }
  }
`


const LoginBtn = styled.button`
height: 65px;
font-size: 15px;
width: 60%;
color: #ffffff;
background-color: #A58646;
text-align: center;
border-radius: 40px;
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
`


export default SignUp;
