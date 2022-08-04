//장소 추천 작성 페이지
import React, { useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
import plus from "../../images/plus.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatIcon from '../../components/main/ChatIcon';
import img_delete from '../../images/delete (1).png';

function ReviewAdd() {
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [imageSrc, setImageSrc] = useState([]);
  const [address, setAddress] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL;

  // axios.Post 버튼
  const onSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    let files = e.target.profile_files.files;
    let formData = new FormData();
    console.log(files)

    
    // 반복문 돌려서 다중 이미지 처리
    for (let i = 0; i < files.length; i++) {
      formData.append("imageUrl", files[i]);
    }

    // 제목,내용,장소,별점 데이터 => 폼데이터 변환
    formData.append("title", title);
    formData.append("content", content);
    formData.append("productType", location);
    formData.append("url", address);

    if (files.length < 4) {
      await axios
        .post(`${url}/api/reviews`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          Swal.fire({
            text: `게시글 작성이 완료되었습니다.`,
            icon: "success",
            confirmButtonText: "확인", 
            confirmButtonColor: '#ffb300'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/Review");
            }
          });
          
        })
        .catch((err) => {
          Swal.fire({
            text: `게시글을 작성해 주세요.`,
            icon: "error",
            confirmButtonText: "확인", 
            confirmButtonColor: '#ffb300'
          })
        });
    } else {
      Swal.fire({
        text: `사진은 3장 이하만 가능합니다.`,
        icon: "error",
        confirmButtonText: "확인", 
      })
    }
  };

  // 이미지 미리보기
  const handleImageChange = (e) => {
    const imageLists = e.target.files;
    let imageUrlLists = [...imageSrc];
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }
    setImageSrc(imageUrlLists);
  };

  // 이미지 미리보기에서 삭제
  const handleDeleteImage = (id) => {
    setImageSrc(imageSrc.filter((_, index) => index !== id));
  };

  return (
    <>
      <Header />
      <Container>
        <div style={{width:"1170px",
        margin: "0 auto" }}>
        <Title>
          <div className="subject">육아템 리뷰</div>
          <div className="page">
            <p>작성하기</p>
          </div>
        </Title>
        <Place>
          {/* 카드 위쪽: 이미지 */}
          <div className="place">
            <form onSubmit={(e) => onSubmit(e)}>
              <input
                id="input-file"
                type="file"
                name="profile_files"
                multiple="multiple"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              <div className="imageBox">
                <div className="plus_btn">
                  <label htmlFor="input-file">
                    <img src={plus} alt="추가" className="plusButton"/>
                  </label>
                  <p style={{
                    color: "#3C3C3C"
                  }}>
                    사진 업로드
                  </p>
                  <p style={{
                    color: "#6B4E16",
                    marginTop: "-13px",
                  }}>
                    &nbsp;(최대 3장)
                  </p>
                </div>
                
                  {/* 이미지 미리보기 */}
                  {imageSrc.map((image, id) => (
                    <div className="img_box_size" key={id}>
                      <img src={image} alt={`${image}-${id}`} />
                      <div className="img_btn">
                        {/* <button
                          onClick={() =>
                            handleDeleteImage(id)}>
                          이미지 삭제
                          <img src={img_delete} />
                        </button> */}
                      </div>
                    </div>
                  ))}
            
              </div>

              {/* 카드 왼쪽: 제목, 주소, 종류 */}
              <div className="mainBox">
                <div className="card-left">
                  <div className="position">
                    <strong>제목</strong>
                    <input
                      type="text"
                      onChange={(e) =>
                        setTitle(e.target.value)}
                      placeholder="제목을 입력하세요"
                    />
                  </div>

                  <MapSearch>
                    <strong>주소</strong>
                    <SearchInput
                      id="address"
                      type="text"
                      placeholder="구매처의 주소를 입력하세요"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </MapSearch>

                  <div className="position">
                    <strong>종류</strong>
                    <input
                      type="text"
                      placeholder="상품 종류를 입력하세요 (예시) 전자제품"
                      onChange={(e) =>
                        setLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* 카드 오른쪽: textarea, buttons */}
                <div className="card-right">
                  <textarea onChange={(e) =>
                    setContent(e.target.value)} 
                    placeholder="상품과 관련한 주요 사항을 상세하게 설명해주세요.&#13;&#10;
                    예) 사용 연령대, 금액, 용도, 구매처(온/오프라인), 할인/행사 여부 등
                    "
                    />
                </div>
              </div>
              <Btn>
                <button
                  className="btn"
                  onClick={() => {
                    navigate(`/review`);
                  }}
                >
                  취소{" "}
                </button>
                <button className="btn" type="submit">
                  등록하기
                </button>
              </Btn>

            </form>
          </div>
        </Place>
        </div>
      </Container>
      <ChatIcon />
      <Footer />
    </>
  );
}

