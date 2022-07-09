import React from 'react'
import styled from 'styled-components'
import axios from "axios"

const MyPageChatList = () => {
    const token = localStorage.getItem("token")

    // // 페이지가 로드될 때 해당 user의 채팅 리스트를 불러온다
    // React.useEffect(()=>{
    //     axios.get('http://13.125.188.9/api/chats/rooms',{
    //     headers : { Authorization : "Bearer " + `${token}`}
    //     })
    // })








  return (
    <ChatList>
        <div className='profile_container'>
        <div className='profile'></div>
        </div>


        <div>

        <div className='name_container'> 안양길동맘</div>
        <div className='content'>
            <span className='say'>대화내용</span>
            <span className='bell'>
                <span className='number'>1</span>
            </span>
        </div>

        </div>
    </ChatList>
  )
}

const ChatList = styled.div`
    border:2px solid #E4E4E4;
    border-radius: 10px;
    display:flex;
    width:100%;
    height:10%;
    margin-top:10px;

.profile{
    width:70px;
    height:70px;
    border-radius:50%;
    border: 1px solid black;
}

.profile_container{
    width:30%;
    display:flex;
    justify-content:center;
    align-items:center;
}

.name_container{
    width:100%;
    height: 50%;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    display:flex;
    align-items:center;
}

.content{
    width:20vw;
    height: 50%;
    display:flex;
    justify-content:space-between;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
}

.bell{
    width:35px;
    height: 35px;
    border-radius:50px;
    background-color:#F4B03E;
    border:none;
    margin-right: 15px;
}

.say{
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    display:flex;
    align-items:center;
}

.number{
    display:flex;
    height:100%;
    justify-content:center;
    align-items:center;
    color:#fff;
}
`

export default MyPageChatList