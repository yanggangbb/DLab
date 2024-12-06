import { useState, useEffect } from "react";
import Header from "./components/Layouts/Header";
import MainPage from "./pages/MainPage";
import SideMenu from "./components/Layouts/SideMenu";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckPage from "./pages/CheckPage";
import MachineApplyPage from "./pages/MachineApplyPage";
import ApplyPage from "./pages/ApplyPage";
import AIPopup from "./components/Layouts/AIPopup";

const App = () => {
  const [openSide, setOpenSide] = useState(false);

  const openSideCtrl = () => {
    setOpenSide(!openSide);
  };

  const [openAIPop, setAIOpenPop] = useState(false);
  const openAIPopup = () => {
    setAIOpenPop(!openAIPop);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Header theme={true} openSideCtrl={openSideCtrl} />}>
            <Route path="/"></Route>
          </Route>
          <Route element={<Header theme={false} openSideCtrl={openSideCtrl} />}>
            <Route path="/check"></Route>
            <Route path="/apply"></Route>
            <Route path="/machineApply"></Route>
          </Route>
        </Routes>
        <AIPopup openBool={openAIPop} openPopup={openAIPopup}></AIPopup>
        <SideMenu
          openSide={openSide}
          openSideCtrl={openSideCtrl}
          openPopup={openAIPopup}
        />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/apply"
            element={<ApplyPage openAIPopup={openAIPopup} />}
          />
          <Route path="/check" element={<CheckPage />} />
          <Route path="/machineApply" element={<MachineApplyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