const Container = styled.div`
width: 100%;
font-family: "Nanum Gothic";
background: #f5f5f5;
padding-bottom: 10px;
`;

const Title = styled.div`
  padding-top: 40px;
  .subject {
    color: #a8a8a8;
    margin-bottom: 2px;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  }
  .page {
    font-size: 30px;
    font-weight: 700;
  }
  p {
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  }
`;

const Place = styled.div`
width: 1170px;
height: 730px;
background: white;
margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
margin-top: 27px;
margin-bottom: 32px;
display: flex;
flex-direction: column;
border: 1px solid #E4E4E4;
border-radius: 10px;
  
  .place {
    width: 1135px;
  }
  .title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    padding: 10px;
    margin-left: 70px;
    margin-top: 40px;
  }
  .imageBox {
    min-height: 210px;
    max-height: auto;
    height: 280px;
    margin-top: 35px;
    margin-left: 30px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
    background: #FAFAFA;
    img {
      width: 37px;
      height: 37px;
      border: none;
    }
    p {
      font-family: 'Nanum Gothic', sans-serif;
      font-weight: 700;
    }
  }
  .plus_btn {
    width: 120px;
    margin-left: 20px;
    label {
      margin-left: 45px;
      margin-bottom: 15px;
      cursor: pointer;
    }
    p {
    margin-left: 26px;
    }
  }
  .plusButton{
    cursor: pointer;
  }
  .img_border{
    border: 1px dashed lightgray;
    width: 310px;
    height: 220px
  }
  .img_box_size{
  
    img {
      object-fit: cover;
      width: 300px;
      height: 210px;
      border: 1px solid #e4e4e4;
      border-radius: 10px;
      margin: 10px 0px 15px 20px;
    }
  }
  .img_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 25px;
  
    .img_box_size {
      padding: 0;
    }
   
    button {
     border-radius:10px;
     background-color: transparent !important;
     border: 1px solid #A8A8A8;
     padding-left: 15px;
     color: #3C3C3C;
    }
    img {
      width: 16px;
      height: 17px;
      border: none;
      margin: 0px 6px 1px 6px;
    }
  }
  .images {
    width: 90%;
    height: 5%;
    margin: auto;
  }
  .mainBox {
    display: flex;
    margin-top: 40px;
    margin-left: 60px;
  }
  .card-left {
    width: 513px;
  }
  .card-left > div > input {
    border: 1px solid #A8A8A8;
    border-radius: 10px;
    width: 350px;
    height: 50px;
    margin-left: 20px;
    margin-top: 10px;
    padding-left: 15px;
    font-size: 16px;
    ::placeholder{
      color: lightgray;
    }
  }
  .card-right {
    width: 530px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
  }
  textarea {
    width: 500px;
    height: 260px;
    border: 1px solid #A8A8A8;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 400;
    word-break: normal;
    outline: none;
    resize: vertical; /* 상하만 가능 */
    margin-bottom: 20px;
    padding: 10px;
    ::placeholder{
      color: lightgray;
    }
  }
  .position {
    margin-left: 3px;
    font-color: #000000;
    input {
      outline: none;
      font-size: 19px;
      height: 55px;
      ::placeholder{
        font-size: 16px;
        color: lightgray;
      }
    }
  }
  .position > strong {
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  }
  
  .star {
    display: flex;
    margin-left: 4px;
    margin-top: 33px;
    p {
      display: flex;
      margin-top: 3px;
      margin-left: 2px;
    }
  }
  .star > strong {
    margin-top: 2px;
    margin-right: 20px;
  }
`;

const MapSearch = styled.div`
  margin: 20px 0px 20px 2px;
  display: flex;
 
  .address_btn {
    margin-left: 10px;
    margin-top: 25px;
    width: 100px;
    height: 35px;
    
   span {
    border-radius: 10px; 
    font-weight: 700;
    background: #FAFAFA;
    color: #3C3C3C;
    border: 1px solid #A8A8A8;
    padding: 10px 12px 10px 12px;
    cursor: pointer;
    }
  }
  strong {
    width: 31px;
    margin-top: 23px;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  }
  button {
    display: flex;
  }
`;

const SearchInput = styled.input`
  border: 1px solid #e4e4e4;
  border-radius: 10px;
  width: 335px;
  height: 50px;
  outline: none;
`;

const Btn = styled.div`
display: flex;
margin-left: 790px;
.btn {
  width: 150px;
  height: 30px;
  border-radius: 30px;
  color: white;
  background-color: #3c3c3c;
  margin-right: 20px;
  padding-top: 11px;
  padding-bottom: 35px;
  border: 0;
  outline: 0;
}
`;

export default ReviewAdd;