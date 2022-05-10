import React, { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
const OtherComponent = lazy(() => import("./router"));

import { Provider } from "react-redux";

const App = () => {
  return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent />  
        </Suspense>
      </BrowserRouter>
  );
};

export default App;
