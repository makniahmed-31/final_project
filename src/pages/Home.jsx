import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";
import Footer from "../components/nav/Footer";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center ">
        <Jumbotron
          text={[
            "Latest HighTech",
            "Latest Products",
            "New Arrivals",
            "Best Sellers",
            "M@k_Shop NewTech",
          ]}
        />
      </div>
      <h4 className="text-center p-3 mt-5 display-4 jumbotron">New Arrivals</h4>
      <NewArrivals />
      <h4 className="text-center p-3 mt-5 display-4 jumbotron">Best Sellers</h4>
      <BestSellers />
      <br />
      <br />
      <Footer/>
    </>
  );
};

export default Home;
