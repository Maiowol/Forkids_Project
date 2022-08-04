import React, { useState } from "react";
import styled from "styled-components";
import Grid from "../../components/elements/Grid";
import axios from "axios";
import Header from "../../components/main/Header";
import EmailAlert from "../../components/alert/EmailAlert";
import Footer from "../../components/main/Footer";

const SignUp = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [emailcode, setEmailCode] = useState('');

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPw] = useState("");
  const [passwordCheck, setPwCheck] = useState("");
  // 오류 메세지 상태저장
  const [emailMessage, setEmailMessage] = useState(null);
  const [nicknameMessage, setNicknameMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(null);
  const [OverlapEmailMessage, setOverlapEmailMessage] = useState("");
  const [OverlapNicknameMessage, setOverlapNicknameMessage] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [OverLapEmail, checkOverlapEmail] = useState(false);
  const [OverLapNickName, checkOverlapNickName] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const url = process.env.REACT_APP_URL;

  // 이메일 검사
  const onChangeEmail = (e) => {
    const emailRegEx =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(e.target.value);
    if (!emailRegEx.test(emailCurrent)) {
      setEmailMessage("이메일 형식으로 입력해주세요.");
      setIsEmail(false);
    } else {
      setEmailMessage("이메일 중복 확인을 해주세요.");
      setIsEmail(true);
    }
  };

  // 닉네임 검사
  const onChangeNickname = (e) => {
    const nickRegEx = /^[가-힣0-9a-zA-Z]{2,10}$/;
    const nicknameCurrent = e.target.value;
    setNickname(nicknameCurrent);
    if (!nickRegEx.test(nicknameCurrent)) {
      setNicknameMessage(
        "닉네임은 한글, 영문 대/소문자, 숫자 2~10자리여야 합니다."
      );
      setIsNickname(false);
    } else {
      setNicknameMessage("닉네임 중복 확인을 해주세요.");
      setIsNickname(true);
      setNickname(e.target.value);
    }
  };

  // 패스워드 검사
  const onChangePassword = (e) => {
    // const passwordRegEx = /^(?=.*\\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,16}$/;
    // /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value;
    setPw(passwordCurrent);
    if (!passwordRegEx.test(passwordCurrent)) {
      setPasswordMessage(
        "비밀번호는 한글, 영문 대/소문자, 4~16자리여야 합니다."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("사용 가능한 비밀번호입니다.");
      setIsPassword(true);
      setPw(e.target.value);
    }
  };

  // 패스워드 확인 검사
  const onChangePasswordConfirm = (e) => {
    const passwordConfirmCurrent = e.target.value;
    setPwCheck(passwordConfirmCurrent);
    if (password === passwordConfirmCurrent) {
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호 확인란이 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    }
  };

  //이메일 중복 확인
  const Checkemail = async () => {
    if (email === "") {
      checkOverlapEmail(false);
      setEmailMessage("사용할 이메일을 입력해주세요");
    }

    if (isEmail) {
      await axios.post(`${url}/api/users/signup/emailCheck`, {
        email
      }
      ).then((res) => {
        // console.log(res)
        if (res.data.result) {
          checkOverlapEmail(true);
          setOverlapEmailMessage("사용 가능한 이메일입니다.");
        }
      })
        .catch((err) => {
          // console.log(err)
          checkOverlapEmail(false);
          setIsEmail(false);
          setEmailMessage("사용 중인 이메일입니다.");
        });
    };
  };

  //닉네임 중복 확인
  const Checknikname = async () => {
    if (nickname === "") {
      checkOverlapNickName(false);
      setNicknameMessage("사용할 닉네임을 입력해주세요");
    }

    if (isNickname) {
      await axios.post(`${url}/api/users/signup/nicknameCheck`, {
        nickname
      }
      ).then((res) => {
        if (res.data.result) {
          checkOverlapNickName(true);
          setOverlapNicknameMessage("사용 가능한 닉네임입니다.");
        }
      })
        .catch((err) => {
          checkOverlapNickName(false);
          setIsNickname(false);
          setNicknameMessage("사용 중인 닉네임입니다.");
        });
    };
  };

  // 이메일 인증코드 받기
  const register = (e) => {
    e.preventDefault();
    if (email && nickname && password && passwordCheck.length > 0 &&
      OverLapEmail === true && OverLapNickName === true) {
      setDisable(true)
      setModalIsOpen(true)
      axios
        .post(`${url}/api/users/signup/authMail`, {
          email
        })
        .then((response) => {
          // console.log(response);
          setEmailCode(response.data.authCode)
        })
        .catch((error) => {
          // console.log(error);
          // console.log(error.response.data.Message);
        });
    } else {
      return null
    }
  }

  const data = {
    email,
    nickname,
    password,
    passwordCheck
  }


  return (
    <>
      <Header />
      <BackGround>
        <Grid height="100vh" overflowY="hidden">
          <Grid maxWidth="1440px" height="100%" margin="0 auto" padding="0 12px">
            <Container>
              <Grid height="700px">
                <Grid maxWidth="550px" margin="0 auto">
                  <div className="Box">
                    <Grid align="center" height="50px">
                      <Title>회원가입</Title>
                    </Grid>
                    <div>
                      <Box>
                        {/* 이메일 */}
                        <label className="form-label">
                          이메일
                        </label>
                        <div className="formbox">
                          <input
                            onChange={onChangeEmail}
                            type="text"
                            className="form-input"
                            placeholder="이메일을 입력하세요"
                          ></input>
                          <div className="check_btn">
                            <button
                              onClick={Checkemail}
                            >
                              중복 확인
                            </button>
                          </div>

                        </div>
                        <div className="message_div">
                          {OverLapEmail ? (
                            <span
                              className="print_message"
                              style={{ color: "#5493f1" }}
                            >
                              {OverlapEmailMessage}
                            </span>
                          ) : email.length > 0 ? (
                            <span
                              className="print_message"
                              style={{ color: isEmail ? "#5493f1" : "#ff2626" }}
                            >
                              {emailMessage}
                            </span>
                          ) : (
                            <span
                              className="print_message"
                              style={{ color: "#ff2626" }}
                            >
                              {emailMessage}
                            </span>
                          )}
                        </div>

                        {/* 닉네임 */}
                        <label className="form-label">
                          닉네임
                        </label>
                        <div className="formbox">
                          <input
                            onChange={onChangeNickname}
                            type="text"
                            className="form-input"
                            placeholder="닉네임을 입력하세요"
                          ></input>
                          <div className="check_btn">
                            <button
                              onClick={Checknikname}
                            >
                              중복 확인
                            </button>
                          </div>

                        </div>
                        <div className="message">
                          {OverLapNickName ? (
                            <span
                              className="print_message"
                              style={{ color: "#5493f1" }}
                            >
                              {OverlapNicknameMessage}
                            </span>
                          ) : nickname.length > 0 ? (
                            <span
                              className="print_message"
                              style={{
                                color: isNickname ? "#5493f1" : "#ff2626",
                              }}
                            >
                              {nicknameMessage}
                            </span>
                          ) : (
                            <span
                              className="print_message"
                              style={{ color: "#ff2626" }}
                            >
                              {nicknameMessage}
                            </span>
                          )}
                        </div>

                        {/* 비밀번호 */}
                        <label className="form-label">
                          비밀번호
                        </label>
                        <input
                          onChange={onChangePassword}
                          type="password"
                          className="form-input"
                          placeholder="비밀번호를 입력하세요"
                        ></input>
                        <div className="message">
                          {password.length > 0 && (
                            <span
                              className="print_message"
                              style={{
                                color: isPassword ? "#5493f1" : "#ff2626",
                              }}
                            >
                              {passwordMessage}
                            </span>
                          )}
                        </div>

                        {/* 비밀번호 확인 */}
                        <label className="form-label">
                          비밀번호 체크
                        </label>
                        <input
                          onChange={onChangePasswordConfirm}
                          type="password"
                          className="form-input"
                          placeholder="비밀번호를 한 번 더 입력하세요"
                        ></input>
                        <div className="message_Passworddiv">
                          {passwordCheck.length > 0 && (
                            <span
                              className="print_message"
                              style={{
                                color: isPasswordConfirm ? "#5493f1" : "#ff2626",
                              }}
                            >
                              {passwordConfirmMessage}
                            </span>
                          )}
                        </div>
                      </Box>
                      <Grid height="auto">
                        
                          <LoginBtn
                            disabled={disable}
                            onClick={register}
                          >
                            가입 완료</LoginBtn>
                          {/* 이메일 인증코드, 데이터 등 EmailAlert으로 넘김 */}
                          <EmailAlert
                            emailcode={emailcode}
                            data={data}
                            open={modalIsOpen}
                            onClose={() =>
                              setModalIsOpen(false)}
                          />
                      </Grid>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </BackGround>
      <Footer/>
    </>
  );
};


const BackGround = styled.div`
background: #FAFAFA;
padding-bottom: 100px;
`;

const Container = styled.div`
font-family: "Nanum Gothic";
width: 620px;
height: 800px;
padding-bottom: 30px;

background: white;

margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
margin-top: 80px;
margin-bottom: 32px;
display: flex;
flex-direction: column;

border: 1px solid lightgray;
border-radius: 10px;

  .form-label {
    margin-top: 10px;
    font-weight: bold;
    color: #3C3C3C;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  }

  .form-input {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    width: 330px;
    padding: 6px 12px;
    background-color: transparent;
    background-image: none;
    box-sizing: ${(props) => props.boxSizing};
    border: 1px solid #A8A8A8;
    border-radius: 10px;
    -webkit-transition: border-color ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s;
    cursor: text;
    box-sizing: border-box;
    margin-bottom: 10px;

    &:focus {
      border: 1px solid #F4B03E;
      outline: none;
    }

    ::placeholder {
      font-size: 15px;
      color: #A8A8A8;
    } 
  }

  .Box {
    box-sizing: border-box;
    margin-top: 60px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;
`;

const LoginBtn = styled.button`
  height: 50px;
  font-size: 15px;
  width: 60%;
  color: #ffffff;
  background-color: #3c3c3c;
  text-align: center;
  border-radius: 10px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;

  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  cursor: pointer;
  margin-top: 30px;
  margin-left: 100px;

  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const Box = styled.div`
  margin: 40px 0px 0px 100px;
  
  .formbox {
    display: flex;
  }


  .check_btn {
    margin-left: 10px;
    margin-top: 3px;
    width: 100px;
    height: 35px;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  

    button {
    border-radius: 10px; 
    font-weight: 600;
    background: #FAFAFA;
    color: #3C3C3C;
    border: 1px solid #A8A8A8;
    padding: 6px 12px 6px 12px;
    }
    
  }

`;

export default SignUp;
