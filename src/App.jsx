import React from "react";
import SignUp from "./components/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ForgotPW from "./components/ForgotPW";
import ResetPw from "./components/ResetPw";

import ProtectedRoutes from "./components/protectedroutes/protected-routes";
import ProtectedLogin from "./components/protectedroutes/protected-login";
import BoardFeat from "./components/Pages/Board";
import PostExplore from "./components/Pages/PostExplore";
import BoardList from "./components/Pages/BoardList";
import Profile from "./components/Pages/Profile";
import MyOrganisation from "./components/MyOrganisation";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <MyOrganisation />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/board"
          element={
            <ProtectedRoutes>
              <BoardFeat />
            </ProtectedRoutes>
          }
        ></Route>{" "}
        <Route
          path="/login"
          element={
            <ProtectedLogin>
              <Login />
            </ProtectedLogin>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        ></Route>
        <Route path="/board-list" element={<BoardList />}></Route>
        <Route path="/postexplore" element={<PostExplore />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/forgotPW" element={<ForgotPW />}></Route>
        <Route path="/ResetPassword" element={<ResetPw />}></Route>
      </Routes>
    </>
  );
};

export default App;
