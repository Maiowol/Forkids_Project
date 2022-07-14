import React, { useState } from 'react'

//style
import styled from 'styled-components'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import { FaStar } from "react-icons/fa";
import { AiOutlineFileImage } from "react-icons/ai";

//elements & components
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer';
import Grid from '../../components/elements/Grid';

import axios from "axios"
import io from "socket.io-client";
import { getCookie } from "../../shared/Cookie";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { createPostDB } from '../../redux/modules/post';

function PlaceAdd() {

  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [content, setContent] = useState('');
  const [imageSrc, setImageSrc] = useState([]);
  const image_ref = useState(null)
  

  const navigate = useNavigate();

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
  };

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const handleImageChange = (e) => {
		// console.log(e.target.files[])
		if (e.target.files) {
			const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
			// console.log("filesArray: ", filesArray);

			setImageSrc((prevImages) => prevImages.concat(filesArray));
			Array.from(e.target.files).map(
				(file) => URL.revokeObjectURL(file) // avoid memory leak
			);
		}
	};

	const renderPhotos = (source) => {
		console.log('source: ', source);
		return source.map((photo) => {
			return <img src={photo} alt="" key={photo} />;
		});
	};

  return (
    <>
      <Header />
      <Grid maxWidth="1440px" height="100%"
        margin="0 auto" padding="0 12px">
        <Place>
          <div className='place'>
            <div className='images'>
              <div className='title'>
                대표이미지
              </div>
            </div>
            <input type='file'
              ref={image_ref}
              onChange={handleImageChange}
              accept='image/jpg,image/png,image/jpeg,image/gif'
              id='profile_img_upload'
              style={{display:'none'}} />
            <div className='imageBox'>
              <label
               for='profile_img_upload'>
              <AiOutlineFileImage />
              </label>
              <div className='img'>
              {renderPhotos(imageSrc)}
              </div>
              
            </div>
            <div className='mainBox'>
              <div className='card-left'>
                <div className='position'>
                  <strong>제목</strong>
                  <input type="text" />
                </div>
                <div className='position'>
                  <strong>위치</strong>
                  <input type="text" />
                </div>

                <div className='star'>
                  <strong>별점</strong>
                  {stars.map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                        style={{
                          marginRight: 10,
                          cursor: "pointer"
                        }}
                      />
                    )
                  })}
                  <span>4.0점</span>
                </div>
              </div>
              <div className='card-right'>
                <textarea />
                {/* <span className='btnList'>
                      <button className='ParkBtn'> 주차가능</button>
                      <button className='KidBtn'> 예스키즈존</button>
                    </span> */}
              </div>

            </div>
            <Btn>
              <button
                className='btn'
                onClick={() => { navigate(`/`) }}
              >
                취소 </button>
              <button
                className='btn'
              // onClick={addPost}
              >
                등록하기</button>
            </Btn>
          </div>
        </Place>
      </Grid>
      <Footer />
    </>
  )
};

const Place = styled.div`
.place {
    width: 100%; 
}

.title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    padding:10px;
    margin-left: 70px;
    margin-top: 40px;
}

.imageBox{
  min-height: 210px;
  max-height: auto;
  width: 100%;
  background-color: lightgray;
  margin-top:1rem ;
   display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: left; 
}

.imageBox > label {
  margin-left: 20px;
}

// .img{
//   width:200px;
//   height:220px;
//   border: 1px solid #E4E4E4;
//   border-radius: 10px;
//   margin: 20px 0px 20px 40px;
//   overflow: hidden;
// }

img{
  // width: 100%;
  // height: 100%;
  // object-fit: cover;
  width:200px;
  height:220px;
  border: 1px solid #E4E4E4;
  border-radius: 10px;
  margin: 20px 0px 20px 40px;
}

.images{
    width:90%;
    height: 5%;
    margin:auto; 
}

.mainBox{  
    display: flex;
    margin-left: 200px;
}

.card-left > div > input {
  border: 1px solid #E4E4E4;
  border-radius: 10px;
  width: 330px;
  height: 50px;
  margin-left: 20px;
}

.card-right{
    width: 700px;
    height: 440px;
    display: flex;
    justify-content: center;
    align-items:center;
}

textarea {
  width: 500px;
  height: 364px;
  border:1px solid #E4E4E4;
  border-radius:10px;
  font-size:20px;
  font-weight:400;
  word-break:normal;
  outline: none;
  resize: vertical; /* 상하만 가능 */
}

.position{
    margin: 40px 0px 30px 30px;
}

.star {
  margin-left: 30px;
  margin-top: 30px;
}

.star > strong {
  margin-right: 15px;
}
`

const Btn = styled.div`
display: flex;
margin-left: 800px;

.btn{
width: 30%;
height: 30px;
border-radius: 20px;
color: white;
background-color: #3C3C3C;
margin-top: 20px;
margin-right: 10px;
padding-top: 9px;
padding-bottom: 33px;
border: 0;
outline: 0;
}
`

export default PlaceAdd
