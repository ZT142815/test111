import React, {lazy, Suspense} from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import route from "./routes";

const Router = () => {
  return (
    <Routes>
      {route.map((item) => {
         return <Route key={item.path} path={item.path} element={item.component} exact={item.exact}  />
      })}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;
