import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import RoundButton from "../Atoms/RoundButton";

const ApplyPopup = ({ openBool, openPopup, selectRoom }) => {
  const [openPop, setOpenPopup] = useState(true);

  const openPopHandler = () => {
    setOpenPopup(!openPop);
  };
  const closePopup = (e) => {
    console.log(e.target.classList.contains("close"));
    if (e.target.classList.contains("close")) {
      console.log(openPop);
      openPopup();
    }
  };

  const [formData, setFormData] = useState({
    student_id: "",
    student_name: "",
    purpose: "",
    lab_id: "",
    date: "",
    start_time: "",
    end_time: "",
  });

  formData.lab_id = selectRoom;
  // console.log(formData)
  // console.log(selectRoom)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { student_id, student_name, purpose, date, start_time, end_time } =
      formData;

    // 빈 값이 있는지 확인
    if (
      !student_id ||
      !student_name ||
      !purpose ||
      !date ||
      !start_time ||
      !end_time
    ) {
      alert("모든 필드를 입력해주세요.");
      return; // 빈 필드가 있을 경우 제출을 막음
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/submit_lab_application", // Flask endpoint
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message); // Success message from Flask

      // 폼 제출 성공 후 팝업 닫기
      openPopHandler();
      openPopup();
      setOpenPopup(true);
      // 폼 데이터 초기화
      setFormData({
        student_id: "",
        student_name: "",
        purpose: "",
        lab_id: selectRoom, // selectRoom은 이미 설정된 값이므로 그대로 유지
        date: "",
        start_time: "",
        end_time: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("신청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Wrap style={{ display: openBool && openPop ? "flex" : "none" }}>
      <ContentWrap>
        <RoomNumber>{selectRoom}호 사용신청</RoomNumber>
        <form onSubmit={handleSubmit}>
          <FormWrap>
            <FormLabel>학번을 입력해주세요</FormLabel>
            <InputWrap>
              <input
                name="student_id"
                placeholder="ex) 20501"
                type="text"
                value={formData.student_id}
                onChange={handleChange}
              />
            </InputWrap>
          </FormWrap>
          <FormWrap>
            <FormLabel>이름을 입력해주세요</FormLabel>
            <InputWrap>
              <input
                name="student_name"
                placeholder="ex) 홍길동"
                type="text"
                value={formData.student_name}
                onChange={handleChange}
              />
            </InputWrap>
          </FormWrap>
          <FormWrap>
            <FormLabel>실습실에서 진행할 용무를 적어주세요</FormLabel>
            <InputWrap>
              <input
                name="purpose"
                placeholder="ex) 웹앱경진대회 개발"
                type="text"
                value={formData.purpose}
                onChange={handleChange}
              />
            </InputWrap>
          </FormWrap>
          <FormWrap>
            <FormLabel>실습실을 사용할 날짜와 시간을 선택해주세요</FormLabel>
            <InputWrap>
              <input
                name="date"
                placeholder="날짜 (예: 2024/12/10)"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </InputWrap>
            <InputWrap>
              <input
                name="start_time"
                placeholder="시작 시간 (예: 17:00)"
                type="time"
                value={formData.start_time}
                onChange={handleChange}
              />
            </InputWrap>
            <InputWrap>
              <input
                name="end_time"
                placeholder="종료 시간 (예: 19:00)"
                type="time"
                value={formData.end_time}
                onChange={handleChange}
              />
            </InputWrap>
          </FormWrap>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <CancleButton type="button" className="close" onClick={closePopup}>
              취소
            </CancleButton>
            <ApplyButton type="submit" className="close">
              신청하기
            </ApplyButton>
          </div>
        </form>
      </ContentWrap>
    </Wrap>
  );
};

const CancleButton = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  word-break: keep-all;
  outline: none;
  border: none;
  color: black;
  background-color: #fff;
`;

const ApplyButton = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  word-break: keep-all;
  outline: none;
  border: none;
  color: white;
  background-color: #0088ff;
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
  gap: 40px;
  & > form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 20px;
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

export default ApplyPopup;
