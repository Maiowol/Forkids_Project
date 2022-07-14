//  장소 추천 카드
import React from 'react'
import styled from 'styled-components';
import { PlaceData } from '../../shared/placedata';
import { MdOutlinePlace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import dog from '../../images/dog.jpg'

function LCard() {
 const navigate = useNavigate();
 
    return (
        <>
            <Container>
                {PlaceData.map((item,index) => (
                    <div className='card' 
                    key={index}
                    onClick={() => {
                        navigate('/placedetail' 
                        // + item.placePostId
                        )
                    }}>
                        {/* 카드 왼쪽 '이미지' */}
                        <div className='card-left'>
                            <div className='image'>
                                <img src={item.imageUrl} />
                            </div>

                        </div>
                        {/* 카드 오른쪽 '타이틀 및 설명' */}
                        <div className='card-right'>
                            <div className='title'>
                                <h3>{item.title}</h3>
                                <p>⭐ {item.star}</p>
                            </div>
                            <a><MdOutlinePlace/> {item.url}</a>
                            <div className='profile_box'>
                            <div className='detail_profile'>
                                <img src={dog} alt="프로필" />
                            </div>
                                <strong>{item.nickname}</strong>
                            </div>
                            <div className='content'>
                                <p>{item.content}</p>
                            </div>

                        </div>
                    </div>
                ))}
            </Container>
        </>
    )
}

const Container = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit);
gap: 3.5em;
justify-content: center;
align-items: center;
font-family: 'Noto Sans KR';


.card {
background: white;
border-radius: 30px;
border: 1px solid lightgray;
cursor: pointer;
overflow: hidden;
width: 800px;
height: 300px;
display: flex;
flex-direction: row;
}

.card-left {
    display: flex;
    width: 350px;
    height: 260px;
    margin: 18px 0px 0px 40px;
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
    margin-left: 60px;
}

.title {
    display: flex;
}

.title p {
    margin-top: 4px;
    margin-left: 10px;
}

.profile_box{
    display: flex;
    margin-top: 15px;
    margin-bottom: 20px;
}

.profile{
    width:50px;
    height:50px;
    border-radius:50%;
    border:1px solid black;  
  }

  .detail_profile > img {
    width:45px;
    height:45px;
    border-radius:50%;
    margin-left: 10px;
}

.detail_profile{
    border-radius:50%;
    /* display:flex; */
    align-items:center;
    display:block;
    justify-content:center;
}
  
  strong { 
    margin-top: 10px;
    margin-left: 10px;
  }

  .card-right p {
    margin: 0px 10px 0px 5px;
  }

  .content { 
      margin-right: 10px;
      width: 300px;
      height: 180px;
      box-sizing: border-box;
      overflow: hidden;
  }

  .content p {
      font-weight: normal;
  }

`;

export default LCard;
