import React from "react";
import styled from "styled-components";
import CheckSectionMachine from "../components/Atoms/CheckSectionMachine";
import CheckSectionRoom from "../components/Atoms/CheckSectionRoom";

const CheckPage = () => {
  return (
    <Wrap>
      <CheckSectionMachine
        checkTitle={"노트북/태블릿"}
        checkSubTitle={"학번/이름으로"}
        inputHint={"20501 ○○○"}
        itemList={["학번", "이름", "기기", "기기번호", "대여일자", "반납일자"]}
        apiEndpoint="http://127.0.0.1:5000/api/device_rentals"
        queryParam="student_id"
      />
      <Line />
      <CheckSectionRoom
        checkTitle={"실습실"}
        checkSubTitle={"호실로"}
        inputHint={"308호"}
        itemList={["학번", "이름", "사용일자", "시작시간", "퇴실시간"]}
        apiEndpoint="http://127.0.0.1:5000/api/lab_applications"
        queryParam="lab_id"
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 0px 50px;
  margin-top: calc(100vh - (100vh - 80px));
  height: calc(100vh - 80px);
  background-color: #fefefe;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Line = styled.div`
  width: 1px;
  height: 90%;
  background-color: black;
`;

export default CheckPage;
