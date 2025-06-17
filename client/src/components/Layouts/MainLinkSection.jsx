import styled from "styled-components";

const MainLinkSection = ({ LinkName, LinkIntroduce, LinkImg, LinkRouter }) => {
  return (
    <>
      <Wrap>
        <h2>{LinkName}</h2>
        <p>{LinkIntroduce}</p>
        <img src={LinkImg} alt="이미지" />
        <span>{LinkRouter}</span>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  line-height: 1.3;
  color: white;
  font-family: "Noto Sans KR", serif;
  transition: all 0.5s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: translatey(-10px);
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(7.6px);
    -webkit-backdrop-filter: blur(7.6px);
  }
  & > h2 {
    width: 100%;
    font-size: 30px;
    font-weight: bold;
  }
  & > p {
    font-size: 20px;
    margin-bottom: 15px;
  }
  & > img {
    height: 80px;
    margin-bottom: 50px;
  }
  & > span {
    width: 100%;
    text-align: end;
  }
`;

export default MainLinkSection;
