import React from "react";
import MainBar from "../../components/main/MainBar";
import SubBar from "../../components/main/SubBar";
import HeroImg from "../../components/main/HeroImg/HeroImg";
import HomeItems from "../../components/items/HomeItems";

// import { BURGER_OFF } from "../../redux/propDrilling/prop-types";

const Home = () => {
  // const burger = useSelector((state) => state.propsD.burger);

  const setShow = () => {};
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-200 ">
      <div className="w-full flex justify-center " style={{ height: "310px" }}>
        <div className="relative">
          <>
            <div
              style={{ top: "0px", left: "62px" }}
              className="absolute z-10 w-full"
            >
              <MainBar setShow={setShow} />
            </div>
          </>
        </div>
        <HeroImg />
      </div>
      <div className="w-full flex items-center justify-center my-4">
        <SubBar />
      </div>
      <div>
        <HomeItems category="phones" title="Telefoane Mobile" />
      </div>
      <div>
        <HomeItems category="laptops" title="Laptopuri" />
      </div>
      {/* <div>
        <RatingsAndCommentsModal />
      </div>
      <div>
        <Link to="/category/phones">Fck</Link>
      </div> */}
    </div>
  );
};

export default Home;
