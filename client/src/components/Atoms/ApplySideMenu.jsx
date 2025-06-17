import { useRef, useState } from "react";
import styled from "styled-components";

const ApplySideMenu = ({ openAIPopup, changeFloor }) => {
  const [floor, setFloor] = useState("3F");

  const AIPopupOpen = () => {
    openAIPopup();
  };

  const selectFloor = (e) => {
    document.querySelector(".floorName.active").classList.remove("active");
    e.target.classList.toggle("active");
    setFloor(e.target.textContent);
    changeFloor(e.target.textContent);
  };

  return (
    <>
      <Wrap>
        <NowFloorWrap>
          <NowFloorText>{floor}</NowFloorText>
        </NowFloorWrap>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "100px",
          }}
        >
          <AiRecommend onClick={AIPopupOpen}>
            <img src="../src/assets/img/AIImage.png" alt="" />
          </AiRecommend>
          <FloorSelectorList onClick={selectFloor}>
            <FloorOptions className="floorName ">4F</FloorOptions>
            <FloorOptions className="floorName active">3F</FloorOptions>
          </FloorSelectorList>
        </div>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  width: 15%;
  height: 100%;
`;

const NowFloorWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NowFloorText = styled.div`
  font-size: 60px;
  font-weight: bold;
`;

const NowFloorInfor = styled.div``;

const AiRecommend = styled.div`
  & > img {
    width: 150px;
  }
`;

const FloorSelectorList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FloorOptions = styled.div`
  background-color: #a4a4a4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ececec;
  font-size: 40px;
  padding: 30px 50px;
`;

export default ApplySideMenu;
