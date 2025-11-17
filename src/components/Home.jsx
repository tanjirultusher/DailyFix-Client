import React, { useEffect } from 'react';
import PopularServices from './PopularServices';
import DiscountBanner from './DiscountBanner';
import ServiceSlider from './ServiceSlider';
import WhyChooseUs from './WhyChooseUs';
import DailyFixNumbers from './DailyFixNumders';

const Home = () => {

  useEffect(()=>{
    document.title = "Home";
  })
  return (
    <>
    <DiscountBanner></DiscountBanner>
    <ServiceSlider></ServiceSlider>
    <PopularServices></PopularServices>
    <DailyFixNumbers></DailyFixNumbers>
    <WhyChooseUs></WhyChooseUs>
    </>
  );
};

export default Home;