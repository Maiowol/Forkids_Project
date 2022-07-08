import React from 'react'
import styled from 'styled-components'
import Header from '../../components/main/Header'
import MyPageMenu from '../../components/MyPage/MyPageMenu'
import { useNavigate } from "react-router-dom";

const ProfileInsert = () => {
    const navigate = useNavigate();
  return (
    <>
    <Header/>
    <Profile>
      <div className='ProfileContainer'>
      <div className='title'>프로필수정</div>
      <div className='ProfileInfo'>
        <div className='ProfileImg'><img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhYnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="사진"/>
        <input type="file"/>
        </div>
        <div className='TwoBox'>
          <div>
            <span> 닉네임 </span>
            <div className='inputBox'></div>
          </div>
          <div>
            <span> 이메일 </span>
            <div className='inputBox'></div>
          </div>

          <div>
            <span> 소개란 </span>
            <div><input type="text" className='inputBigBox' placeholder='나를 소개해주세요 !'/></div>
          </div>

          <div className='btn'>
            <button onClick={()=>{navigate('/manager')}}> 취소</button>
            <button> 수정 완료</button>
          </div>


        </div>
      </div>
      </div>

    </Profile>

    </>
  )
}


const Profile = styled.div`
display:flex;
justify-content:center;
align-items:center;
width: 100%;
height:92vh;


.ProfileContainer{
  width:55%;
  height: 80vh;
  display:flex;
  flex-direction:column;
}

.title{
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 38px;
}

.ProfileInfo{
  display:flex;
  justify-content:center;
  padding:50px;
}



.ProfileImg{
  width: 170px;
  height:170px;
  margin-right:60px;
}


.inputBox{
  border: 1px solid #E4E4E4;
  border-radius: 10px;
  width: 22vw;
  height:40px;
  background: #F5F5F5;
  margin-bottom: 15px;
}

span{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  display:inline-block;
  margin-bottom: 15px;
}

.inputBigBox{
  border: 1px solid #E4E4E4;
  border-radius: 10px;
  width: 22vw;
  padding:40px;
  margin: 0px;
  background: #F5F5F5;
}

.btn{
  width: 100%;
  margin-top:20px;
  text-align: right;
  display:flex;
  justify-content: space-around;
}

input{
    margin-top: 15px;
}

.btn > button {
  background: #3C3C3C;
  border-radius: 30px;  
  width:35%;
  height: 35px;
  border:none;
  color:white;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
}

img{
  width: 170px;
  height:170px;
  background-size:cover;
}


`

export default ProfileInsert;