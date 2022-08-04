import React from "react";
import styled from "styled-components";
import { HiChevronDown } from "react-icons/hi";
import logo from "../../images/logo.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMyPageAxios } from "../../redux/modules/Data";
import search from '../../images/search.png'
import { Link } from "react-router-dom";

const Header = () => {

  // Hook 선언
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // 로컬 스토리지에 있는 토큰,닉네임,프로필Url
  const UserCheck = localStorage.getItem("accessToken");
  const nickname = localStorage.getItem("nickname");
  const Profile = localStorage.getItem("profileUrl");

  // 로그아웃 눌렀을 때 쿠키 (토큰, 닉네임), 로컬 스토리지 (토큰, Url) 삭제 후 새로고침
  const logoOut = () => {
    Swal.fire({
      text: `로그아웃이 완료되었습니다.`,
      icon: "success",
      confirmButtonText: "확인",
      confirmButtonColor: '#ffb300'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("profileUrl");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("nickname");
        navigate('/')
      }
    });
  };

  // 프로필 관리를 눌렀을 때 액션 디스패치
  const MyProfile = () => {
    navigate("/manager/" + nickname);
    dispatch(GetMyPageAxios(nickname));
  };


  return (
    <>
      {/* 로그인 할 때의 헤더 ============================================================================== */}

      {!UserCheck ? (
        <Headers>

          <Link to="/"
            className="logo_container"><div className="logo_img">
              <img src={logo} alt="로고" />
            </div>
            <div className="logo">모두의 육아</div>
            </Link>

          {/* 메뉴 리스트 */}
          <ul className="header__menulist">
            <Link to="/recruit">체험 모집</Link>
            <Link to="/place"
              className="list">장소 추천</Link>
            <Link to="/review">육아템 리뷰</Link>
          </ul>

          {/* User 메뉴 리스트 */}
          <ul className="header__right">
            <li className="bell">
              <Link to="/api/search">
                <img src={search} alt="검색" 
                className="searchiconlogout" />
                </Link>
            </li>
            <li className="Login">
            <Link to="/Login">로그인</Link>
            </li>
          </ul>
        </Headers>

      ) : (

        // 로그인 했을 때의 헤더 ==============================================================================

        <Headers>
           <Link to="/"
            className="logo_container"><div className="logo_img">
              <img src={logo} alt="로고" />
            </div>
            <div className="logo">모두의 육아</div>
            </Link>

          {/* 메뉴 리스트 */}
          <ul className="header__menulist">
            <Link to="/recruit">체험 모집</Link>
            <Link to="/place"
              className="list">장소 추천</Link>
            <Link to="/review">육아템 리뷰</Link>
          </ul>

          {/* User 메뉴 리스트 */}
          <ul className="header__right">
            <li className="bell">
            <Link to="/api/search">
                <img src={search} alt="검색" 
                className="searchiconlogin" />
                </Link>
            </li>
            <li className="profile">
              <img src={Profile} alt="프로필" />
            </li>
            <li className="accordion">
              <input type="checkbox" id="answer01" />
              <label htmlFor="answer01">
                <div className="nickname">
                  <p>{nickname}</p>
                  <em>
                    <HiChevronDown className="DownDrop"></HiChevronDown>
                  </em>
                </div>
              </label>
              <div className="menu animate__animated animate__fadeInUp">
                <div className="menuOne">
                  <div onClick={MyProfile}>
                    <p>프로필관리</p>
                  </div>
                </div>
                <hr />
                <div className="menuTwo">
                  <Link to="/MyBookmark"
                  className="bookmark">
                    <p>북마크관리</p>
                  </Link>
                </div>
              </div>
            </li>
            <li className="MyPage">마이페이지</li>
            <li className="LogoOutTwo" onClick={logoOut}>
              로그아웃
            </li>
          </ul>
        </Headers>
      )}
    </>
  );
};

