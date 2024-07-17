import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplicationPage from "./pages/ApplicationPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-edit-form" element={<ApplicationPage />} />
    </Routes>
  );
};

export default Router;
