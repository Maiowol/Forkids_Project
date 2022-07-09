import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

//  elements & components
import Grid from '../components/elements/Grid';
import Header from '../components/Header';
import SCard from '../components/cards/SCard';

function Recruit() {

  return (
    <div>
      <Header />
      <Grid align="center" height="100px" margin="0 0 32 0">
           <Title>모집 게시글</Title>
           {/* <Button>게시물 작성</Button> */}
           </Grid>
        <Container>
       <div className='cards'>
         <SCard />
       </div>
      </Container>
    
    </div>
  )
}


const Title = styled.h1 `
margin-top: 50px;
`;

const Button = styled.button`

`;

const Container = styled.div`


`;

export default Recruit
