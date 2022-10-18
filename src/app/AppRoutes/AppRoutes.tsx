import { Route, Routes } from "react-router-dom";
import { appRoutes } from "src/config/routes";
import { Home } from "src/pages/Home";
import { Result } from "src/pages/Result";

export  function AppRoutes() {
  return (
    <Routes>
      <Route path={appRoutes.home} element={<Home />}/>
      <Route path={appRoutes.result} element={<Result />}/>
    </Routes>
  )
}
