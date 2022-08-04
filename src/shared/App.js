import { Routes, Route } from "react-router-dom";
import {QueryClientProvider, QueryClient} from 'react-query'
// pages
import Main from "../pages/Main";
import LogIn from "../pages/User/LogIn";
import SignUp from "../pages/User/SignUp";

// 카테고리
import Recruit from "../pages/Recruit/Recruit";
import Place from "../pages/Place/Place";
import Review from "../pages/Review/Review";

// 상세 페이지
import RecruitDetail from "../pages/Recruit/RecruitDetail";
import PlaceDetail from "../pages/Place/PlaceDetail";
import ReviewDetail from "../pages/Review/ReviewDetail";

// 작성 페이지
import RecruitAdd from "../pages/Recruit/RecruitAdd";
import PlaceAdd from "../pages/Place/PlaceAdd";
import ReviewAdd from "../pages/Review/ReviewAdd";

//수정 페이지
import RecruitEdit from "../pages/Recruit/RecruitEdit";
import PlaceEdit from "../pages/Place/PlaceEdit";
import ReviewEdit from "../pages/Review/ReviewEdit";

//마이 페이지
import ProfileManager from "../pages/Mypage/ProfileManager";
import ProfileInsert from "../pages/Mypage/ProfileInsert";
import KakaoLogIn from "../pages/User/KakaoLogIn";
import MyBookmark from '../pages/Mypage/MyBookmark'

//검색 페이지
import MainSearch from "../pages/Search/MainSearch";
import HomePage from '../../src/shared/HomePage'
import Cancel from '../components/alert/Cancel';
import ConfirmAlert from "../components/alert/ConfirmAlert";
import Alert from '../components/alert/Alert';

const queryClient = new QueryClient()
function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/api/users/kakao/callback" element={<KakaoLogIn />} />

        {/* 모집 게시글 */}
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/recruitadd" element={<RecruitAdd />} />
        <Route
          path="/recruitdetail/:recruitPostId"
          element={<RecruitDetail />}
        />
        <Route path="/recruitedit/:recruitPostId" element={<RecruitEdit />} />

        {/* 장소 추천 */}
        <Route path="/place" element={<Place />} />
        <Route path="/placeadd" element={<PlaceAdd />} />
        <Route path="/placedetail/:placePostId" element={<PlaceDetail />} />
        <Route path="/PlaceEdit/:placePostId" element={<PlaceEdit />} />

        {/* 육아 물품 리뷰 */}
        <Route path="/review" element={<Review />} />
        <Route path="/reviewadd" element={<ReviewAdd />} />
        <Route path="/ReviewEdit/:reviewPostId" element={<ReviewEdit />} />
        <Route path="/reviewdetail/:reviewPostId" element={<ReviewDetail />} />

        <Route path="/manager/:nickname" element={<ProfileManager />} />
        <Route path="/profileinsert/:nickname" element={<ProfileInsert />} />
        <Route path="/MyBookmark" element={<MyBookmark />} />

        {/* 검색 페이지 */}
        <Route path="/api/search" element={<MainSearch/>} />

        <Route path="/alert" element={<Alert />} />

      </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
