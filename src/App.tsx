import { BrowserRouter } from "react-router-dom";
import { FC } from "react";
import Router from "./Router";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
