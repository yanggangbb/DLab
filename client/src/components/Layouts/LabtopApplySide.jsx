import styled from "styled-components";
import RoundButton from "../Atoms/RoundButton";

const LabtopApplySide = ({ openBool, openPopup }) => {
  const openPopupApply = () => {
    openPopup();
  };

  return (
    <>
      <Wrap style={{ width: openBool && "380px", height: openBool && "450px" }}>
        <ContentWrap>
          <div>
            <TextWrap>
              <Title>노트북</Title>
              <SubTitle>
                대여 노트북의 기종, 성능 등에 대한 설명입니다.
              </SubTitle>
            </TextWrap>
            <LabTopInfor>
              <LabTopInforText>
                - 기종 : HP 2024 파빌리온 에어로 13 라이젠7 라이젠 7000
              </LabTopInforText>
              <LabTopInforText>- 운영체제 : Windows11</LabTopInforText>
              <LabTopInforText>- 메모리 : 16GB</LabTopInforText>
              <LabTopInforText>- 저장장치 : 1TB</LabTopInforText>
              <LabTopInforText>
                - 크기/무게 : 297.6(가로) * 209(세로) * 16.9(높이)mm / 최대 990g
              </LabTopInforText>
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
`;

const CheckButton = styled.button`
  background-color: white;
  color: black;
  outline: none;
  border: none;
  border-radius: 200px;
  padding: 10px 20px;
  font-size: 16px;
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

export default LabtopApplySide;
