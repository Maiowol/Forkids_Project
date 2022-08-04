//장소 추천 수정 페이지
import React, { startTransition, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ChatIcon from '../../components/main/ChatIcon';
import { Link } from "react-router-dom";

function ReviewEdit() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [detail, setDetail] = useState("");
  const { reviewPostId } = useParams();
  const url = process.env.REACT_APP_URL;

  React.useEffect(() => {
    axios
      .get(`${url}/api/reviews/` + reviewPostId)
      .then((res) => {
        console.log(res.data)
        setDetail(res.data.reviewDetails);
      });
  }, []);


  // 수정버튼
  const editPost = () => {

    const data = {
      title: title.length === 0 ? detail.title : title,
      content: content.length === 0 ? detail.content : content,
      url: region.length === 0 ? detail.region : region,
      productType: location.length === 0 ? detail.location : location,
    }

    axios
      .put(`${url}/api/reviews/` + reviewPostId, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        Swal.fire({
          text: '게시글 수정에 완료되었습니다',
          icon: 'success',
          confirmButtonText: "확인",
          confirmButtonColor: '#ffb300'
        }).then((result => {
          if (result.isConfirmed) {
            navigate('/review')
          }
        }))
      }).catch((error) => {
        //   console.log(error);
      });
  };


  if (!detail) {
    return <div></div>;
  }


  return (
    <>
      <Header />
      <div style={{
        width: "1170px",
        margin: "0 auto"
      }}>
        <Title>
          <div className="subject">육아템 리뷰</div>
          <div className="page">
            <p>수정하기</p>
          </div>
        </Title>
        <Place>
          {/* 카드 위쪽: 이미지 */}
          <div className="place">
            <input
              id="input-file"
              type="file"
              name="profile_files"
              multiple="multiple"
              style={{ display: "none" }}
            />

            <div className="imageBox">
              <div className="plus_btn">

              </div>

              {/* 이미지 미리보기 */}
              {detail.imageUrl.map((image, id) => (
                <div className="img_box_size" key={id}>
                  <img src={image} alt={`${image}-${id}`} />
                  <div className="img_btn">
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
                    defaultValue={detail.title}
                  />
                </div>

                <MapSearch>
                  <strong>주소</strong>
                  <SearchInput
                    id="address"
                    type="text"
                    onChange={(e) =>
                      setRegion(e.target.value)}
                    defaultValue={detail.url}
                  />
                </MapSearch>

                <div className="position">
                  <strong>종류</strong>
                  <input
                    type="text"
                    onChange={(e) =>
                      setLocation(e.target.value)}
                    defaultValue={detail.productType}
                  />
                </div>
              </div>

              {/* 카드 오른쪽: textarea, buttons */}
              <div className="card-right">
                <textarea onChange={(e) =>
                  setContent(e.target.value)}
                  defaultValue={detail.content}
                />
              </div>
            </div>
            <Btn>
              <Link to="/review">
                <button
                  className="btn"
                >
                  취소
                </button>
              </Link>

              <button className="btn"
                type="submit"
                onClick={editPost}
              >
                수정하기
              </button>
            </Btn>
          </div>
        </Place>
      </div>
      {/* </Container> */}
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
  font-weight: 700;
  font-family: 'NanumGothic';
}
`;

export default ReviewEdit
