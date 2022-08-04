//체험 모집 작성 페이지
import React, { useState } from "react";
import Header from "../../components/main/Header";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
// import { useDispatch } from "react-redux";
// import { createPostDB } from "../../redux/modules/post";
import axios from "axios";
import Footer from "../../components/main/Footer";
import ChatIcon from '../../components/main/ChatIcon'
import moment from 'moment';
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const RecruitAdd = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [place, setPlace] = useState("");
  const [age, setAge] = useState("");
  const datemoment = moment(date).format("YYYY-MM-DD")
  const timemoment = moment(time).format("HH:mm")
  // const dispatch = useDispatch();
  const url = process.env.REACT_APP_URL;


  // const addPost = () => {
    const post_data = {
      title,
      content,
      date: datemoment,
      time: timemoment,
      place,
      age,
    };
  //   dispatch(createPostDB(post_data));
  // };

 const addPost = () => {
      axios
        .post(`${url}/api/recruits`, 
       post_data
        , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          Swal.fire({
            text: `게시글 작성이 완료되었습니다.`,
            icon: "success",
            confirmButtonText: "확인", 
            confirmButtonColor: '#ffb300'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/recruit")
            };
            })
        })
        .catch((err) => {
          Swal.fire({
            text: `게시글 작성을 실패했습니다.`,
            icon: "error",
            confirmButtonText: "확인", 
            confirmButtonColor: '#ffb300'
          })
        });
  };

  return (
    <>
      <Header />
      <BackGround>
        <div style={{
          width: "1100px",
          margin: "0 auto"
        }}>
          <Title>
            <div className="subject">체험 모집</div>
            <div className="page">
              <p>작성하기</p>
            </div>
          </Title>
          <Detail>
            <Box>
              <div className="container">

                {/* 카드 왼쪽 */}
                <div className="add_input">
                  <div className="toggle">
                    <input className="inputbox" type="checkbox" id="chk1"
                     />
                    <label htmlFor="chk1">
                      <span>선택</span>
                    </label>
                    <p>모집중</p>
                  </div>
                  <div className="input__section">
                    <div style={{ marginBottom: "34px" }}>
                      <strong>제목</strong>
                      <input
                        onChange={(e) =>
                          setTitle(e.target.value)}
                        style={{ width: "400px" }}
                        type="text"
                        placeholder="제목을 입력하세요"
                      />
                    </div>
                    <div
                      className="date"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Monat>날짜</Monat>
                      <DatePicker
                        customInput={<Input />}
                        selected={date}
                        onChange={(date) => setDate(date)}
                        minDate={new Date()}
                        dateFormat="yyyy년 MM월 dd일"
                        showDisabledMonthNavigation
                        locale={ko}
                      />
                    </div>
                  </div>
                  <div className="time"
                    style={{
                      display: "flex",
                      justifyContent: "center"
                    }}>
                    <Time>시간</Time>
                    <DatePicker
                      customInput={<Input />}
                      selected={time}
                      onChange={(time) => setTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="시간을 입력하세요"
                      locale={ko}
                    />
                  </div>
                  <div className="location">
                    <strong>위치</strong>
                    <input
                      onChange={(e) =>
                        setPlace(e.target.value)}
                      type="text"
                      placeholder="위치를 입력하세요"
                    />
                  </div>
                  <div className="age">
                    <strong>연령</strong>
                    <input onChange={(e) =>
                      setAge(e.target.value)}
                      type="text"
                      placeholder="참여 아동 연령대를 입력하세요"
                    />
                  </div>
                </div>

                {/* 카드 오른쪽 */}
                <div className="box">
                  <textarea onChange={(e) =>
                    setContent(e.target.value)} 
                    placeholder="체험과 관련한 주요 사항을 상세하게 설명해주세요.
                    예) 아이 연령대 및 성향, 육아 스타일, 이동수단, 최소 인원, 준비물, 예상 금액 등"
                    />
                  <Btn>
                    <Link to="/recruit">
                       <button className="cancel">
                      취소
                    </button>
                    </Link>
                    <button className="btn"
                      onClick={addPost}
                      >
                      등록하기
                    </button>
                  </Btn>
                </div>
              </div>
            </Box>
          </Detail>
        </div>
      </BackGround>
      <ChatIcon />
      <Footer />
    </>
  );
};

const BackGround = styled.div`
font-family: "Nanum Gothic";
background: #F5F5F5;
padding-bottom: 60px;
`;

const Title = styled.div`
  padding-top: 40px;

  .subject {
    color: #a8a8a8;
    margin-bottom: 2px;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  }

  .page {
    font-size: 30px;
    font-weight: 700;

    p {
      font-family: 'Nanum Gothic', sans-serif;
      font-weight: 700;
    }
  }
`;

