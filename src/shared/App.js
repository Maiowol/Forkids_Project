import { Routes, Route } from 'react-router-dom';

// pages
import Main from '../pages/Main'
import LogIn from '../pages/User/LogIn';
import SignUp from "../pages/User/SignUp";

import Recruit from "../pages/Recruit/Recruit";
import Place from "../pages/Place/Place";
import Review from "../pages/Review/Review";

// 상세 페이지
import RecruitDetail from '../pages/Recruit/RecruitDetail';
import PlaceDetail from '../pages/Place/PlaceDetail';
import ReviewDetail from '../pages/Review/ReviewDetail';

// 작성 페이지
import RecruitAdd from '../pages/Recruit/RecruitAdd';
import PlaceAdd from '../pages/Place/PlaceAdd';
import ReviewAdd from '../pages/Review/ReviewAdd';

//수정 페이지
import RecruitEdit from '../pages/Recruit/RecruitEdit';
import PlaceEdit from '../pages/Place/PlaceEdit';
import ReviewEdit from '../pages/Review/ReviewEdit'

//마이 페이지
import ProfileManager from "../pages/Mypage/ProfileManager";
import ProfileInsert from '../pages/Mypage/ProfileInsert';
import BookMark from "../pages/Mypage/BookMark";
import WelcomeModal from '../modal/WelcomeModal';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={< LogIn />} />
        <Route path="/signup" element={< SignUp />} />

        {/* 모집 게시글 */}
        <Route path="/recruit" element={< Recruit />} />
        <Route path="/recruitadd" element={< RecruitAdd />} />
        <Route  path="/recruitdetail/:recruitPostId" element={< RecruitDetail />} />
        {/* <Route path="/recruitdetail" element={< RecruitDetail />} /> */}
        <Route path="/recruit/:recruitPostId" element={< RecruitEdit />} />
        {/* 장소 추천 */}
        <Route path="/place" element={< Place />} />
        <Route path="/placeadd" element={< PlaceAdd />} />
        <Route path="/placedetail" element={< PlaceDetail />} />


        {/* 육아 물품 리뷰 */}
        <Route path="/review" element={< Review />} />
        <Route path="/reviewadd" element={< ReviewAdd />} />
        <Route path="/reviewdetail" element={< ReviewDetail />} />


        {/* <Route  path="/mypage/:roomId" element={< MyPage />} /> */}
        {/* <Route  path="/mypage" element={< MyPage />} /> */}
        <Route path="/manager" element={< ProfileManager />} />
        <Route path="/bookmark" element={< BookMark />} />
        <Route path="/profileinsert" element={< ProfileInsert />} />

        {/* 이쪽 모달은 추후에 삭제 예정 */}
        <Route path="/welcome" element={< WelcomeModal />} />

      </Routes>
    </>
  );
}

export default App;
