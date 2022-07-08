// 모집 게시글 수정 페이지
import React, { useState } from 'react'
import styled from 'styled-components'

import axios from "axios"
import io from "socket.io-client";

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';

import { useDispatch } from 'react-redux';
import { createPostDB } from '../../redux/modules/post';
import { useNavigate } from 'react-router-dom'
import { getCookie } from "../../shared/Cookie";

import Grid from '../../components/elements/Grid';
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer';

function RecruitEdit() {
  const navigate = useNavigate();
  const [on, setOn] = useState(false)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [age, setAge] = useState('');

  // 모집중 , 모집완료 상태 변경하기 
  const inputChange = () => {
    setOn(!on);
  };

  return (
    <>
      <Header />
      <Grid maxWidth="1440px" height="100%" 
      margin="0 auto" padding="0 12px">
        <Detail>
          <div className='container'>
            <div className='add_input'>
              <div className='toggle'>
                <input className='inputbox' type="checkbox" id="chk1" />
                <label htmlFor="chk1"
                  onClick={inputChange}>
                  <span>선택</span>
                </label>
                <p> {!on ? "모집중" : "모집완료"}</p>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <strong>제목</strong>
                <input
                  onChange={e =>
                    setTitle(e.target.value)}
                  type="text"
                />
              </div>
              <div className='date'
                style={{
                  display: "flex",
                  justifyContent: "center"
                }}>
                <Monat>날짜</Monat>
                <DatePicker
                  customInput={<Input />}
                  selected={date}
                  onChange={date =>
                    setDate(date)}
                  locale={ko}
                  dateFormat="yyyy년 MM월 dd일"
                />
              </div>
              <div>
                <strong>시간</strong>
                <input
                  type="text"
                  onChange={e =>
                    setTime(e.target.value)}
                />
              </div>
              <div>
                <strong>위치</strong>
                <input
                  onChange={e =>
                    setPlace(e.target.value)}
                  type="text"
                /></div>
              <div>
                <strong>연령</strong>
                <input
                  onChange={e =>
                    setAge(e.target.value)}
                  type="text" />
              </div>
            </div>

            
            <div className='box'>
              <textarea
                onChange={e =>
                  setContent(e.target.value)}
              />
              <Btn>
                <button
                  className='btn'
                  onClick={() => 
                    { navigate(`/recruit`) }}
                >
                  취소</button>
                <button
                  className='btn'
                  onClick={() => 
                    { navigate(`/recruit`) }}
                >
                  수정 완료</button>
              </Btn>
            </div>
          </div>
        </Detail>
      </Grid>
      <Footer />
    </>
  )
};

const Detail = styled.div`
    .toggle{
        margin-left: 150px;
        margin-top: 60px;
        display: flex;
    }
    
    label {
        margin-top: 15px;
    }
    
    .toggle > p{
        margin:20px 0px 0px 30px;
        font-size: 20px;
    }
    
    .container{
        display:flex;
        margin-top: 30px;
    }
    
    .add_input{
        width:600px;
        display:flex;
        justify-content:center;
        flex-direction:column;
        font-size : 25px;
        box-sizing: border-box;
        margin-left: 40px;
    }
    
    .add_input > div {
        margin:50px 0px 0px 10px;
        object-fit: cover;
    }
    
    .add_input > div >input{
        border: 1px solid #E4E4E4;
        border-radius: 10px;
        display: inline-block;
        width: 500px;
        padding: 10px;
        margin-left: 30px;
        outline: none;
    }
    
    .box{
      margin-top: 8%;
        width: 50%;
        height: 60vh;
        margin-left: 40px;
    }
    
    strong{
      padding-top: 30px;
    }
    
    textarea {
        padding: 20px;
        margin-top: 73px;
        height 500px;
        width: 610px;
        border:1px solid #E4E4E4;
        border-radius:10px;
        font-size:20px;
        font-weight:400;
        word-break:normal;
        outline: none;
        resize: vertical; /* 상하만 가능 */
    }
    
    
    .Detail_profile{
        width:144px;
        height: 144px;
        border-radius:50%;
        /* display:flex; */
        align-items:center;
        display:block;
        justify-content:center;
    }
    
    .Detail_username{
        width: 70%;
    }
    
    .username{
        height: 50%;
        display:flex;
        align-items:center;
        margin-left:30px;
        font-size:33px;
        width: 100%;
    }
    
    .inputbox{
        position:absolute;
        left:-1000%;
        }
    
    label{
        position: relative;
        display: block;
        width: 80px;
        height: 35px;
        background: #A58646;
        border-radius: 60px;
        transition: background .4s;
    } 
    
    label:after{
        content:"";
        position: absolute;
        left: 0px;
        top: 48%;
        width: 40px;
        height: 40px;
        border-radius:100%;
        background-color:#fff;
        transform: translateY(-50%);
        box-shadow:1px 3px 4px rgba(0,0,0.1);
        transition: all .4s; 
    
    }
    
    input:checked + label:after {
    left:calc(100% - 40.5px);
    }
    input:checked + label{background-color:#6B4E16;}
    
    label span {display:none;}
    
    `

const Monat = styled.div`
    display: flex;
    width: 50px;
    height: 60px;
    margin-right: 29px;
    padding-top: 13px;
    font-weight: bold;
    `;

const Input = styled.input` 
    border: 1px solid #E4E4E4;
    border-radius: 10px;
    width: 450px;
    padding: 10px;
    display: flex;
    margin-bottom: 10px;
    `;

const Btn = styled.div`
    display: flex;
    margin-right: -250px;
    margin-left: 170px;
    
    .btn{
      width: 30%;
      height: 30px;
      border-radius: 20px;
      color: white;
      background-color: #3C3C3C;
      margin-top: 20px;
      margin-right: 10px;
      padding-top: 10px;
      padding-bottom: 34px;
      border: 0;
      outline: 0;
    }
    `;

export default RecruitEdit
