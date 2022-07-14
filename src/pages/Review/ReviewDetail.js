import React,{useState} from 'react'
import styled from 'styled-components'
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

import Header from '../../components/main/Header'
import Comment from '../../components/elements/Comment'
import data from '../../shared/data';
import PhotoList from '../../components/pages/PhotoList';
import Content from '../../components/pages/Content';

const ReviewDetail = () => {

  const [datas, setDatas] = useState(data)
  const [currItem, setCurrItem] = useState(datas[0])

  const onView = (id) => {
    setCurrItem(datas.find(item => item.id === id))
  }

  return (
    <>
    <Header/>
    <Container>
        <div className='Box'>
          <PhotoList
            datas={datas}
            currItem={currItem}
            onView={onView}
          />
          <Content/>
        </div>
      </Container>
      <Comment />
    </>
    
  )
}


const Container = styled.div`
  width:100%;
  height: 100vh;
 
.Box{
  margin: 80px auto;
  width:80%;
  height: 70vh;
  display:flex;
}
`

export default ReviewDetail;
