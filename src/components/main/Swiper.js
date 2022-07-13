import React from "react";
import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";
import "../../shared/App.css";
import slider01 from "../../images/Slider01.jpg";
import slider02 from "../../images/Slider02.jpg";
import slider03 from "../../images/Slider03.jpg";

const Swiper = () => {
  return (
    <Item>
      <Carousel controls={false} fade={true} interval={4000}>
        <Carousel.Item>
          <img className="d-block w-100" src={slider01} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slider02} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slider03} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </Item>
  );
};

const Item = styled.div`
  z-index: -1;
  position: relative;

  img {
    width: 100%;
    height: 550px;
    object-fit: cover;
  }
`;

export default Swiper;
