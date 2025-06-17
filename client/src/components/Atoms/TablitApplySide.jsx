import styled from "styled-components";
import RoundButton from "./RoundButton";

const TablitApplySide = ({ openBool, openPopup, checkOption }) => {
  const openPopupApply = () => {
    openPopup();
    checkOption("tablit");
  };
  return (
    <>
      <Wrap
        style={{
          width: openBool && "380px",
          height: openBool && "450px",
          boxShadow: openBool && "5px 5px 5px 5px #88888889",
        }}
      >
        <ContentWrap>
          <div>
            <TextWrap>
              <Title>태블릿</Title>
              <SubTitle>
                대여 태블릿의 기종, 성능 등에 대한 설명입니다.
              </SubTitle>
            </TextWrap>
            <LabTopInfor>
              <LabTopInforText>- 기종 : 갤럭시 탭 S6 Lite</LabTopInforText>
              <LabTopInforText>- 메모리 : 4GB</LabTopInforText>
              <LabTopInforText>
                - 디스플레이 : 10.4인치 5:3 비율 2000 * 1200
              </LabTopInforText>
              <LabTopInforText>- 충전타입 : C-Type</LabTopInforText>
              <LabTopInforText>
                - 규격 : 154.3 * 244.5 * 7.0mm, 5365g
              </LabTopInforText>
              <LabTopInforText>- 기타 : S펜 지원</LabTopInforText>
            </LabTopInfor>
          </div>
          <ButtonWrap>
            <ApplyButton onClick={openPopupApply}>신청하기</ApplyButton>
            <CheckButton>신청현황 조회</CheckButton>
          </ButtonWrap>
        </ContentWrap>
      </Wrap>
    </>
  );
};

const ApplyButton = styled.button`
  background-color: #0088ff;
  color: white;
  outline: none;
  border: none;
  border-radius: 200px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
`;

const CheckButton = styled.button`
  background-color: white;
  color: black;
  outline: none;
  border: none;
  border-radius: 200px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
`;

const Wrap = styled.div`
  transition: all 0.5s ease-in-out;
  width: 0px;
  height: 0px;
  background-color: #f6f6f6;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const ContentWrap = styled.div`
  width: 80%;
  height: 85%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  & > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }
`;
const TextWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
const Title = styled.div`
  width: 100%;
  font-size: 36px;
  color: black;
  font-weight: bold;
`;
const SubTitle = styled.div`
  width: 100%;
  font-size: 14px;
  color: #797979;
`;

const LabTopInfor = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 10px;
`;

const LabTopInforText = styled.div`
  word-break: keep-all;
  color: #202020;
`;

const ButtonWrap = styled.div`
  width: 100%;
  gap: 12px;
  display: flex;
  justify-content: end;
  align-items: center;
  & > button {
    cursor: pointer;
  }
`;

export default TablitApplySide;
