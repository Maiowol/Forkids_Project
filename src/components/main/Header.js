import React, { useState } from "react";
import styled from "styled-components";
import { HiChevronDown } from "react-icons/hi";
import { BsChatDotsFill } from "react-icons/bs";
import { useDispatch , useSelector} from "react-redux"
import axios from 'axios';
import ChatListModal from "../../modal/Chat/ChatListModal";
import {GetChatListAxios} from '../../redux/modules/Data'
import { GoThreeBars,GoX,GoPerson,GoBell} from "react-icons/go";
import logo from '../../images/logo.png';
import profile from '../../images/profile.png'
import { useNavigate } from "react-router-dom";
import { removeCookie,getCookie } from "../../shared/Cookie";

const Header = () => {
  // 모바일 처리시 메뉴 -> 버튼  처리 방식을  state :  true /  false로 관리
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const UserCheck = getCookie('accessToken')
  const nickname = getCookie('nickname')
  const dispatch = useDispatch();
  const Profile = localStorage.getItem('img')

  const Login = () =>{
    navigate('/Login')
  }


  const logoOut = () =>{
    removeCookie('accessToken')
    removeCookie('nickname')
    navigate('/')
    alert('로그아웃 되셨습니다')
  }


  const messageBtn = () =>{
    setModalIsOpen(true)
  }



  return (
    <>

    {/* 로그인할때의 헤더 ============================================================================== */}


    {!UserCheck ?
    <Headers isToggled={isToggled} userToggled={userToggled}>
    {/* 햄버거 버튼(bar) */}
    <div
      className="toggle"
      onClick={() => {
        setIsToggled(!isToggled);
      }}
    >
    {!isToggled ? <GoThreeBars className="icon"></GoThreeBars>  : <GoX className="icon"></GoX>}
    </div>

    <div className="logo_container"
        onClick={() => 
        { navigate(`/`) }}>
      <div className="logo_img">
          <img src={logo} alt="로고"/></div> 
      <div className="logo">모두의 육아</div> 
    </div>

    {/* User 버튼 */}
    <div
      className="user"
      onClick={() => {
        setUserToggled(!userToggled);
      }}
    >
    {!userToggled ? <GoPerson className="icon"></GoPerson> : <GoX className="icon"></GoX>}
    </div>

    {/* 메뉴 리스트 */}
    <ul className="header__menulist">
      <li onClick={() => 
       { navigate(`/recruit`) }}>같이해요</li>
      <li onClick={() => 
       { navigate(`/place`) }}>추천해요</li>
      <li onClick={() => 
       { navigate(`/review`) }}>육아템 리뷰</li>
    </ul>

    {/* User 메뉴 리스트 */}
    <ul className="header__right">
      <li className="LogoOut" onClick={Login}>로그인</li>
    </ul>
  </Headers>
    
    
    
    :
    
    // 로그인했을때의 헤더 ==============================================================================
    
    <Headers isToggled={isToggled} userToggled={userToggled}>
      {/* 햄버거 버튼(bar) */}
      <div
        className="toggle"
        onClick={() => {
          setIsToggled(!isToggled);
        }}
      >
      {!isToggled ? <GoThreeBars className="icon"></GoThreeBars>  : <GoX className="icon"></GoX>}
      </div>

      <div className="logo_container"
          onClick={() => 
          { navigate(`/`) }}>
        <div className="logo_img">
            <img src={logo} alt="로고"/></div> 
        <div className="logo">모두의 육아</div> 
      </div>

      {/* User 버튼 */}
      <div
        className="user"
        onClick={() => {
          setUserToggled(!userToggled);
        }}
      >
      {!userToggled ? <GoPerson className="icon"></GoPerson> : <GoX className="icon"></GoX>}
      </div>

      {/* 메뉴 리스트 */}
      <ul className="header__menulist">
        <li onClick={() => 
         { navigate(`/recruit`) }}>같이해요</li>
        <li onClick={() => 
         { navigate(`/place`) }}>추천해요</li>
        <li onClick={() => 
         { navigate(`/review`) }}>육아템 리뷰</li>
      </ul>

      {/* User 메뉴 리스트 */}
      <ul className="header__right"> 
        <li className="bell"><BsChatDotsFill onClick={messageBtn}></BsChatDotsFill></li>
        <li className="profile">
          <img src={Profile} alt="프로필"/>
        </li>

        <ChatListModal open = {modalIsOpen} onClose={()=>setModalIsOpen(false)}/>



        <li className="accordion">
          <input type="checkbox" id="answer01"/>
          <label htmlFor="answer01"> {nickname}<em><HiChevronDown></HiChevronDown></em></label>
          <div className="menu">
            <div className="menuOne"><a href="/manager"><p>프로필관리</p></a></div>
            <div className="menuTwo"><a href="/bookmark"><p>북마크관리</p></a></div>
          </div>
        </li>







        <li className="MyPage">마이페이지</li>
        <li className="LogoOut" onClick={logoOut}>로그아웃</li>
      </ul>
    </Headers>

    }

    </>




  )
}

