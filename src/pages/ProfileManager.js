import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import MyPageMenu from '../components/MyPage/MyPageMenu'


const ProfileManager = () => {
  return (
    <>
    <Header/>
    <Profile>

    <div className='Menu'>
    <MyPageMenu/>
    </div>

    <div className='ProfileManger'>
      <div className='Box'>
      <div className='one'>
      <div className='one_profile'><div className='one_img'></div></div>

      <div className='one_info'>
        <div className='one_nick'>
          <p>닉네임</p>
          <div><p>안양길동맘</p></div>
        </div>
        <div className='one_email'>
        <p>이메일</p>
        <div><p>test1@test.com</p></div>
        </div>
      </div>
      </div>

      <div className='two'>
        <div className='contentBox'>
          <p> 정보</p>
        </div>
      </div>


      <div className='btnBox'>
        <button> 프로필 수정</button>
        <button> 비밀번호 변경</button>
      </div>



      </div>
    </div>




    </Profile>

    </>
  )
}


const Profile = styled.div`
display:flex;
.ProfileManger{
  width:75%;
  height:91vh;
  display:flex;
  justify-content:center;
  align-items:center;

}

.Box{
  width:50%;
  height: 85%;
  margin-right:100px;
}

.one{
  height: 35%;
  display:flex;
}
.one_profile{
  width:35%;
  height:100%;
  display: flex;
  align-items:center;
  justify-content:center;
}

.one_info{
  width:65%;
  height:100%;
  display: flex; 
  flex-direction:column;
}

.one_nick{
  height:50%;
  width:100%;
}

.one_nick > p{
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 24px;
padding:15px 15px 0px 15px;
}

.one_nick > div{
  width:80%;
  height:40px;
  border:1px solid #E4E4E4;
  border-radius: 10px;
  margin:15px 15px 0px 15px;;
}

.one_nick > div > p{
  padding:7px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}


.one_email{
  height:50%;
  width:100%;
}

.one_email > p{
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 24px;
padding:15px 15px 0px 15px;
}

.one_email > div{
  width:80%;
  height:40px;
  border:1px solid #E4E4E4;
  border-radius: 10px;
  margin:15px 15px 0px 15px;;
}

.one_email > div > p{
  padding:7px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}

.contentBox{
  width: 75%;
  height: 80%;
  border:1px solid #E4E4E4;
  border-radius: 10px;
}

.contentBox > p{
  padding:15px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.1em;
}


.btnBox{
  text-align:right;
  padding: 20px;
}

.btnBox > button {
  background: #3C3C3C;
  color: #fff;
  border-radius: 30px;
  width:192px;
  height:40px;
  margin-left: 15px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}

.one_img{
  width:180px;
  height: 180px;
  border:1px solid black;
  border-radius:50%;
}

.two{
  height: 55%;
  display:flex;
  justify-content:center;
  align-items: center;
}

`

export default ProfileManager