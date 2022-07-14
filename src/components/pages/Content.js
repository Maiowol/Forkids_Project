import React from 'react'

import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import styled from 'styled-components';

function Content() {
    return (
        <ContentBox>
            <div className='box_top'>
                <div className='title'>
                    <p>국립생태공원</p>
                    <span>
                        <FaStar className='icon' />
                    </span>
                    <span className='starScore'> 4.0점</span>
                </div>
                <div className='location'>
                    <p>
                        <GrLocation />
                        서울특별시 성수동 어쩌구 1004번지</p>
                </div>
                <div className='info'>
                    <div className='profile'>ㅎㅇ</div>
                    <p className='nickname'>5세맘육아왕</p>
                </div>
            </div>
            <div className='box'>
                <div className='content'>
                    <p>내용</p>
                    <div className='btnBox'>
                        <button className='ParkBtn'>주차가능</button>
                        <button className='KidBtn'>예스키즈존</button>
                    </div>
                </div>
            </div>
        </ContentBox>

    )
}

const ContentBox = styled.div`
 width:50%;
 height: 70vh;
 
.box_top{
   height: 45%;
 }

 .box_top > div{
   height: 33.5%;
 }
      
.title{
  display:flex;
  align-items:center;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  padding:30px;
 }

.icon{
    color:#fdd835;
    margin-left:30px;
  }

.starScore{
    color: #A8A8A8;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }

  .location{
    display: flex;
    align-items: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    padding: 30px;
  }

  .info{
    display:flex;
    align-items:center;
    padding: 30px;
  }
  
  .profile{
    border:1px solid black;
    width:70px;
    height:70px;
    border-radius: 50%;
  }
  
  .nickname{
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  margin-left:30px;
  }

  .box{
  height: 55%;
  display:flex;
  align-items:center;
  justify-content:center;
}

.content{
  border: 2px solid #E4E4E4;
  border-radius: 10px;
  width:80%;
  height:90%;
}

.content > p {
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 24px;
width:100%;
height: 80%;
}

.content > div{
  width:100%;
  height: 20%;
}

.ParkBtn{
    width:30%;
    height: 50%;
    border-radius:15px;
    font-size: 17px;
    color:#263238;
    border: none;
    background-color:#ffa000;
  }
  
  .btnBox{
    display:flex;
    justify-content:space-around;
  }
  
  .KidBtn{
    width:30%;
    height: 50%;
    border-radius:15px;
    font-size: 17px;
    color:#263238;
    border: none;
    background-color:#c5e1a5; 
  }
  
  
`;

export default Content
