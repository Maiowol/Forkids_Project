import React from "react";
import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";
import "../../shared/App.css";

const Swiper = () => {
  return (
    <Item>
      <Carousel controls={false} fade={true} interval={2500}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1614113036347-9f60df80730a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1794&q=80"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1607211851821-8be3cd6146f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1460788150444-d9dc07fa9dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Third slide"
          />
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