const Detail = styled.div`
.container {
  display: flex;
}
.add_input {
  width: 530px;
  height: 570px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 25px;
  margin-left: 50px;
}
.add_input > div {
  margin: 40px 0px 0px 10px;
  object-fit: cover;
}
.add_input > div > input {
  border: 1px solid #A8A8A8;
  display: inline-block;
  width: 400px;
  padding: 8px;
  margin-left: 30px;
  border-radius: 10px;
}
.add_input {
  strong {
    font-size: 20px;
  }
}
  .toggle {
    display: flex;
    margin-left: 20px;
    height: 50px;
  }
  
  .toggle > p {
    margin: 17px 0px 0px 20px;
    font-size: 20px;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  }

  .input__section {
    margin: 40px 0px 0px 70px;
    font-size: 20px;
  }

  .input__section > div > input {
    border: 1px solid #A8A8A8;
    display: inline-block;
    width: 370px;
    padding: 14px;
    margin-left: 30px;
    border-radius: 10px;
    padding-left: 12px;
    outline: none;

    font-size: 18px;

    ::placeholder{
      font-size: 19px;
      color: #A8A8A8;
    }
  }
  
  .location {
    input {
      outline: none;
      padding-left: 16px;
      font-size: 19px;
      height: 55px;
      ::placeholder{
        font-size: 19px;
        padding-left: 4px;
        color: #A8A8A8;
      }
    }
  }
  
  .age{
    input {
      outline: none;
      padding-left: 13px;
      font-size: 19px;
      height: 55px;
      ::placeholder{
        font-size: 19px;
        padding-left: 4px;
        color: #A8A8A8;
      }
    }
  }
  
  .box {
    margin-top: 105px;
    width: 404px;
  }
  
  strong {
    padding-top: 30px;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  }
  
  textarea {
    width: 450px;
    height: 450px;
    border: 1px solid #A8A8A8;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 400;
    margin-top: 20px;
    word-break: normal;
    padding: 20px;
    outline: none;
    resize: vertical; /* 상하만 가능 */

    ::placeholder{
      font-size: 19px;
      color: #A8A8A8;
    }
  }
  
  .Detail_profile {
    width: 144px;
    height: 144px;
    border-radius: 50%;
    /* display:flex; */
    align-items: center;
    display: block;
    justify-content: center;
  }
  
  .Detail_username {
    width: 70%;
  }
  
  .username {
    height: 50%;
    display: flex;
    align-items: center;
    margin-left: 30px;
    font-size: 33px;
    width: 100%;
  }
  
  .inputbox {
    position: absolute;
    left: -1000%;
  }

  label {
    margin-top: 16px;
    position: relative;
    display: block;
    width: 59px;
    height: 30px;
    background: #F4B03E;
    border-radius: 60px;
    transition: background 0.4s;
  }

  label:after {
    content: "";
    position: absolute;
    left: 33px;
    top: 47%;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: #fff;
    transform: translateY(-50%);
    box-shadow: 1px 2px 4px rgba(0, 0, 0.1);
  }
  
  // input:checked + label:after {
  //   left: calc(100% - 25.0px);
  // }
  

  // input:checked + label {
  //   background-color: #F4B03E;
  // }
  
  label span {
    display: none;
  }
`;

const Box = styled.div`
width: 1100px;
height: 680px;
background: white;
margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
margin-top: 27px;
margin-bottom: 32px;
display: flex;
flex-direction: column;
border: 1px solid lightgray;
border-radius: 10px;
`;

const Monat = styled.div`
  display: flex;
  width: 50px;
  height: 40px;
  margin-right: 24px;
  margin-top: 20px;
  font-weight: bold;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;
`;

const Time = styled.strong`
display: flex;
width: 80px;
height: 20px;
margin-right: -2px;
margin-top: -10px;
`;

const Input = styled.input`
  border: 1px solid #A8A8A8;
  border-radius: 10px;
  width: 400px;
  height: 60px;
  padding: 10px;
  display: flex;
  margin-top: 5px;
  margin-bottom: -2px;
  cursor: pointer;
  outline: none;
  font-size: 19px;
`;

const Btn = styled.div`
  display: flex;
  margin-right: -190px;
  margin-left: 170px;

  .btn {
    width: 30%;
    height: 30px;
    border-radius: 20px;
    color: white;
    background-color: #3c3c3c;
    margin-top: 20px;
    margin-right: 20px;
    padding-top: 9px;
    padding-bottom: 33px;
    border: 0;
    outline: 0;
  }

  .cancel {
    width: 130px;
    height: 30px;
    border-radius: 20px;
    color: white;
    background-color: #3c3c3c;
    margin-top: 20px;
    margin-right: 20px;
    padding-top: 9px;
    padding-bottom: 33px;
    border: 0;
    outline: 0;
  }
`;

export default RecruitAdd;