// 헤더 스타일 코드
const Headers = styled.div`
  background-color: #fff;
  max-width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3c3c3c;
  filter: drop-shadow(0px 4px 25px rgba(0, 0, 0, 0.1));

  input[id*="answer"] {
    display: none;
  }

  input[id*="answer"] + label {
    display: block;
    cursor: pointer;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    line-height: 18px;
    margin-left: 4px;
  }

  .searchicon{
    margin-right: 30px;
  }

  input[id*="answer"] + label + div {
    max-height: 0;
    width: 140px;
    transition: all 0.5s;
    overflow: hidden;
    background-color: #fff;
    font-size: 11px;
    position: absolute;
    top: 62px;
  }

  input[id*="answer"] + label + div span {
    display: inline-block;
  }

  input[id*="answer"]:checked + label + div {
    max-height: 500px;
    position: absolute;
    top: 73px;
  }

  .accordion {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .accordion > label {
    display: flex;
    margin-top: 15px;
    font-weight: 700;
  }

  .nickname {
    display: flex;

    p {
      margin-top: 3.5px;
      margin-right: 2px;
    }
  }

  .DownDrop{
    color: #A8A8A8;
    width: 30px;
    height: 30px;
    margin-left: 2px;

  }

  .DownDrop:hover{
    color: black;
  }

  .menu {
    display: flex;
    flex-direction: column;
    z-index: 2;
    border-radius: 10px;
    width: 190px;
    height: 130px;
  }

  .menuOne {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
  }

  .menuTwo {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
  }

  a {
    text-decoration: none;
    color: #A58646;
    font-family: 'Nanum Gothic'
  }

  a:hover {
    color: #6b4e16;
    font-weight: bold;
  }

.list {
  margin-left: 60px;
  margin-right: 60px;
}

  .menuOne > div > p:hover {
    color: #6b4e16;
  }

  .menuOne > div > p {
    cursor: pointer;
    color: #A8A8A8;
    font-style: normal;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700px;
    font-size: 16px;
    line-height: 18px;
    margin-top: 12px;
    margin-bottom: -1px
  }

  .bookmark > p:hover {
    color: #6b4e16;
  }

  .bookmark {
    cursor: pointer;
    color: #A8A8A8;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
  }

  .logo {
    margin-left: 15px;
    font-size: 20px;
    font-weight: 700;
    color: #f4b03e;
    font-family: 'NanumGothic', sans-serif;
    font-weight: 700;
  }

  .logo_container {
    display: flex;
    align-items: center;
    margin-left: 18px;
    cursor: pointer;
  }

  .logo_img {
    width: 40px;
    height: 40px;
    margin:18px;
    display: flex;
    align-items: center;
  }

  .logo_img > img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

  .searchiconlogout {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .searchiconlogin {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-right: 20px;
    margin-bottom: 6px;
  }

  .bell > img:hover {
    transform: scale(1.08);
  }

  .header__menulist {
    list-style: none;
    display: flex;
    font-size: 17px;
    margin-top: 19px;
  }

  .li_color{
    font-size: 100px;
  }

  .bell {
    font-size: 35px;
    cursor: pointer;
  }

  .MyPage {
    display: none;
    font-size: 20px;
  }
 
  .header__left {
    display: flex;
  }

  .nick {
    font-size: 20px;
    font-weight: 700;
    color: #3c3c3c;
  }

  .header__right {
    list-style: none;
    display: flex;
    align-items: center;
    margin-top: 16px;
    margin-right: 80px;
  }

  .header__right div {
    margin: 0 1rem;
  }

  .profile {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: auto;
    margin-right: -13px;
  }

  .profile > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #E4E4E4;
  }

  .LogoOut > a {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: #3c3c3c;
    cursor: pointer;
    margin-right: 62px;
    margin-left: 32px;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
    margin-top: 4px;
  }


  .LogoOutTwo {
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: #3c3c3c;
    cursor: pointer;
    margin-right: 62px;
    margin-left: 15px;
    margin-top: 4px;
  }

  .Login > a {
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    line-height: 18px;
    color: #3c3c3c;
    cursor: pointer;
    margin-left: 32px;
    margin-top: 4px;
  }

  li {
    display: flex;
    align-items: center;
  }

  .toggle {
    display: none;
    font-size: 30px;
    margin-top: 10px;
    padding: 16px;
  }

  .user {
    display: none;
    font-size: 30px;
    margin-top: 7px;
    padding: 16px;
  }

  .icon {
    font-size: 35px;
  }
  @media screen and (max-width: 1075px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props) => (props.userToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      margin: 0px;
      z-index: 1;
      position: relative;
      bottom: 10px;
      padding: 0px 0px 0px 20px;
      background-color: #e4e4e4;
    }

    .header__menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      margin: 0px;
      position: relative;
      bottom: 5px;
      z-index: 1;
      background-color: #e4e4e4;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem 0;
      padding: 0;
      color: #3c3c3c;
    }

    .header__menulist li:hover {
      transform: scale(1);
      color: #3c3c3c;
    }

    .MyPage {
      display: block;
      font-size: 20px;
      font-weight: 700;
    }

    .toggle {
      display: block;
      margin: 0px;
    }

    .user {
      display: block;
      margin: 0px;
    }

    .profile {
      display: none;
    }

    .nick {
      display: none;
    }

    .searchicon{
      display: none;
    }
  }
`;

export default Header;
