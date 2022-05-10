import React, { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
const OtherComponent = lazy(() => import("./router"));

import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
