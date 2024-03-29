// App.js
import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import Footer from "./components/footer/Footer";
import FreeBoard from "./components/freeboard/FreeBoard";
import Header from "./components/header/Header";
import Post from "./components/post/Post";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import DashBoard from "./pages/dashboard/DashBoard";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import TextEdit from "./components/reactquill/TextEdit";
import GroupBoard from "./components/groupboard/GroupBoard";
import Comment from "./components/comment/Comment";
import JobfinderBoard from "./pages/board/JobfinderBoard";
import Board from "./pages/board/Board";
import { useEffect } from "react";
import { isAuthenticatedAtom } from "./atoms/IsAuthenticatedAtom";
import { useRecoilState } from "recoil";
import VideoRoomComponent from "./components/openvidu/components/VideoRoomComponent";
import RoutingRoom from "./components/openvidu/components/routingroom/RoutingRoom";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);

  useEffect(() => {
    // 페이지가 로드될 때 웹 스토리지에서 로그인 정보를 확인
    const token = localStorage.getItem("accessToken");

    if (token) {
      // 로그인 정보가 있는 경우 Recoil 상태를 업데이트
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashBoard" element={<PrivateRoute />}>
            <Route index element={<DashBoard />} />
          </Route>
          <Route path="calendar" element={<PrivateRoute />}>
            <Route index element={<Calendar />} />
          </Route>
          <Route path="freeBoard" element={<FreeBoard />} />

          <Route path="textedit" element={<TextEdit />} />
          <Route path="post/:postId" element={<Post />} />
          <Route path="groupBoard" element={<GroupBoard />} />
          <Route path="comment" element={<Comment />} />
          <Route path="jobBoard" element={<JobfinderBoard />} />
          <Route path="login" element={<Login />} />
          <Route path="board" element={<Board />} />
        </Route>

        
          <Route path="room" element={<RoutingRoom/>} />
        
        <Route />

        {/*profile의 URL은 해당 유저가 요청한 데이터 값만 가져다 줘야 하기 때문에 이 URL은 매우 유동적이여야 할 것임. 지금은 임시로 이렇게 컴포넌트만 지정해놓은 거임.*/}
      </Routes>
    </div>
  );
}
export default App;
