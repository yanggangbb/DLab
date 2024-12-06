import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RoundButton from "./RoundButton";

const RoomInfor = ({ selectRoom, openPopupHandler }) => {
  const [roomData, setRoomData] = useState(null); // 방 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // API 호출: 방 정보 가져오기
  useEffect(() => {
    if (selectRoom) {
      setLoading(true);
      setError(null);

      fetch(`http://localhost:5000/computer/${selectRoom}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Data not found");
          }
          return response.json();
        })
        .then((data) => {
          setRoomData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [selectRoom]);

  return (
    <Wrap
      style={{
        width: selectRoom && "400px",
        boxShadow: selectRoom && "5px 5px 5px 5px #88888889",
      }}
    >
      <ContentWrap>
        <TextWrap>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <RoomNumber>
              <p>{selectRoom}호</p>
            </RoomNumber>
            <SubTitle>
              {selectRoom}호의 컴퓨터 대수, 성능 등에 대한 정보입니다.
            </SubTitle>
          </div>

          <InforWrap>
            {loading ? (
              <>
                <InforText>-CPU : 불러오는 중...</InforText>
                <InforText>-GPU : 불러오는 중...</InforText>
                <InforText>-메모리 : 불러오는 중...</InforText>
                <InforText>-디스크 : 불러오는 중...</InforText>
                <InforText>-설치 프로그램 : 불러오는 중...</InforText>
                <InforText>-설치 언어 : 불러오는 중...</InforText>
                <InforText>-특이사항 : 불러오는 중...</InforText>
                <InforText>-컴퓨터 개수 : 불러오는 중...</InforText>
              </>
            ) : error ? (
              <InforText>오류: {error}</InforText>
            ) : (
              <>
                <InforText>-CPU : {roomData.cpu || "정보 없음"}</InforText>
                <InforText>-GPU : {roomData.gpu || "정보 없음"}</InforText>
                <InforText>-메모리 : {roomData.memory || "정보 없음"}</InforText>
                <InforText>-디스크 : {roomData.disk || "정보 없음"}</InforText>
                <InforText>
                  -설치 프로그램 : {roomData.program || "정보 없음"}
                </InforText>
                <InforText>
                  -설치 언어 : {roomData.language || "정보 없음"}
                </InforText>
                <InforText>-특이사항 : {roomData.notes || "정보 없음"}</InforText>
                <InforText>
                  -컴퓨터 개수 : {roomData.count || "정보 없음"}
                </InforText>
              </>
            )}
          </InforWrap>
        </TextWrap>

        <ButtonWrap>
          <RoundButton
            openPopupHandler={openPopupHandler}
            WhiteColor={true}
            Text={"신청하기"}
          />
          <RoundButton WhiteColor={false} Text={"신청현황 조회"} />
        </ButtonWrap>
      </ContentWrap>
    </Wrap>
  );
};

const InforWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 10px;
`;

const InforText = styled.div`
  font-size: 20px;
`;

const SubTitle = styled.div`
  width: 100%;
  font-size: 14px;
  color: #797979;
`;

const Wrap = styled.div`
  transition: all 1s ease-in-out;
  width: 0px;
  height: 100%;
  background-color: #f6f6f6;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const ContentWrap = styled.div`
  width: 90%;
  height: 95%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const RoomNumber = styled.div`
  width: 100%;
  font-size: 36px;
  color: black;
  font-weight: bold;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 30px;
`;

const ButtonWrap = styled.div`
  width: 100%;
  gap: 12px;
  display: flex;
  justify-content: end;
  align-items: center;
`;

export default RoomInfor;
