import React from "react";
import styled from "styled-components";
import character from '../../images/character.png';

const SubHeader = () => {


    return (
        <Headers>
            <div className="header">
            <img src={character} />
            <div className="text">
                <span className="front">모두의 육아를 위해,</span>
                <span className="back"> 설문조사 참여하고 기프티콘 받아가세요! (~8/3 월)</span>
            </div>
            <img src={character} />
            </div>
        </Headers>
    );
};

// 헤더 스타일 코드
const Headers = styled.div`
  background-color: #F4B03E;
  max-width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
 
  .header {
      display: flex;
  }

  .text {
    margin: 8px 10px 0px 10px;

    span {
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
    }

    .front {
        color: #FFFFFF;
    }

    .back {
        color: #6B4E16;
        margin-left: 2px;
    }
  }

  img {
      widht: 33px;
      height: 33px;
  }
  `;

export default SubHeader;
