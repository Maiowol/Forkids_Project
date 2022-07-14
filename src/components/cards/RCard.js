// 육아템 리뷰 카드
import React from 'react'
import styled from 'styled-components';
import { Reviewdata } from '../../shared/reviewdata';
import { MdOutlinePlace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import dog from '../../images/dog.jpg'


function RCard() {
    const navigate = useNavigate();
    return (
        <Container>
            {Reviewdata.map((item, index) => (
                <div className='card'
                    key={index}
                    onClick={() => {
                        navigate('/reviewdetail'
                            // + item.placePostId
                        )
                    }}>

                    {/* 카드 위쪽 '타이틀' */}
                    <div className='card-top'>
                        <h3>{item.title}</h3>
                        <p>{item.productType}</p>
                    </div>
                    <a><MdOutlinePlace /> {item.url}</a>
                    {/* 카드 중간 '이미지'*/}
                    <div className='card-body'>
                        <div className='image'>
                            <img src={item.imageUrl} />
                        </div>
                        {/* 카드 아래쪽 '아이디 및 내용물' */}
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
    )
}

const Container = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, 400px);
gap: 3.5em;
justify-content: center;
align-items: center;


.card {
background: white;
border-radius: 30px;
border: 1px solid lightgray;
cursor: pointer;
overflow: hidden;
height: 550px;
}

.card-top {
    display: flex;
    margin: 30px 0px 0px 30px;
}

.card-top p {
 display: flex;
 margin-top: 8px;
 margin-left: 10px;
 color: gray;
}

a {
    margin-left: 25px;
}

.card-body {
    width: 340px;
    margin-left: 29px;
}

.image{
    border-radius: 25px;
    overflow: hidden;
}

.card-body img {
    width: 100%;
    height: 270px;
    object-fit: cover;
}

.profile_box{
    display: flex;
    margin-top: 15px;
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
    font-family: 'Noto Sans KR';
    margin-top: 12px;
    margin-left: 10px;
  }

  .card-body p {
    margin-top: 10px;
    margin-left: 5px;
  }

  .content { 
    width: 330px;
    height: 80px;
    box-sizing: border-box;
    overflow: hidden;
}
`;

export default RCard
