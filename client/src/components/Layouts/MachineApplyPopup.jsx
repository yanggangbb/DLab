import styled from "styled-components";
import { useState, useEffect, useRef } from "react"; // useEffect 추가
import axios from "axios";

const MachineApplyPopup = ({ option, openBool, openPopup }) => {
  // 오늘 날짜를 "YYYY-MM-DD" 형식으로 설정
  const [submitState, setSubmitState] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(false); // 체크박스 상태
  const MachineWrap = {
    labtop: useRef(null),
    tablit: useRef(null),
  };

  const submitStateHandler = () => {
    setSubmitState(!submitState);
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const closePopup = (e) => {
    if (e.target.classList.contains("close")) {
      setFormData({
        student_id: "",
        student_name: "",
        device_type: "",
        rental_date: getTodayDate(),
      });
      setCheckboxChecked(false);
      openPopup();
    }
  };

  const [formData, setFormData] = useState({
    student_id: "",
    student_name: "",
    device_type: "",
    rental_date: getTodayDate(), // 오늘 날짜로 초기화
  });

  useEffect(() => {
    if (option == "labtop") {
      MachineWrap.labtop.current.checked = true;
      formData.device_type = "노트북";
    } else {
      MachineWrap.tablit.current.checked = true;
      formData.device_type = "태블릿";
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setCheckboxChecked(e.target.checked); // 체크박스 상태 업데이트
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 공백 체크: 학번, 이름, 기기 선택이 모두 입력되어야만 제출 가능
    if (
      !formData.student_id ||
      !formData.student_name ||
      !checkboxChecked // 체크박스가 체크되어야만 제출
    ) {
      alert("모든 필드를 입력해주세요.");
      return; // 필드가 비어있으면 제출하지 않음
    }
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
      submitStateHandler();
      openPopup();
      setSubmitState(true);

      // 제출 후 상태 초기화
      setFormData({
        student_id: "",
        student_name: "",
        device_type: "",
        rental_date: getTodayDate(),
      });
      setCheckboxChecked(false); // 체크박스 초기화
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("신청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Wrap style={{ display: openBool && submitState ? "flex" : "none" }}>
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
                    ref={MachineWrap.labtop}
                    id="labtop"
                    type="radio"
                    name="device_type"
                    value="노트북"
                    onChange={handleChange}
                  />
                  <label htmlFor="labtop">노트북</label>
                </div>
                <div>
                  <input
                    ref={MachineWrap.tablit}
                    id="tablit"
                    type="radio"
                    name="device_type"
                    value="태블릿"
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
              <input
                type="checkbox"
                id="dangerTextCheck"
                checked={checkboxChecked}
                onChange={handleCheckboxChange} // 체크박스 상태 관리
              />
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
              <CancleButton
                type="button"
                className="close"
                onClick={closePopup}
              >
                취소
              </CancleButton>
              <SubmitButton type="submit" className="close">
                신청하기
              </SubmitButton>
            </div>
          </form>
        </ContentWrap>
      </Wrap>
    </>
  );
};

const SubmitButton = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  word-break: keep-all;
  outline: none;
  border: none;
  background-color: #0088ff;
  color: white;
`;

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
`;

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
