import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import MyPageChatList from '../components/MyPage/MyPageChatList'
import MyPageChat from '../components/MyPage/MyPageChat'
import MyPageMenu from '../components/MyPage/MyPageMenu'
import { useDispatch} from "react-redux"
import {GetChatListAxios} from '../redux/modules/Data'
import {useSelector} from "react-redux";


function MyPage() {






  return (
    <>
    <Header/>
    <Container>
    <div className='Menu'>
    <MyPageMenu/>
    </div>

      <div className='List'>
        <MyPageChatList/>
      </div>
      <div className='Chat'><MyPageChat/></div>
    </Container>
    </>
  )
}


const Container = styled.div`
display:flex;
.Menu{
  width:25%;
  height:91vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
}
.List{
  width:25%;
  height:91vh;
  border-radius:15px;
  border:2px solid #E4E4E4;;
  display: flex;
  flex-direction:column;
  overflow:auto;
}
.Chat{
  width:50%;
  height:91vh;
}

`
export default MyPage
