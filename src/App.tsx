import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FC } from "react";
import ApplicationPage from "./components/ApplicationPage";
import ApplicationStatus from "./components/ApplicationStatus";

const App: FC = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/form' element={<ApplicationPage />} />
      <Route path="/status" element={<ApplicationStatus />} />
    </Routes>
  </BrowserRouter>
};

export default App;