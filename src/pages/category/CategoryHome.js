import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCategory, getProductsByCat } from "../../CRUD/functions";
import Slider from "../../components/filtering/Slider";
import HomepageCard from "../../components/cards/HomepageCard";
import Disponibility from "../../components/filtering/Disponibility";
import Stars from "../../components/filtering/Stars";
import Brand from "../../components/filtering/Brand";
import Color from "../../components/filtering/Color";
import DropDown from "../../components/filtering/DropDown";

const CategoryHome = () => {
  const [category, setCategory] = useState();
  const [products, setProducts] = useState();

  let history = useHistory();
  let cat = history.location.pathname.split("/")[2];

  const getCategoryAndProducts = async () => {
    await getCategory(cat)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
    await getProductsByCat(cat)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategoryAndProducts();
  }, [cat]);

  return (
    <>
      {/* <div
        //Mic artificiu -- un div gol ca sa dai hover.
        className=" w-24 h-7 absolute cursor-pointer"
        style={{ top: "85px", left: "68px" }}
        onMouseEnter={() => {
          setType({ type: "absolute" });
        }}
        // onMouseLeave={() => setType("hidden")}
      ></div>
      <div>
        <MainBar type={type.type} setType={setType} />
      </div> */}
      <div className="w-full h-full flex bg-gray-200 justify-center">
        <div className="ml-20 mr-4 2xl:ml-32">
          {/* Aici e filtering */}
          <Disponibility setProducts={setProducts} category={category} />
          <Slider
            setProducts={setProducts}
            category={category && category._id}
          />
          <Stars setProducts={setProducts} category={category} />
          <Brand setProducts={setProducts} category={category} />
          <Color setProducts={setProducts} category={category} />
        </div>
        <div style={{ width: "1100px" }}>
          {/* Aici e panoul cu produse */}
          <div
            className="bg-white text-2xl text-black mb-1 mt-4 rounded"
            style={{ width: "1000px", height: "90px" }}
          >
            <div className="mb-2">
              <span className="pl-2"> {category && category.title}</span>
              <span className="px-2">
                {" "}
                {products && products.length} Produse
              </span>
            </div>
            <span>
              <DropDown setProducts={setProducts} category={category} />
            </span>
          </div>
          <div className="flex flex-wrap w-1/2 md:w-3/4 lg:w-full ">
            {products &&
              products.map((arg) => {
                return (
                  <HomepageCard
                    key={arg._id}
                    // id={arg._id}
                    // image={arg.images[0].url}
                    // description={arg.description}
                    // price={arg.price}
                    // oldPrice={arg.oldPrice}
                    // star={arg.ratingsandcomments}
                    // quantity={arg.quantity}
                    // slug={arg.slug}
                    isSearching={true}
                    product={arg && arg}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryHome;

/* <div className="text-lg text-gray-600">
          
        </div> */
