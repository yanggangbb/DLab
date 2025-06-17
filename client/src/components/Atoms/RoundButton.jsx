import styled from "styled-components";

const RoundButton = ({ btnType, WhiteColor, Text, openPopupHandler }) => {
  const openPopup = () => {
    openPopupHandler();
  };
  return (
    <>
      <Wrap
        type={btnType}
        onClick={openPopup}
        style={{
          backgroundColor: WhiteColor ? "white" : "#0088FF",
          color: WhiteColor ? "black" : "white",
        }}
      >
        {Text}
      </Wrap>
    </>
  );
};

const Wrap = styled.button`
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

export default RoundButton;
