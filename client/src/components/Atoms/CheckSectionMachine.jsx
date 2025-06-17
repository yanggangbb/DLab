import React, { useState } from "react";
import styled from "styled-components";

const CheckSectionMachine = ({
  checkTitle,
  checkSubTitle,
  inputHint,
  itemList,
  apiEndpoint,
  queryParam,
}) => {
  const [query, setQuery] = useState(""); // 입력 값
  const [data, setData] = useState([]); // 조회 결과
  const [error, setError] = useState(null); // 에러 처리

  // 데이터 조회 함수
  const fetchData = async () => {
    if (!query) {
      setError("검색어를 입력하세요.");
      return;
    }

    try {
      const response = await fetch(`${apiEndpoint}?${queryParam}=${query}`);
      if (!response.ok) {
        throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
      }
      const result = await response.json();
      setData(result.applications || result.rentals || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData([]);
    }
  };

  const keyDownEvent = (e) => {
    // console.log(e.code);
    if (e.code === "Enter") {
      fetchData();
    }
  };

  return (
    <Wrap>
      <TitleWrap>
        <CheckTitle>{checkTitle} 신청 내역 조회</CheckTitle>
        <CheckSubTitle>{checkSubTitle} 조회 가능합니다</CheckSubTitle>
      </TitleWrap>

      <InputWrap>
        <CheckInput
          onKeyDown={keyDownEvent}
          placeholder={"ex) " + inputHint}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <CheckInputButton
          src="../src/assets/img/search.png"
          onClick={fetchData}
        />
      </InputWrap>

      <ItemNameListHeader>
        {itemList.map((el, index) => (
          <ItemNameListHeaderName key={index}>{el}</ItemNameListHeaderName>
        ))}
      </ItemNameListHeader>

      <ItemList>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {data.length > 0 ? (
          data.map((row, index) => (
            <ItemRow key={index}>
              <ItemData>{row.student_id || "N/A"}</ItemData> {/* 학번 */}
              <ItemData>{row.student_name || "N/A"}</ItemData> {/* 이름 */}
              <ItemData>{row.device_type || "노트북"}</ItemData> {/* 기기 */}
              <ItemData>{row.device_number || "-"}</ItemData> {/* 기기번호 */}
              <ItemData>{row.rental_date || "N/A"}</ItemData> {/* 대여일자 */}
              <ItemData>{row.return_date || "미반납"}</ItemData>{" "}
              {/* 반납일자 */}
            </ItemRow>
          ))
        ) : (
          <NoData>조회된 데이터가 없습니다.</NoData>
        )}
      </ItemList>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const CheckTitle = styled.div`
  font-size: 24px;
  color: black;
`;

const CheckSubTitle = styled.div`
  font-size: 18px;
  color: gray;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  padding: 0px 10px;
  border-radius: 100px;
  background-color: white;
  padding: 10px;
  border: 1px solid black;
`;

const CheckInput = styled.input`
  width: 90%;
  font-size: 20px;
  outline: none;
  border: none;
`;

const CheckInputButton = styled.img`
  width: 40px;
  height: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const ItemNameListHeader = styled.div`
  width: 70%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & > div:last-child {
    border: none;
  }
`;

const ItemNameListHeaderName = styled.div`
  font-size: 18px;
  height: 100%;
  width: 20%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid black;
`;

const ItemList = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ItemRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div:last-child {
    border: none;
  }
`;

const ItemData = styled.div`
  width: 20%;
  padding: 10px 0px;
  font-size: 18px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid black;
`;

const NoData = styled.div`
  font-size: 18px;
  color: gray;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  font-size: 16px;
  color: red;
  margin-top: 10px;
`;

export default CheckSectionMachine;
