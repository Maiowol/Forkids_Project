//  장소 추천 카드
import React from "react";
import styled from "styled-components";
import { PlaceData } from "../../shared/placedata";
import { MdOutlinePlace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function LCard() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        {PlaceData.map((item, index) => (
          <div
            className="card"
            key={index}
            onClick={() => {
              navigate(
                "/placedetail"
                // + item.placePostId
              );
            }}
          >
            {/* 카드 왼쪽 '이미지' */}
            <div className="card-left">
              <div className="image">
                <img src={item.imageUrl} />
              </div>
            </div>
            {/* 카드 오른쪽 '타이틀 및 설명' */}
            <div className="card-right">
              <div className="title">
                <h3>{item.title}</h3>
                <p>⭐ {item.star}</p>
              </div>
              <a>
                <MdOutlinePlace /> {item.url}
              </a>
              <div className="profile_box">
                <div className="profile" />
                <strong>{item.nickname}</strong>
              </div>
              <div className="content">
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit);
  gap: 3em;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans KR";

  .card {
    background: white;
    border-radius: 30px;
    border: 1px solid lightgray;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.09);
    cursor: pointer;
    overflow: hidden;
    width: 1217px;
    height: 380px;
    display: flex;
    flex-direction: row;
  }

  .card:hover {
    transform: scale(1.1);
  }

  .card-left {
    display: flex;
    width: 445px;
    height: 315px;
    margin: 30px 0px 0px 40px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .image {
    border-radius: 25px;
    width: 100%;
    overflow: hidden;
  }

  .card-left img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-right {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 70px;
  }

  .title {
    display: flex;
  }

  .title p {
    margin-top: 4px;
    margin-left: 10px;
  }

  .profile_box {
    display: flex;
    margin-top: 15px;
    margin-bottom: 20px;
  }

  .profile {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid black;
  }

  strong {
    margin-top: 12px;
    margin-left: 10px;
  }

  .card-right p {
    margin: 8px 10px 0px 5px;
  }

  .content {
    margin-right: 10px;
    width: 440px;
    height: 180px;
    box-sizing: border-box;
    overflow: hidden;
  }
`;

export default LCard;
