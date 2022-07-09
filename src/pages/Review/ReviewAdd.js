import React, { useState } from 'react'

//style
import styled from 'styled-components'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import { FaStar } from "react-icons/fa";
import { AiOutlineFileImage } from "react-icons/ai";

//elements & components
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer';
import Grid from '../../components/elements/Grid';

import axios from "axios"
import io from "socket.io-client";
import { getCookie } from "../../shared/Cookie";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { createPostDB } from '../../redux/modules/post';

function ReviewAdd() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [age, setAge] = useState('');
  const [imageSrc, setImageSrc] = useState('')
  const image_ref = useState(null)

  const navigate = useNavigate();

  // 이미지 미리보기
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  }

  // const handleForm = (e) => {
  //   setPost({
  //     ...post,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    <>
      <Header />
      <Grid maxWidth="1440px" height="100%"
        margin="0 auto" padding="0 12px">
        <Place>
          <div className='place'>
            <div className='images'>
              <div className='title'>
                대표이미지
              </div>
            </div>
            <input type='file' 
              ref={image_ref}
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
                accept='image/jpg,image/png,image/jpeg,image/gif'
                id='profile_img_upload' />
            <div className='imageBox'>
              
              {/* <label
               for='profile_img_upload'>
              <AiOutlineFileImage />
              </label> */}
                <div className='img'></div>
                <div className='img'></div>
                <div className='img'></div>
                <div className='img'></div>
                <div className='img'></div>
            </div>
            <div className='mainBox'>
              <div className='card-left'>
                <div className='position'>
                  <strong>제목</strong>
                  <input type="text" />
                </div>
                <div className='position'>
                  <strong>위치</strong>
                  <input type="text" />
                </div>
                <div className='position'>
                  <strong> 별점</strong>
                  <span> ⭐⭐⭐⭐⭐</span>
                  <span>4.0점</span>
                </div>
              </div>
              <div className='card-right'>
                <textarea />
                {/* <span className='btnList'>
                      <button className='ParkBtn'> 주차가능</button>
                      <button className='KidBtn'> 예스키즈존</button>
                    </span> */}
              </div>

            </div>
            <Btn>
              <button
                className='btn'
                onClick={() => { navigate(`/`) }}
              >
                취소 </button>
              <button
                className='btn'
              // onClick={addPost}
              >
                등록하기</button>
            </Btn>
          </div>
        </Place>
      </Grid>
      <Footer />
    </>
  )
};

const Place = styled.div`
.place {
    width: 100%; 
}

.title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    padding:10px;
    margin-left: 70px;
    margin-top: 40px;
}

.imageBox{
  width:90%;
  margin:auto;
  height: 30%;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-bottom: 30px;
}

.img{
  width:200px;
  height:220px;
  border: 1px solid #E4E4E4;
  border-radius: 10px;
  margin-top: 30px;
  margin-left: 40px;
}

.images{
    width:90%;
    height: 5%;
    margin:auto; 
}

.mainBox{  
    display: flex;
    margin-left: 200px;
}

.card-left > div > input {
  border: 1px solid #E4E4E4;
  border-radius: 10px;
  width: 330px;
  height: 50px;
  margin-left: 20px;
}

.card-right{
    width: 700px;
    height: 440px;
    display: flex;
    justify-content: center;
    align-items:center;
}

textarea {
  width: 500px;
  height: 364px;
  border:1px solid #E4E4E4;
  border-radius:10px;
  font-size:20px;
  font-weight:400;
  word-break:normal;
  outline: none;
  resize: vertical; /* 상하만 가능 */
}

.position{
    margin: 40px 0px 30px 30px;
}

.position > span{
    margin-right: 30px;
}
`

const Btn = styled.div`
display: flex;
margin-left: 800px;

.btn{
width: 30%;
height: 30px;
border-radius: 20px;
color: white;
background-color: #3C3C3C;
margin-top: 20px;
margin-right: 10px;
padding-top: 9px;
padding-bottom: 33px;
border: 0;
outline: 0;
}
`

export default ReviewAdd
