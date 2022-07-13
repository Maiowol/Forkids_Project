import axios from "axios";
import React from "react";
import styled from "styled-components";
import Header from "../../components/main/Header";
import { getCookie } from "../../shared/Cookie";
import { useDispatch, useSelector } from "react-redux";
import { GetMyPageAxios } from "../../redux/modules/Data";

const ProfileManager = () => {
  const nickname = getCookie("nickname");

  const MyPage = useSelector((state) => state.Data.state);

  // 마이페이지 화면 뷰
  if (!MyPage) {
    return <div></div>;
  }
  return (
    <>
      <Header />
      <Profile>
        <div className="ProfileContainer">
          <div className="title">프로필관리</div>
          <div className="ProfileInfo">
            <div className="ProfileImg">
              <img src={MyPage.mypageGet.profileUrl} alt="사진" />
            </div>
            <div className="TwoBox">
              <div>
                <span> 닉네임 </span>
                <div className="inputBox">{MyPage.mypageGet.nickname}</div>
              </div>
              <div>
                <span> 이메일 </span>
                <div className="inputBox">{MyPage.mypageGet.email}</div>
              </div>

              <div>
                <span> 소개란 </span>
                <div className="inputBigBox">{MyPage.mypageGet.myComment}</div>
              </div>

              <div className="btn">
                {nickname !== MyPage.mypageGet.nickname ? null : (
                  <button>
                    <a href="/ProfileInsert">프로필 수정</a>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Profile>
    </>
  );
};

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 92vh;
  .ProfileContainer {
    width: 55%;
    height: 80vh;
    display: flex;
    flex-direction: column;
  }
  .title {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 38px;
  }
  .ProfileInfo {
    display: flex;
    justify-content: center;
    padding: 50px;
  }
  .ProfileImg {
    width: 170px;
    height: 170px;
    margin-right: 60px;
  }
  .inputBox {
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    width: 22vw;
    height: 40px;
    background: #f5f5f5;
    margin-bottom: 15px;
    padding: 7px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
  }
  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    display: inline-block;
    margin-bottom: 15px;
  }
  .inputBigBox {
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    width: 22vw;
    height: 265px;
    background: #f5f5f5;
    padding: 7px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
  }
  .btn {
    width: 100%;
    margin-top: 20px;
    text-align: right;
  }
  .btn > button {
    background: #3c3c3c;
    border-radius: 30px;
    width: 35%;
    height: 35px;
    border: none;
  }
  img {
    width: 170px;
    height: 170px;
    background-size: cover;
  }
  a {
    color: white;
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-decoration: none;
  }
`;

export default ProfileManager;
