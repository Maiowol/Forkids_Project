import React from 'react'
// style
import styled from 'styled-components'
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

// elements & components
import Header from '../../components/main/Header';
import Place from './Place';
import Comment from '../../components/elements/Comment';

const PlaceDetail = () => {

  return (
    <>
    <Header/>
    <Container>
      <div className='OneBox'>
        <div className='OnePicture'>
        <div className='Big'><div className='BigPicture'></div></div>
        <div className='small'>
          <div className='smallPicture'></div>
          <div className='smallPicture'></div>
          <div className='smallPicture'></div>
          <div className='smallPicture'></div>
        </div>
        </div>

        <div className='OneContent'>
          <div className='TwoBox'>

            <div className='title'>
              <p>국립생태공원</p>
              <span><FaStar className='icon'></FaStar></span>
              <span className='starScore'> 4.0점</span>
            </div>

            <div className='location'><p><GrLocation></GrLocation>서울특별시 성수동 어쩌구 1004번지</p></div>

            <div className='info'>
              <div className='profile'></div>
              <p className='nickname'>5세맘육아왕</p>
            </div>
          </div>

          <div className='ThreeBox'>
            <div className='fourBox'>
              <p>내용</p>
              <div className='btnBox'>
                <button className='ParkBtn'>주차가능</button>
                <button className='KidBtn'>예스키즈존</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Container>
    <Comment/>
    </>
    
  )
}


const Container = styled.div`
  width:100%;
  height: 100vh;

.OneBox{
  margin: 80px auto;
  width:80%;
  height: 70vh;
  display:flex;
}

.OnePicture{
  width:50%;
  height: 70vh;
}

.OneContent{
  width:50%;
  height: 70vh;
}

.Big{
  height: 60%;
  display:flex;
  align-items:center;
  justify-content:center;
}

.small{
  height: 40%;
  display:flex;
  justify-content:center;
  align-items:center;
}

.TwoBox{
  height: 45%;
}

.TwoBox > div{
  height: 33.5%;
}

.ThreeBox{
  height: 55%;
  display:flex;
  align-items:center;
  justify-content:center;
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

.fourBox{
  border: 2px solid #E4E4E4;
  border-radius: 10px;
  width:80%;
  height:90%;
}

.fourBox > p {
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 24px;
width:100%;
height: 80%;
}

.fourBox > div{
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

.BigPicture{
  border:1px solid black;
  width:70%;
  height:90%;
  border-radius: 30px;
}

.smallPicture{
  width:200px;
  height:170px;
  border-radius: 30px;
  margin-left:15px;
  margin-right:10px;
  border: 1px solid black;
}

`

export default PlaceDetail

