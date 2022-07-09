import React from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import dog from '../images/dog.jpg'
import { getCookie } from "../shared/Cookie";
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import io from "socket.io-client";
import MyPageChat from '../components/MyPage/MyPageChat';




const DetailOne = () => {
    const navigate = useNavigate();
    const [on, setOn] = React.useState(false)

    // 모집중 , 모집완료 상태 변경하기 
    const inputChange = () => {
        setOn(!on);
      };


    // 1:1 문의하기 버튼 눌렀을때 채팅방 생성 + 채팅방 입장하기
    const GoChat = () =>{     
    axios.post('http://13.124.212.159/api/chats/rooms/1',null,{
        headers : { Authorization: `Bearer ${getCookie("accessToken")}`}
    })
    .then((res)=>{
        console.log(res)
        const socket = io.connect("http://13.124.212.159")
        const roomId = res.data.roomId
        socket.emit("join_room", roomId);
        navigate('/MyPage/' + roomId )
    })
    .catch((err)=>{
        console.log(err)
    })
    }


  return (
    <>
    <Header/>
    <Detail>
        <div className='toggle'>
            <input type="checkbox" id="chk1"/><label htmlFor="chk1" onClick={inputChange}><span>선택</span></label>
            <h1> {!on ? "모집중":"모집완료"}</h1>

        </div>
        <div className='one_container'>
            <div className='one_box'>
                <div> 제목  <span>블루베리 농장 체험</span></div>
                <div>날짜  <span>2022-06-30(목)</span></div>
                <div>시간  <span>15:00</span></div>
                <div>위치  <span>블루베리팜 수원점</span></div>
                <div>연령  <span>5~10세</span></div>
            </div>
            <div className='two_box'>
            <div className='three_box'>
            <div className='Detail_profile'>
                <img src={dog} alt="프로필"/>
            </div>

            <div className="Detail_username">
            <div className="username">안양길동맘</div>
            <div className='btn_box'>
                <button onClick={GoChat}>1:1문의하기</button>
                <button>신청하기</button>
            </div>
            </div>
            </div>

            <div className='four_box'>
            블루베리 농장 체험 가려는데 거리가 멀어 운전 가능한 학부모님 찾습니다~
            현재 안양에 거주 중이라 근처 가까운 곳에서 뵈었으면 좋겠습니다.
            육아 스타일: 강하게 키웁니다
            준비물: 물티슈
            입장료: 성인 15000원 / 아동 8000원
            </div>


            </div>
        </div>
    </Detail>
    </>
  )
}

const Detail = styled.div`



.toggle{
    margin-left: 20px;
    display:flex;
    height: 100px;
}

label {
    margin-top:15px;
}
.toggle > h1{
    margin:20px 0px 0px 50px;
}

.one_container{
    display:flex;
}

.one_box{

    width:50%;
    height:50vh;
    display:flex;
    justify-content:center;
    flex-direction:column;
    font-size : 25px;
    
}

.one_box > div {
    margin:30px 0px 0px 70px;
}

.Detail_profile > img {
    width:144px;
    height:144px;
    border-radius:50%;
}



.one_box > div >span{
    border:2px solid #E4E4E4;
    display:inline-block;
    width:30vw;
    padding:10px;
    margin-left: 30px;
}



.btn_box{
    display:flex;
    align-items:center;
    justify-content:center;
}

.btn_box > button {
    width:236px;
    height:48px;
    margin-left:13px;
    background-color:white;
    font-size:20px;
}


.two_box{
    width:50%;
    height:50vh;
}

.three_box{
    height:30%;
    display:flex;
}

.four_box{
    padding:20px;
    height:70%;
    width:80%;
    border:2px solid #E4E4E4;
    border-radius:15px;
    font-size:20px;
    font-weight:400;
    margin-top:40px;
    word-break:normal;
}

.Detail_profile{
    width:144px;
    height: 144px;
    border-radius:50%;
    /* display:flex; */
    align-items:center;
    display:block;
    justify-content:center;
}

.Detail_username{
    width: 70%;
}

.username{
    height: 50%;
    display:flex;
    align-items:center;
    margin-left:30px;
    font-size:33px;
    width: 100%;

}

.btn_box{

    height:50%;
}



.off{
    display:none;
}

input{
    position:absolute;
    left:-1000%;
    }

label{
    position:relative;
    display:block;
    width:200px;
    height: 60px;
    background:#A58646;
    border-radius:60px;
    transition: background .4s;
} 

label:after{
    content:"";
    position: absolute;
    left:7.5px;
    top:50%;
    width: 45px;
    height: 45px;
    border-radius:100%;
    background-color:#fff;
    transform: translateY(-50%);
    box-shadow:1px 3px 4px rgba(0,0,0.1);
    transition: all .4s; 

}

input:checked + label:after {
left:calc(100% - 52.5px);
}
input:checked + label{background-color:#6B4E16;}

label span {display:none;}

`

export default DetailOne