import styled from "styled-components";
import { SectionsContainer, Section } from "react-fullpage";
import MainLinkSection from "../components/Layouts/MainLinkSection";
import { useState, useEffect, useRef } from "react";
import SideMenu from "../components/Layouts/SideMenu";

const MainPage = () => {
  const TextWrap = useRef(null);

  const [initialActiveSection, setInitialActiveSection] = useState(null);
  const onScroll = (p) => {
    if (initialActiveSection === null) setInitialActiveSection(p.activeSection);
  };

  let options = {
    scrollCallback: onScroll,
    anchors: ["sectionOne", "sectionTwo"],
    navigation: false,
  };

  return (
    <>
      <SectionsContainer {...options}>
        <FullPageSection backImg={"../src/assets/img/background.png"}>
          <MainTextWrap ref={TextWrap}>
            <p>대여와 실습이 필요한 순간</p>
            <p>
              <span>D</span>Lab에서 시작하세요
            </p>
            <p>디지털 실습실 대여와 노트북,태블릿 대여 서비스를 제공합니다.</p>
          </MainTextWrap>
          <img src="../src/assets/img/scroll.png" alt="" />
        </FullPageSection>

        <FullPageSection backImg={"../src/assets/img/backGra.png"}>
          <MainLinkWrap>
            <MainLinkSection
              LinkName={"실습실 신청"}
              LinkIntroduce={
                "실습실을 지도에서 확인하고, 원하는 곳을 선택하여 바로 신청합니다."
              }
              LinkImg={"../src/assets/img/Room.png"}
              LinkRouter={"신청하러가기 ▶"}
            />
            <MainLinkSection
              LinkName={"AI 기반 실습실 추천"}
              LinkIntroduce={
                "실습실에서 하고싶은 활동을 입력하면 AI 기반으로 최적의 실습실을 추천합니다."
              }
              LinkImg={"../src/assets/img/Ai.png"}
              LinkRouter={"추천받으러가기 ▶"}
            />
            <MainLinkSection
              LinkName={"노트북/태블릿 대여"}
              LinkIntroduce={
                "조교실에 가지 않고 간편하게 노트북/태블릿 대여를 신청합니다."
              }
              LinkImg={"../src/assets/img/Phone.png"}
              LinkRouter={"신청하러가기 ▶"}
            />
            <MainLinkSection
              LinkName={"신청조회"}
              LinkIntroduce={
                "호실, 학번으로 실습실 신청 현황 및 노트북/태블릿 대여 현황을 조회합니다."
              }
              LinkImg={"../src/assets/img/getList.png"}
              LinkRouter={"신청하러가기 ▶"}
            />
          </MainLinkWrap>
        </FullPageSection>
      </SectionsContainer>
    </>
  );
};

const FullPageSection = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${(props) => props.backImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: black;

  @keyframes scrollImage {
    0% {
      transform: translateY(0px);
    }

    100% {
      transform: translateY(-20px);
    }
  }
  & > img {
    width: 100px;
    position: absolute;
    bottom: 102vh;
    animation-name: scrollImage;
    animation-duration: 1s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
`;

const MainTextWrap = styled.div`
  width: 77%;
  font-family: "Noto Sans KR", serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > p {
    word-break: keep-all;
    opacity: 0;
    transition: all 1s ease-in-out;
    animation-name: shadeOn;
    animation-duration: 2s;
    animation-fill-mode: forwards;
  }
  & > p:nth-child(1) {
    font-size: 75px;
    font-weight: bold;
    color: white;
    animation-delay: 0.5s;
  }
  & > p:nth-child(2) {
    font-size: 75px;
    font-weight: bold;
    color: white;
    animation-delay: 1s;
    & > span {
      color: #0088ff;
    }
  }
  & > p:nth-child(3) {
    animation-delay: 1.5s;
    font-size: 40px;
    /* font-weight: bold; */
    color: white;
  }

  @keyframes shadeOn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

const MainLinkWrap = styled.div`
  width: 77%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
`;

export default MainPage;
