import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FC } from "react";
import ApplicationPage from "./components/ApplicationPage";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-edit-form" element={<ApplicationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
