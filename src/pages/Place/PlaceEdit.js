//장소 추천 수정 페이지
import React, { useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FaStar } from "react-icons/fa";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
import Modal from "../../modal/Map/Modal";
import plus from "../../images/plus.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ChatIcon from '../../components/main/ChatIcon';
import img_delete from '../../images/delete (1).png';
import Swal from "sweetalert2";

function PlaceEdit() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [imageSrc, setImageSrc] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [rating, setRating] = useState(0);
  const [detail, setDetail] = useState("");
  const { placePostId } = useParams();

  // // axios.Post 버튼
  // const onSubmit = async (e) => {
    // e.preventDefault();
    // e.persist();

    // let files = e.target.profile_files.files;
    // let formData = new FormData();
    // console.log(files)

    // 반복문 돌려서 다중 이미지 처리
    // for (let i = 0; i < files.length; i++) {
    //   formData.append("imageUrl", files[i]);
    // }

    // for (const [key, value] of formData.entries()) {
    // }
    // console.log(files.length);

    // 제목,내용,장소,별점 데이터 => 폼데이터 변환
    // formData.append("title", title);
    // formData.append("content", content);
    // formData.append("region", region);
    // formData.append("location", location);
    // formData.append("star", rating);


  //     await axios
  //       .post("https://zhaoxilin.shop/api/places",  {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((res) => {
  //         Swal.fire({
  //           text: `게시글 수정이 완료되었습니다.`,
  //           icon: "success",
  //           confirmButtonText: "확인", 
  //           confirmButtonColor: '#ffb300'
  //         }). then((result) => {
  //            navigate("/place");
  //           })
  //       })
  //       .catch((err) => {
  //       //   console.log(err);
  //       });
  // };

  React.useEffect(() => {
    axios
      .get("https://zhaoxilin.shop/api/places/" + placePostId)
      .then((res) => {
        setDetail(res.data.placeDetails);
      });
  }, []);

  // console.log(detail)

  const newPost = {
    title: title.length === 0 ? detail.title : title,
    content: content.length === 0 ? detail.content: content,
    region: region.length === 0 ? detail.region: region,
    location: location.length === 0 ? detail.location: location,
    star: currentValue === 0 ? detail.star : currentValue
  }

// console.log(currentValue)

  const editPost = () => {
      axios
        .put(`https://zhaoxilin.shop/api/places/` + placePostId, newPost, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          Swal.fire({
            text: `게시글 수정이 완료되었습니다.`,
            icon: "success",
            confirmButtonText: "확인", 
            confirmButtonColor: '#ffb300'
          }). then((result) => {
            if (result.isConfirmed) {
              navigate("/place")
            };
            })
        }).catch((error) => {
          // console.log(error)
          Swal.fire({
            text: `게시글 수정에 실패했습니다.`,
            icon: "error",
            confirmButtonText: "확인", 
            confirmButtonColor: '#ffb300'
          })
        });
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
  // const handleDeleteImage = (id) => {
  //   setImageSrc(imageSrc.filter((_, index) => index !== id));
  // };

  //위치 모달
  const RegionsData = (data) => {
    // console.log(data);
    setRegion(data);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 별점
  const stars = Array(5).fill(0);

  const colors = {
    yellow: "#FFBA5A",
    grey: "#a9a9a9",
  };

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  if(!detail) {
    return <div></div>
  };
 
  return (
    <>
      <Header />
      <Container>
      <div style={{width:"1170px",
        margin: "0 auto" }}>
        <Title>
          <div className="subject">장소 추천</div>
          <div className="page">
            <p>수정하기</p>
          </div>
        </Title>
        <Place>
          {/* 카드 위쪽: 이미지 */}
          <div className="place">
            {/* <form onSubmit={(e) => onSubmit(e)}> */}
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
                    {/* <img src={plus} /> */}
                  </label>
                  {/* <p style={{
                    color: "#3C3C3C"
                  }}>
                    사진 업로드
                  </p>
                  <p style={{
                    color: "#6B4E16",
                    marginTop: "-13px",
                  }}>
                    &nbsp;(최대 3장)
                  </p> */}
                </div>
                
                  {/* 이미지 미리보기 */}
                  {detail.imageUrl.map((image, id) => (
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

              {/* 카드 왼쪽: 제목, 주소, 장소, 별점 */}
              <div className="mainBox">
                <div className="card-left">
                  <div className="position">
                    <strong>제목</strong>
                    <input
                      type="text"
                      onChange={(e) =>
                        setTitle(e.target.value)}
                      placeholder={detail.title}
                    />
                  </div>

                  <MapSearch>
                    <strong>주소</strong>
                    <SearchInput
                      id="address"
                      type="text"
                      placeholder={detail.region}
                      defaultValue={region}
                    />
                    <div className="address_btn">
                      <span
                        onClick={openModal}
                      >
                        주소 검색
                      </span>
                      <Modal
                        open={modalOpen}
                        close={closeModal}
                        header="주소 검색"
                        addressData={RegionsData}
                      />
                    </div>
                  </MapSearch>

                  <div className="position">
                    <strong>장소</strong>
                    <input
                      type="text"
                      placeholder={detail.location}
                      onChange={(e) =>
                        setLocation(e.target.value)}
                    />
                  </div>

                  <div className="star">
                    <strong>별점</strong>
                    {stars.map((star, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name="rating"
                            style={{ display: "none" }}
                            defaultValue={ratingValue}
                            onClick={() => setRating(ratingValue)}
                          />
                          <FaStar
                            key={index}
                            size={28}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            color={
                              ( currentValue || detail.star) > index
                                ? colors.yellow
                                : colors.grey
                            }
                            style={{
                              marginRight: 10,
                              cursor: "pointer",
                              transition: "color 200ms",
                            }}
                          />
                        </label>
                      );
                    })}
                    <p onChange={(e) => setRating(e.target.value)}>
                     {rating ? 
                     currentValue : detail.star}점
                    </p>
                  </div>
                </div>

                {/* 카드 오른쪽: textarea, buttons */}
                <div className="card-right">
                  <textarea onChange={(e) =>
                    setContent(e.target.value)}
                    placeholder={detail.content}
                    />
                </div>
              </div>
              <Btn>
                <button
                  className="btn"
                  onClick={() => {
                    navigate(`/place`);
                  }}
                >
                  취소{" "}
                </button>
                <button className="btn" 
                // type="submit"
                onClick={editPost}
                >
                  수정하기
                </button>
              </Btn>

            {/* </form> */}
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

    p {
      font-family: 'Nanum Gothic', sans-serif;
      font-weight: 700;
    }
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
    margin-top: 30px;
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
    width: 65px;
    // margin-left: 20px;
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
      font-family: 'Nanum Gothic', sans-serif;
      font-weight: 700;
    }

    strong {
      font-family: 'Nanum Gothic', sans-serif;
      font-weight: 700;
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
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
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


export default PlaceEdit;
