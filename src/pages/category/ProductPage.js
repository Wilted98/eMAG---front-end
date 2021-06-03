import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getProductBySlug } from "../../CRUD/functions";
import logo from "../../components/main/HeroImg/95484.webp";
import Head from "../../components/productpage/Head";
import StickyBar from "../../components/productpage/StickyBar";
import Body from "../../components/productpage/Body";
import Specifications from "../../components/productpage/Specifications";
import Rating from "../../components/productpage/Rating";
import HomeItems from "../../components/items/HomeItems";

// //MainBar imports
// import MainBar from "../../components/main/MainBar";
// import { useSelector, useDispatch } from "react-redux";
// import { BURGER_OFF } from "../../redux/propDrilling/prop-types";
// //MainBar imports

const ProductPage = () => {
  const history = useHistory();
  const [html, setHtml] = useState(null);
  const [product, setProduct] = useState(null);
  let cat = history.location.pathname.split("/")[1];
  const [img, setImg] = useState(null);

  // //Main Bar Props
  // const burger = useSelector((state) => state.propsD.burger);
  // const [type, setType] = useState({ type: "hidden" });
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   burger === "on" &&
  //     dispatch({ type: BURGER_OFF, payload: { burger: "off" } });
  // }, []);
  // //Main Bar Props
  const getProduct = async () => {
    await getProductBySlug(cat)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getProduct();
    setHtml(null);
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
      ></div> */}
      <StickyBar product={product && product} />
      {/* <div>
        <MainBar type={type.type} setType={setType} />
      </div> */}
      <div className="">
        <div className="">
          <img className="h-24 object-cover w-full" src={logo} alt="fck" />

          <Head
            // title={product && product.title}
            // images={product && product.images}
            // star={product && product.ratingsandcomments}
            // oldPrice={product && product.oldPrice}
            // price={product && product.price}
            // quantity={product && product.quantity}
            product={product && product}
            img={img}
            setImg={setImg}
          />
        </div>
        <div className="flex justify-center bg-gray-200">
          <div onClick={() => setImg()} className=" pt-1 pb-8 ">
            {product && (
              <HomeItems
                category={product.category.slug}
                title="Iti mai recomandam si"
              />
            )}
          </div>
        </div>
        <div className="mt-24">
          <Body
            id={product && product._id}
            title={product && product.title}
            html={html}
            setHtml={setHtml}
          />
        </div>
        <div className="mt-24">
          <Specifications productId={product && product._id} />
        </div>
        <div className="mt-24">
          <Rating product={product && product} getProduct={getProduct} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
