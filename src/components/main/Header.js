import React, { useState } from "react";
import styled from "styled-components";
import ChatListModal from "../../modal/Chat/ChatListModal";
import { HiChevronDown } from "react-icons/hi";
import chat from "../../images/chat.png";
import logo from "../../images/logo.png";
import { GoThreeBars, GoX, GoPerson } from "react-icons/go";
import chatnew from "../../images/chatnew.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMyPageAxios } from "../../redux/modules/Data";
import io from "socket.io-client";
import { toast } from "react-toastify";


// 소켓서버 연결
const socket = io.connect("http://dlckdals04.shop");

const Header = () => {
  // 모바일처리시 메뉴 , 채팅모달 , 채팅알림 State
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [notify, setNotify] = useState([]);
  // Hook 선언
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 쿠키와 로컬스토리지에 있는 토큰,닉네임,프로필Url
  const UserCheck = localStorage.getItem("accessToken");
  const nickname = localStorage.getItem("nickname");
  const Profile = localStorage.getItem("profileUrl");
  const bell = localStorage.getItem("count");

  // 로그인 눌렀을때 로그인 페이지로 이동
  const Login = () => {
    navigate("/Login");
  };

  // 로그아웃 눌렀을때 쿠키 (토큰 ,닉네임) , 로컬스토리지 (토큰,Url) 삭제후 새로고침
  const logoOut = () => {
    Swal.fire({
      text: `로그아웃하였습니다`,
      icon: "success",
      confirmButtonText: "확인",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("profileUrl");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("nickname");
        window.location.reload();
      }
    });
  };

  // 메시지버튼 눌렀을 때 메시지 모달창open 알림횟수 삭제
  const messageBtn = () => {
    setModalIsOpen(true);
    localStorage.removeItem("count");
    setNotify([]);
  };

  // 프로필 관리를 눌렀을 때 액션 디스패치
  const MyProfile = () => {
    navigate("/manager/" + nickname);
    dispatch(GetMyPageAxios(nickname));
  };

  const Bookmark = () =>{
    navigate("/MyBookmark");
  }

  // 상대방이 보낸 메시지를 알림 이벤트 경로로 데이터를 받음
  React.useEffect(() => {
    socket.off("notify").on("notify", (data) => {
      if (nickname === data.senderNick) {
        return null;
      } else if (nickname !== data.receiverNick) {
        return null;
      } else {
        toast.success(`${data.senderNick}님이 메시지를 보냈습니다`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          limit: 3,
        });
        setNotify((list) => [...list, data]);
        localStorage.setItem("count", data.message);
      }
    });
  }, []);

  return (
    <>
      {/* 로그인할때의 헤더 ============================================================================== */}

      {!UserCheck ? (
        <Headers isToggled={isToggled} userToggled={userToggled}>
          {/* 햄버거 버튼(bar) */}
          <div
            className="toggle"
            onClick={() => {
              setIsToggled(!isToggled);
            }}
          >
            {!isToggled ? (
              <GoThreeBars className="icon"></GoThreeBars>
            ) : (
              <GoX className="icon"></GoX>
            )}
          </div>

          <div
            className="logo_container"
            onClick={() => {
              navigate(`/`);
            }}
          >
            <div className="logo_img">
              <img src={logo} alt="로고" />
            </div>
            <div className="logo">모두의 육아</div>
          </div>

          {/* User 버튼 */}
          <div
            className="user"
            onClick={() => {
              setUserToggled(!userToggled);
            }}
          >
            {!userToggled ? (
              <GoPerson className="icon"></GoPerson>
            ) : (
              <GoX className="icon"></GoX>
            )}
          </div>

          {/* 메뉴 리스트 */}
          <ul className="header__menulist">
            <li
              onClick={() => {
                navigate(`/recruit`);
              }}
            >
              체험 모집
            </li>
            <li
              onClick={() => {
                navigate(`/place`);
              }}
            >
              장소 추천
            </li>
            <li
              onClick={() => {
                navigate(`/review`);
              }}
            >
              육아템 리뷰
            </li>
          </ul>

          {/* User 메뉴 리스트 */}
          <ul className="header__right">
            <li className="LogoOut" onClick={Login}>
              로그인
            </li>
          </ul>
        </Headers>
      ) : (
        // 로그인했을때의 헤더 ==============================================================================

        <Headers isToggled={isToggled} userToggled={userToggled}>
          {/* 햄버거 버튼(bar) */}
          <div
            className="toggle"
            onClick={() => {
              setIsToggled(!isToggled);
            }}
          >
            {!isToggled ? (
              <GoThreeBars className="icon"></GoThreeBars>
            ) : (
              <GoX className="icon"></GoX>
            )}
          </div>

          <div
            className="logo_container"
            onClick={() => {
              navigate(`/`);
            }}
          >
            <div className="logo_img">
              <img src={logo} alt="로고" />
            </div>
            <div className="logo">모두의 육아</div>
          </div>

          {/* User 버튼 */}
          <div
            className="user"
            onClick={() => {
              setUserToggled(!userToggled);
            }}
          >
            {!userToggled ? (
              <GoPerson className="icon"></GoPerson>
            ) : (
              <GoX className="icon"></GoX>
            )}
          </div>

          {/* 메뉴 리스트 */}
          <ul className="header__menulist">
            <li
              onClick={() => {
                navigate(`/recruit`);
              }}
            >
              체험 모집
            </li>
            <li
              onClick={() => {
                navigate(`/place`);
              }}
            >
              장소 추천
            </li>
            <li
              onClick={() => {
                navigate(`/review`);
              }}
            >
              육아템 리뷰
            </li>
          </ul>

          {/* User 메뉴 리스트 */}
          <ul className="header__right">
            <li className="bell">
              {bell !== null ? (
                <img
                  src={chatnew}
                  alt="사진"
                  onClick={messageBtn}
                  className="chaticon"
                />
              ) : (
                <img
                  src={chat}
                  alt="사진"
                  onClick={messageBtn}
                  className="chaticon"
                />
              )}
            </li>
            <li className="profile">
              <img src={Profile} alt="프로필" />
            </li>

            <ChatListModal
              open={modalIsOpen}
              onClose={() => setModalIsOpen(false)}
            />

            <li className="accordion">
              <input type="checkbox" id="answer01" />
              <label htmlFor="answer01">
                {nickname}
                <em>
                  <HiChevronDown></HiChevronDown>
                </em>
              </label>
              <div className="menu">
                <div className="menuOne">
                  <div onClick={MyProfile}>
                    <p>프로필관리</p>
                  </div>
                </div>
                <div className="menuTwo">
                  <div onClick={Bookmark}>
                    <p>북마크관리</p>
                  </div>
                </div>
              </div>
            </li>

            <li className="MyPage">마이페이지</li>
            <li className="LogoOut" onClick={logoOut}>
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
  max-width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3c3c3c;

  input[id*="answer"] {
    display: none;
  }
  input[id*="answer"] + label {
    display: block;
    padding: 20px;
    cursor: pointer;
    font-size: 20px;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
  }

  input[id*="answer"] + label + div {
    max-height: 0;
    transition: all 0.35s;
    overflow: hidden;
    background-color: #ffffff;
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
    top: 68px;
  }

  .accordion {
    display: flex;
    flex-direction: column;
  }

  .menu {
    display: flex;
    flex-direction: column;
    z-index: 2;
    border-radius: 20px;
    width: 190px;
    height: 130px;
  }

  .menuOne {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Noto Sans KR";
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
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
  }

  a {
    text-decoration: none;
    color: #a8a8a8;
  }

  .menuOne > div > p:hover {
    color: #6b4e16;
  }

  .menuOne > div > p {
    cursor: pointer;
  }

  .menuTwo > div > p:hover {
    color: #6b4e16;
  }

  .menuTwo > div > p {
    cursor: pointer;
  }

  .logo {
    margin: 16px 16px 16px 23px;
    font-size: 20px;
    font-weight: 700;
    color: #f4b03e;
  }
  .logo_container {
    display: flex;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
  }
  .logo_img {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
  }

  .logo_img > img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    cursor: pointer;
  }
  .bell > img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .bell > img:hover {
    transform: scale(1.15);
  }

  .header__menulist {
    list-style: none;
    display: flex;
    font-size: 17px;
    margin-top: 10px;
  }

  .bell {
    font-size: 35px;
    cursor: pointer;
  }

  .MyPage {
    display: none;
    font-size: 20px;
  }

  .header__menulist > li {
    font-family: "Nanum Gothic";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    cursor: pointer;
    color: #a58646;
    font-weight: 700;
    font-size: 20px;
  }

  .header__menulist > li:hover {
    transform: scale(1.15);
    color: #6b4e16;
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
    margin-right: 30px;
    margin-top: 10px;
  }

  .header__right div {
    margin: 0 1rem;
  }

  .profile {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: auto;
  }

  .profile > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .LogoOut {
    font-size: 20px;
    font-weight: 700;
    color: #3c3c3c;
    cursor: pointer;
  }

  li {
    padding: 0 1rem;
    display: flex;
    align-items: center;
    margin-left: 10px;
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

    .bell {
      display: none;
    }
  }
`;

const ChatBox = styled.div`
  width: 12vw;
  height: 40vh;
  position: absolute;
  left: 78%;
  z-index: 1;
  visibility: ${(props) => (props.chatBox ? "visibility" : "hidden")};

  .box {
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    height: 200px;
    width: 12vw;
    border: 1px solid white;
    background-color: white;
    transition: all 0.3s;
  }

  .boxOne {
    width: 100%;
    height: 50%;
    border-bottom: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .boxTwo {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .boxOne > span {
    color: white;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #6b4e16;
    cursor: pointer;
  }

  .boxTwo > span {
    color: white;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #6b4e16;
    cursor: pointer;
  }
`;

export default Header;
