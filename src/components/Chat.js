import React from 'react'
import styled from 'styled-components'


const Chat = () => {
  return (
    <ChatContainer>
      <div className='ChatBox'>
        <div className='oneBox'>
          <span> 2022년 06월 30일 목요일</span>
          <span> 별명님이 입장하셨습니다</span>
        </div>

        <div></div>


        <div className='InputBox'>
          <input type="text"/>
          <span>보내기</span>
        </div>


      </div>
    </ChatContainer>
  )
}


const ChatContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
height: 100%;

.ChatBox{
  border:2px solid #E4E4E4;
  border-radius:30px;
  width:  620px;
  height: 730px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}

.oneBox{
  display:flex;
  flex-direction:column;
  padding:20px;
}

.oneBox > span {
  width:100%;
  text-align:center;
  color:#A8A8A8;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: 16px;
  line-height: 23px;
}

.InputBox > input {
  width:80%;
  border-radius:30px;
  height: 35px;
  border:1px solid #A8A8A8;
}

.InputBox > span{
  border:none;
  position: relative;
  right:63px;
  background-color: #fff;
  color:#6B4E16;
  font-weight:700;
  cursor: pointer;
}

.InputBox{
  text-align: center;
  padding:20px;
  position:relative;
  bottom:20px;
  left:30px;
}
`
export default Chat