// 헤더 스타일 코드 
const Headers = styled.div`
  max-width: 100%;
  height:75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3C3C3C;

  input[id*="answer"]{
    display:none;
  }
  input[id*="answer"] + label {
    display:block;
    padding:20px;
    cursor: pointer;
    font-size: 20px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
  }

  input[id*="answer"] + label + div{
    max-height: 0;
    transition: all .35s;
    overflow:hidden;
    background-color:#FFFFFF;
    font-size:11px;
    position: absolute;
    top:62px;
  }

  input[id*="answer"] + label + div span {
    display: inline-block;
  }

  input[id*="answer"]:checked + label + div {
    max-height: 500px;
    position: absolute;
    top:68px;
  } 

.accordion{
  display:flex;
  flex-direction:column;
}

.menu{
  display:flex;
  flex-direction:column;
  z-index: 2;
  border-radius: 20px;
  width:190px;
  height: 130px;
}

.menuOne{
  height: 50%;
  display:flex;
  align-items:center;
  justify-content: center;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
}

.menuTwo{
  height: 50%;
  display:flex;
  align-items:center;
  justify-content: center;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
}


a {
  text-decoration: none;
  color:#A8A8A8;
}

.menuOne > a > p:hover{
  color:#6B4E16;
}

.menuTwo > a > p:hover{
  color:#6B4E16;
}



  .logo {
    margin: 16px 16px 16px 23px;
    font-size: 20px;
    font-weight: 700;
    color: #F4B03E;
  }
  .logo_container{
    display:flex;
    align-items:center;
    margin-left: 10px;
    cursor: pointer;
  }
  .logo_img{
    width:40px;
    height: 40px;
  }
  img {
    width:40px;
    height: 40px;
    cursor: pointer;
  }

  .header__menulist {
    list-style: none;
    display: flex;
    font-size:17px;
    color: #A58646;
    margin-top:10px;
  }

  .bell{
    font-size:35px;
    cursor: pointer;
    transform: scaleX(-1);
  }

  .MyPage{
    display:none;
    font-size:20px;
  }
  
  .header__menulist > li{
    cursor: pointer;
    font-weight:700;
    font-size:20px;
  }

  .header__menulist > li:hover{
    transform: scale(1.30);
    color:#6B4E16; 
  }


  .header__left {
    display: flex;
  }

  .nick{
    font-size:20px;
    font-weight: 700;
    color: #3C3C3C;
  }

  .header__right {
    list-style: none;
    display: flex;
    margin-right:30px;
    margin-top:10px;
  }

  .header__right div {
    margin: 0 1rem;
  }

  .profile{
    width:50px;
    height: 50px;
    border-radius:50%;
    margin:auto;

  }

  .profile > img {
    width:50px;
    height: 50px;
  }


  .LogoOut{
    font-size:20px;
    font-weight:700;
    color:#3C3C3C;
    cursor: pointer;
  }

  li {
    padding: 0 1rem;
    display:flex;
    align-items:center;
    margin-left:10px;
  }

  .toggle {
    display: none;
    font-size: 30px;
    margin-top:10px;
    padding: 16px;
  }

  .user {
    display: none;
    font-size: 30px;
    margin-top:7px;
    padding: 16px;
  }

  .icon{
    font-size:35px;
  }

  @media screen and (max-width: 1075px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props) => (props.userToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      margin:0px;
      z-index: 1;
      position: relative;
      bottom: 10px;
      padding:0px 0px 0px 20px;
      background-color: #E4E4E4;
    }

    .header__menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      margin:0px;
      position: relative;
      bottom: 5px;
      z-index: 1;
      background-color: #E4E4E4;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem 0;
      padding: 0;
      color: #3C3C3C;
    }

    .header__menulist li:hover{
      transform: scale(1.00);
      color: #3C3C3C;
    }

    .MyPage{
      display:block;
      font-size:20px;
      font-weight: 700;
    }

    .toggle {
      display: block;
      margin:0px;
    }

    .user {
      display: block;
      margin: 0px;
    }

    .profile{
      display:none;
    }

    .nick{
      display:none;
    }

    .bell{
      display:none;
    }
  }


`

const ChatBox = styled.div`
  width:12vw;
  height:40vh;
  position:absolute;
  left:78%;
  z-index: 1;
  visibility: ${(props) => (props.chatBox ? "visibility" : "hidden")};
 
  

  .box{
    display:flex;
    flex-direction:column;
    border-radius: 30px;
    height: 200px;
    width:12vw;
    border: 1px solid white;
    background-color:white;
    transition: all 0.3s;

  }

  .boxOne{
    width:100%;
    height: 50%;
    border-bottom: 1px solid white;
    display:flex;
    align-items:center;
    justify-content:center;
  }

  .boxTwo{
    width:100%;
    height: 50%;
    display:flex;
    align-items:center;
    justify-content:center;
  }

  .boxOne > span {
    color:white;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #6B4E16;
    cursor: pointer;
  }

  .boxTwo > span {
    color:white;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #6B4E16;
    cursor: pointer;
  }




























`





























export default Header

