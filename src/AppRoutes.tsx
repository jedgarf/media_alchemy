import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import Home from "./Pages/Home";
import FBMain from "./Pages/Facebook/FBMain";
import AboutUs from "./Pages/AboutUs";
import Unavailable from "./Pages/Unavailable";

type CustomPageProps = {
  pageName: string,
  page: React.ReactElement
}

const CustomPage: React.FC<CustomPageProps> = ({ pageName, page }) => {
  return <><Header pageName={pageName}/>{page}<Footer/></>
}

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<CustomPage pageName={'youtube'} page={<Home/>}/>} />
      <Route path='/facebook' element={<CustomPage pageName={'facebook'} page={<FBMain/>}/>} />
      <Route path='/about_us' element={<CustomPage pageName={'about_us'} page={<AboutUs/>}/>} />
      <Route path='/unavailable' element={<CustomPage pageName={'unavailable'} page={<Unavailable/>}/>} />
    </Routes>
  );
}

export default AppRoutes;
