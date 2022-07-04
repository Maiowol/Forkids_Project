import React from 'react'
import styled from 'styled-components'
import axios from "axios"
import { getCookie } from '../../shared/Cookie'
import { useDispatch} from "react-redux"
import {GetChatListAxios} from '../../redux/modules/Data'
import {useSelector} from "react-redux";
import io from "socket.io-client";

const MyPageChatList = () => {
    const dispatch = useDispatch();
    const Data = useSelector((state)=> state.Data.list);


    // 페이지가 로드될 때 해당 user의 채팅 리스트를 불러온다
    React.useEffect(()=>{
        dispatch(GetChatListAxios());       
    },[])

    const JoinChatroom = () =>{
    const socket = io.connect("http://13.124.155.104")
    // const roomId = Data.roomId
    // socket.emit("join_room", roomId);
    // navigate('/MyPage/' + roomId )
    }








    return (
            <>
            {Data&&Data.map((Data,idx)=>{
                return(
                <ChatList key={idx} onClick={JoinChatroom}>
                <div className='profile_container' >
                <div className='profile'></div>
                </div>
                <div>
                <div className='name_container'>{Data.nickname}</div>
                <div className='content'>
                <span className='say'>대화내용</span>
                <span className='bell'>
                    <span className='number'>1</span>
                </span>
            </div>
    
            </div>
            </ChatList>
                )
            })}
            </> 
            

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
    margin-right: 10px;
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
    position:relative;
    bottom: 10px;
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