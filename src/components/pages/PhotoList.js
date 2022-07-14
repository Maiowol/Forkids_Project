import React from 'react';
import PhotoItem from './PhotoItem';
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import styled from 'styled-components';

function PhotoList({ datas, currItem, onView }) {

  const { image, title } = currItem

  return (
    <PhotoBox>
      <div className='picture'>
        <div className='box'>
          <img className='mainPhoto'
            src={image} /></div>
        <div className='small'>
          <ul>
            {datas.map(item =>
              <PhotoItem key={item.id} item={item} onView={onView} />)
            }
          </ul>
        </div>
      </div>
    </PhotoBox>

  )
}

const PhotoBox = styled.div`
display: flex;
width: 55%;

.picture{
  width:100%;
  height: 800px;
}

.box{
  height: 500px;
  display:flex;
  align-items:center;
  justify-content:center;
}

.small{
  
  widht: 40px;
  display:flex;
  justify-content:center;
  align-items:center;
}

.small > ul{
  display: flex;
}


.mainPhoto{
  border:1px solid black;
  margin-left: 35px;
  width:65%;
  height:400px;
  border-radius: 30px;
}
`;


export default PhotoList
