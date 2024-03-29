import React, { useEffect } from "react";
import DashLeft from "../../components/dashLeft/DashLeft";
import DashRight from "../../components/dashRight/DashRight";
import NavBar from "../../components/navbar/NavBar";
import { ActiveTapState } from "../../atoms/ActiveTapState";
import { useRecoilState } from "recoil";
import Profile from "../profile/Profile";

function DashBoard() {
  const [activeNav, setActiveNav] = useRecoilState(ActiveTapState);

  useEffect(() => {
    // 상태가 변경될 때마다 실행할 부수 효과를 여기에 작성합니다.
    // 예: activeNav 상태에 따라 특정 작업을 수행하거나, API 호출 등을 할 수 있습니다.

    console.log("현재 activeNav:", activeNav);
    setActiveNav(0);
  }, []);

  return (
    <div>
      <div className="w-full min-h-[h-screen] flex">
        <NavBar />

        <div>
          
            <div className="grid grid-cols-1 xl:grid-cols-5 w-full col-span-10">
              <DashLeft />
              <DashRight />
            </div>
          

          
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
