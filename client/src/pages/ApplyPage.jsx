import styled from "styled-components";
import ApplySideMenu from "../components/Atoms/ApplySideMenu";
import Floor3 from "../components/Atoms/Floor3";
import RoomImage from "../components/Atoms/RoomImage";
import RoomInfor from "../components/Atoms/RoomInfor";
import { useEffect, useRef, useState } from "react";
import ApplyPopup from "../components/Layouts/ApplyPopup";

const ApplyPage = ({ openAIPopup }) => {
  const [selectRoom, setSelectRoom] = useState("");
  const openAi = () => {
    openAIPopup();
  };

  const contentWrap = useRef(null);
  const openInfor = (number) => {
    setSelectRoom(number);
  };

  const [openPop, setOpenPop] = useState(false);
  const openPopup = () => {
    setOpenPop(!openPop);
  };

  useEffect(() => {
    if (selectRoom) {
      contentWrap.current.style.gap = "20px";
    }
  });

  return (
    <>
      <Wrap>
        <ApplyPopup
          openBool={openPop}
          openPopup={openPopup}
          selectRoom={selectRoom}
        />
        <ContentWrap ref={contentWrap}>
          <ApplySideMenu openAIPopup={openAi} />
          <Floor3 openInfor={openInfor} />
          <RoomInfor openPopupHandler={openPopup} selectRoom={selectRoom} />
          <RoomImage selectRoom={selectRoom} />
        </ContentWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  position: relative;
  top: calc(100vh - (100vh - 80px));
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

const ContentWrap = styled.div`
  transition: all 1s ease-in-out;
  position: relative;
  width: 85%;
  height: 90%;
  background-color: white;
  gap: 120px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

export default ApplyPage;
