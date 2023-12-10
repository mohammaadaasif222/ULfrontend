import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { Suspense } from "react";

const Home = React.lazy(() => import("./pages/Home"));
const News = React.lazy(() => import("./pages/News"));
import Header from "./components/Header";

import Loader from "./components/Loader";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:newsId" element={<News />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
