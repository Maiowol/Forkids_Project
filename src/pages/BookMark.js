import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import MyPageMenu from '../components/MyPage/MyPageMenu'
import { FaBookmark } from "react-icons/fa";

const BookMark = () => {
  return (
    <>
    <Header/>
    <Book>

    <div className='Menu'>
    <MyPageMenu/>
    </div>

    <div className='Bookmark'>
      <div className='BookBox'>
        <div className='container'>
          <div className='one'>작성자 닉네임</div>
          <div className='two'>제목</div>
          <div className='three'> 날짜</div>
          <div className='four'>저장</div>
        </div>

        <div className='BookList'>
          <div className='BList'>
            <div className='first'>
              <div className='profile'></div>
            </div>
            <div className='second'>닉네임</div>
            <div className='third'>제목</div>
            <div className='sa'>날짜</div>
            <div className='five'><FaBookmark className='icon'></FaBookmark></div>
          </div>
        </div>
      </div>
    </div>
    </Book>
    </>
  )
}


const Book = styled.div`
  display:flex;


.Menu{
  width:25%;
  height:91vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
}

.Menu_item > div > span{
  cursor:pointer;
}

.Menu_item > div > span:hover{
  color:#6B4E16;
}

.Bookmark{
  width:75%;
  height:91vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
}

.BookBox{
  width: 853px;
  height: 750px;
  border:2px solid #E4E4E4;
  border-radius: 30px;
}

.container{
  display:flex;
  padding:25px;
  text-align:center;
  position: relative;
  left:45px;
}

.container > div{
  color: #3c3c3c;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
}

.icon{
  width:34px;
  height: 34px;
  color:#f06292;
}

.one{
  width:25%;
}

.two{
  width:25%;
}

.three{
  width:25%;
  position: relative;
  left:35px;
}

.four{
  width:25%;
  position: relative;
  right:10px;
}

.BookList{
  width:95%;
  height: 87%;
  margin:auto;
}

.BList{
  width: 779px;
  height: 77px;
  border: 2px solid #f5f5f5;
  border-radius: 10px;
  display:flex;
}

.first{
  width:10%;
  display:flex;
  justify-content:center;
  align-items:center;
}

.second{
  width:20%;
  display:flex;
  justify-content:center;
  align-items:center;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
}

.third{
  width:30%;
  display:flex;
  justify-content:center;
  align-items:center;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
}

.sa{
  width:30%;
  display:flex;
  justify-content:center;
  align-items:center;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
}

.five{
  width:10%;
  display:flex;
  justify-content:center;
  align-items:center;
}

.profile{
  width:50px;
  height:50px;
  border-radius:50%;
  border:1px solid black;
}











`
export default BookMark