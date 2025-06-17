import styled from "styled-components";

const Floor4 = ({ openInfor }) => {
  const clickRoom = (e) => {
    openInfor(e.target.title);
  };
  return (
    <>
      <img src="../src/assets/img/floor4.png" usemap="#image-map" />

      <map onClick={clickRoom} name="image-map">
        <area
          target=""
          alt="406"
          title="406"
          coords="1017,359,1125,360,1122,553,1014,550"
          shape="poly"
        />
        <area
          target=""
          alt="407"
          title="407"
          coords="1018,557,1119,561,1124,608,1136,614,1133,662,1039,705,1014,706"
          shape="poly"
        />
      </map>
    </>
  );
};

export default Floor4;
