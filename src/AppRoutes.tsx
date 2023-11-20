import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";

type CustomPageProps = {
  page: React.ReactElement
}

const CustomPage: React.FC<CustomPageProps> = ({ page }) => {
  return <><Header/>{page}<Footer/></>
}

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<CustomPage page={<Home/>}/>} />
      <Route path='/about_us' element={<CustomPage page={<AboutUs/>}/>} />
    </Routes>
  );
}

export default AppRoutes;
