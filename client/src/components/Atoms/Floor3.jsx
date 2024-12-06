import { useRef } from "react";
import styled from "styled-components";

const Floor3 = ({ openInfor }) => {
  const clickRoom = (e) => {
    openInfor(e.target.title);
  };

  return (
    <>
      <img src="../src/assets/img/floor3.png" useMap="#image-map" />
      <map onClick={clickRoom} name="image-map">
        <area
          target=""
          alt="302"
          title="302"
          coords="239,153,449,154,451,264,239,264"
          shape="poly"
        />
        <area
          target=""
          alt="305"
          title="305"
          coords="614,158,788,156,788,265,615,266"
          shape="poly"
        />
        <area
          target=""
          alt="306"
          title="306"
          coords="796,157,974,159,977,266,797,268"
          shape="poly"
        />
        <area
          target=""
          alt="307"
          title="307"
          coords="535,3,722,4,718,106,530,106"
          shape="poly"
        />
        <area
          target=""
          alt="308"
          title="308"
          coords="727,5,899,4,903,105,726,105"
          shape="poly"
        />
        <area
          target=""
          alt="309"
          title="309"
          coords="979,365,1111,365,1107,556,979,554"
          shape="poly"
        />
        <area
          target=""
          alt="310"
          title="310"
          coords="942,560,1105,557,1108,619,1137,619,1136,662,1014,713,944,711"
          shape="poly"
        />
      </map>
    </>
  );
};

export default Floor3;
