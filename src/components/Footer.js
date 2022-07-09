import React from 'react'
import styled from 'styled-components'
import {FaGithub} from "react-icons/fa";
import '../shared/App.css'
import Figma from '../images/Figma.png'





const Footer = () => {
  return (
    <FooterContainer>
        <div className='one_container'>
            <div className='one'>
                <div className='one_box'>
                    <div className='icon_box'><a href="https://github.com/Maiowol/Forkids_Project"><FaGithub></FaGithub></a></div>
                    <div className='font_box'>
                        <div className='react'>Front-End</div>
                        <div className='name'>김숙영 , 정인성</div>
                    </div>
                </div>


            </div>


            <div className='two'>
            <div className='two_box'>
            <div className='icon_box'><a href="https://github.com/changmin97/forkidsProject"><FaGithub></FaGithub></a></div>
                <div className='font_box'>
                    <div className='react'>Back-End</div>
                    <div className='name'>이창민 , 조세림 , 안재훈</div>
                </div>
            </div>
            </div>



            <div className='three'>
            <div className='three_box'>
            <div className='icon_box'><a href="https://www.figma.com/file/6oxe17NH1VuhHdZxdj9X9N/항해99"><img src={Figma} alt="이미지"/></a></div>
                <div className='font_box'>
                    <div className='react'>Designer</div>
                    <div className='name'>서혜빈</div>
                </div>
            </div>
            </div>
        </div>




        <div className='two_container'>Copyright 2022. 모두의육아 all right reserved.</div>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
    width: 100%; 
    color:white;
    padding:10px;
    height: 130px;
    background-color: #3C3C3C;
    position: relative;
    transform: translateY(500%);
    font-family: 'Noto Sans KR';

.one_container{
    height: 80%;
    display:flex;
}

.two_container{
    height: 20%;
    text-align: center;
    color:#E4E4E4;
    font-weight:100;
}

.one{
    width:33%;

    display:flex;
    justify-content:flex-end;
}
.two{
    width:33%;
    display:flex;
    justify-content:center;
}
.three{
    width:33%;
}

.name{
    width:180px;
    margin-left: 20px;
    font-size:16px;
    font-weight:700;
}

.icon_box > a > img {
    width:50px;
    height: 50px;
}

.font_box{
    display:flex;
    justify-content: center;
    align-items:center;
    flex-direction:column;
}
.one_box{
    width:40%;

    height:100%;
    display:flex;
}

.react{
    width:100%;
    color: #F4B03E;
    font-size:16px;
    font-weight:700;
}

.two_box{
    width:40%;
    height:100%;
    display:flex;
}

.three_box{
    width:40%;
    height:100%;
    display:flex;
}


a{
    color: white;
}
.icon_box{
    width:30%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size: 50px;
}

@media screen and (max-width: 768px) {
.name{
    display:none;
}
.react{
    display:none;
}
.icon_box{
    margin-bottom:30px;
}
.one_container{
    margin-left:40px;
}
}


`



export default Footer