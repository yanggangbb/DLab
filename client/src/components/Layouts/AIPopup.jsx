import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import RoundButton from "../Atoms/RoundButton";

const AIPopup = ({ openBool, openPopup }) => {
  const [answerStat, setAnswerStat] = useState(false);
  const [aiAnswer, setAiAnswer] = useState("");  // AI 답변을 저장할 상태
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지를 저장할 상태
  const [activity, setActivity] = useState(""); // 활동명 상태

  const closePopup = (e) => {
    if (e.target.classList.contains("close")) {
      openPopup();
    }
    if (answerStat === true) {
      setAnswerStat(false);
      setAiAnswer("");  // 팝업 닫을 때 AI 답변 초기화
      setErrorMessage("");  // 오류 메시지 초기화
    }
  };

  const changeAnswerState = () => {
    setAnswerStat(!answerStat);
    if (!answerStat) {
      fetchAiAnswer();  // 신청하기 클릭 시 AI 답변 요청
    }
  };

  const handleInputChange = (e) => {
    setActivity(e.target.value); // 입력값을 상태에 저장
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/recommend-classroom", // FastAPI 엔드포인트
        { activity: activity }, // 활동명 전달
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // 서버에서 받은 'explanation' 값을 상태에 저장
      setAiAnswer(response.data.explanation);
      setErrorMessage(""); // 오류 메시지 초기화
    } catch (error) {
      console.error("Error submitting application:", error);
      setAiAnswer(""); // AI 답변 초기화
      setErrorMessage("답변을 불러오지 못했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Wrap className="close" onClick={closePopup} style={{ display: openBool ? "flex" : "none" }}>
      <ContentWrap>
        <RoomNumber>AI 기반 실습실 추천</RoomNumber>
        <form onSubmit={handleSubmit} style={{ gap: answerStat ? "0px" : "50px" }}>
          <FormWrap>
            <FormLabel>{!answerStat ? "실습실에서 하고 싶은 활동을 간단하게 입력해주세요" : "AI가 최적의 실습실을 찾은 결과입니다"}</FormLabel>
            <InputWrap style={{ display: answerStat ? "none" : "flex" }}>
              <input
                name="activity"
                placeholder="ex) 애플리케이션 개발"
                type="text"
                value={activity}
                onChange={handleInputChange} // 입력 변경 시 상태 업데이트
              />
            </InputWrap>
            <AnswerWrap style={{ display: answerStat ? "flex" : "none" }}>
              <AiAnswerWrap>
                <AiAnswer>
                  {errorMessage ? errorMessage : aiAnswer}
                </AiAnswer>
              </AiAnswerWrap>
              <div style={{ width: "100%" }}>
                <img style={{ width: "80px" }} src="../src/assets/img/AIChar.png" alt="ai" />
              </div>
            </AnswerWrap>
          </FormWrap>

          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
            <CancleButton className="close" onClick={closePopup} type="button">
              취소
            </CancleButton>
            <ApplyButton onClick={changeAnswerState} type="submit">
              신청하기
            </ApplyButton>
          </div>
        </form>
      </ContentWrap>
    </Wrap>
  );
};

const AnswerWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AiAnswer = styled.div`
  width: 85%;
  padding: 10px;
  min-height: 30px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background-color: #fcfcfc;
`;

const AiAnswerWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
  &::after {
    position: absolute;
    left: 80px;
    bottom: -11px;
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px 18px 0px 0px;
    border-color: #d9d9d9 transparent transparent transparent;
  }
`;

const CancleButton = styled.button`
  background-color: #ffffff;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  word-break: keep-all;
  outline: none;
  border: none;
`;

const ApplyButton = styled.button`
  background-color: #0088ff;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  word-break: keep-all;
  outline: none;
  border: none;
`;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  width: 100%;
  height: 100vh;
  background-color: #0000008b;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrap = styled.div`
  width: 30%;
  border-radius: 20px;
  background-color: #f5f5f5;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 20px;
  & > form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }
`;

const RoomNumber = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const FormWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > input {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
  }
`;

const FormLabel = styled.div`
  font-size: 20px;
  color: #3f3f3f;
  font-weight: bold;
`;

export default AIPopup;
