import styled from "styled-components";

const RoomImage = ({ selectRoom }) => {
  return (
    <>
      <Wrap
        style={{ right: selectRoom && "45%" }}
        backImg={
          selectRoom == "308"
            ? "../src/assets/img/308.png"
            : selectRoom == "309"
            ? "../src/assets/img/309.jpg"
            : "../src/assets/img/LoadingRoom.png"
        }
      />
    </>
  );
};

const Wrap = styled.div`
  transition: all 1s ease-in-out;
  position: absolute;
  bottom: 10%;
  right: 35%;
  display: block;
  background-color: aliceblue;
  width: 650px;
  height: 350px;
  background-image: url(${(props) => props.backImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export default RoomImage;
