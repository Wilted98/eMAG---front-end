import React, { useState, useEffect } from "react";
import { getSpecs } from "../../CRUD/functions";

const Specifications = ({ productId }) => {
  const [data, setData] = useState();

  const gettingSpecs = async () => {
    await getSpecs({ productId })
      .then((res) => {
        setData(res.data.specs);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    gettingSpecs();
  }, [productId]);
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full h-10 bg-gray-300 "></div>

      <div className="flex flex-col  mr-48">
        <div className="mt-12 text-2xl text-gray-600 tracking-tight">
          Specificatii
        </div>
        {data &&
          data.map((arg, index) => {
            return (
              <div key={index} className="mb-12 mt-5">
                <span className="text-gray-800 font-bold text-sm">
                  {arg.title}
                </span>
                <div className="flex flex-col mt-2">
                  {arg.specification.map((spec, index) => {
                    return (
                      <div className="flex" key={index}>
                        <span
                          className={`text-gray-400 p-2 w-96 flex text-base ${
                            index % 2 === 0 && "bg-blue-50"
                          }`}
                        >
                          {spec.sTitle}
                        </span>
                        <span
                          className={`flex flex-col w-600 justify-center ${
                            index % 2 === 0 && "bg-blue-50"
                          }`}
                        >
                          {spec.spec.map((item, index) => {
                            return (
                              <span
                                key={index}
                                className="text-base tracking-tight"
                              >
                                {item}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Specifications;

{
  /* <span className="flex flex-col ml-24">
                          {spec.spec.map((item, index) => {
                            return (
                              <div key={index} className="my-0.5">
                                {item}
                              </div>
                            );
                          })}
                        </span>
                      </span> */
}
