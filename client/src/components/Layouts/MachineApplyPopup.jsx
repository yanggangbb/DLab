import styled from "styled-components";
import { useState, useEffect } from "react"; // useEffect 추가
import axios from "axios";
import RoundButton from "../Atoms/RoundButton";

const MachineApplyPopup = ({ openBool, openPopup }) => {
  // 오늘 날짜를 "YYYY-MM-DD" 형식으로 설정
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const closePopup = (e) => {
    if (e.target.className) {
      openPopup();
    }
  };

  const [formData, setFormData] = useState({
    student_id: "",
    student_name: "",
    device_type: "",
    rental_date: getTodayDate(), // 오늘 날짜로 초기화
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/submit_device_rental", 
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message); // 성공 메시지 출력
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("신청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Wrap
        className="close"
        onClick={closePopup}
        style={{ display: openBool ? "flex" : "none" }}
      >
        <ContentWrap>
          <RoomNumber>기기 대여신청</RoomNumber>
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
              <FormLabel>기기를 선택해주세요</FormLabel>
              <RadioWrap>
                <div>
                  <input
                    type="radio"
                    name="device_type"
                    value="노트북"
                    checked={formData.device_type === "노트북"}
                    onChange={handleChange}
                  />
                  <label htmlFor="labtop">노트북</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="device_type"
                    value="태블릿"
                    checked={formData.device_type === "태블릿"}
                    onChange={handleChange}
                  />
                  <label htmlFor="tablit">태블릿</label>
                </div>
              </RadioWrap>
            </FormWrap>

            <DangerText>
              대여 기기의 파손, 고장, 분실 등의 피해가 발생한 경우에는 대여
              가정에서 책임 및 비용 부담의 의무가 있으니 고려하여 신청 바랍니다.
            </DangerText>
            <div>
              <label htmlFor="dangerTextCheck">
                확인하였습니다<sup style={{ color: "red" }}>*</sup>
              </label>
              <input type="checkbox" id="dangerTextCheck" />
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <RoundButton
                className="close"
                onClick={closePopup}
                WhiteColor={true}
                Text={"취소"}
              />
              <RoundButton
                type="submit"
                WhiteColor={false}
                Text={"신청하기 "}
              />
            </div>
          </form>
        </ContentWrap>
      </Wrap>
    </>
  );
};

const RadioWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  margin: 10px 0px;
`;

const DangerText = styled.div`
  width: 100%;
  font-size: 14px;
  color: #797979;
`;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  background-color: #0000008b;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrap = styled.div`
  position: absolute;
  z-index: 10100;
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

export default MachineApplyPopup;
