import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./ExtendedSearch.css";
import { AiOutlineClose } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { SEARCH_QUERY } from "../../../redux/search/search-types";
import { GoGraph } from "react-icons/go";
import { Link } from "react-router-dom";
import { fetchProductsByFilter } from "../../../CRUD/functions";

const ExtendedSearch = ({ open, setOpen, stickyBar }) => {
  const initialState = [
    {
      id: "1",
      title: "telefon apple",
      link: "/category/phones",
    },
    {
      id: "2",
      title: "laptop lenovo",
      link: "/category/phones",
    },
    {
      id: "3",
      title: "apple macbook",
      link: "/category/phones",
    },
    {
      id: "4",
      title: "apple macbook",
      link: "/category/phones",
    },
    {
      id: "5",
      title: "apple macbook",
      link: "/category/phones",
    },
    {
      id: "6",
      title: "apple macbook",
      link: "/category/phones",
    },
  ];
  const [popular, setPopular] = useState(initialState);
  const [filtered, setFiltered] = useState();
  const history = useHistory();
  const [word, setWord] = useState("");
  // const dispatch = useDispatch();
  // const { search } = useSelector((state) => ({ ...state }));
  // const { text } = search;

  const handleChange = (e) => {
    setPopular();
    // dispatch({
    //   type: SEARCH_QUERY,
    //   payload: { text: e.target.value },
    // });
    setWord(e.target.value);
  };

  const removeQuery = () => {
    // dispatch({
    //   type: SEARCH_QUERY,
    //   payload: { text: "" },
    // });
    setWord("");
  };
  React.useEffect(() => {
    setFiltered([]);
    if (!word) {
      removeQuery();
      setPopular(initialState);
    }
    const delayed = setTimeout(() => {
      searchItems({ query: word });
    }, 1000);
    return () => clearTimeout(delayed);
  }, [word]);
  const searchItems = (arg) => {
    let array = [];
    let index = [];
    fetchProductsByFilter(arg)
      .then((res) => {
        if (res.data.length > 0) {
          res.data.map((arg) => {
            if (index.includes(arg.category.title) === false) {
              array.push({
                id: arg._id,
                brand: arg.brand,
                category: arg.category.title,
                link: arg.category.slug,
              });
              index.push(arg.category.title);
            }
            // setFiltered([
            //   ...filtered,
            //   {
            //     id: arg._id,
            //     brand: arg.brand,
            //     category: arg.category.title,
            //     link: arg.category.slug,
            //   },
            // ]);
          });
        }
        setFiltered(array);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    // dispatch({
    //   type: SEARCH_QUERY,
    //   payload: { text: "" },
    // });
    removeQuery();
    if (filtered.length > 0) {
      history.push(`/category/${filtered[0].link}`);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center={false}
        classNames={{
          modal: `${stickyBar === false ? "customModal" : "modalWithBurger"}`,
        }}
      >
        <>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full border-b border-gray-200"
            >
              <input
                type="text"
                placeholder="Ai libertatea sa alegi ce vrei"
                className="focus:outline-none w-full text-gray-500 text-base placeholder-gray-500 pb-1.5"
                value={word}
                onChange={(e) => handleChange(e)}
              />
              <AiOutlineClose
                className="w-6 h-6 text-gray-500 mr-4 mt-0.5 cursor-pointer"
                onClick={() => {
                  if (word !== "") {
                    // dispatch({
                    //   type: SEARCH_QUERY,
                    //   payload: { text: "" },
                    // });
                    removeQuery();
                    setPopular(initialState);
                  } else {
                    setOpen(false);
                  }
                }}
              />
              <FiSearch
                type="submit"
                className="w-5 h-5 text-blue-500 mt-1 mr-0 pr-0 cursor-pointer"
              />
            </form>
          </div>
          <div className="mt-3 ml-1">
            <span className="text-gray-800 font-bold">
              {word === "" ? "Cautari populare in eMAG" : "Sugestii de cautare"}
            </span>
            {popular &&
              popular.map((arg) => {
                return (
                  <div key={arg.id}>
                    <Link
                      to={arg.link}
                      className="flex my-1 items-center hover:bg-gray-200 py-1.5 px-0.5"
                      onClick={() => setOpen(false)}
                    >
                      <GoGraph className="mr-3 text-gray-700" />
                      <span className="text-base  text-gray-600 ">
                        {arg.title}
                      </span>
                    </Link>
                  </div>
                );
              })}
            {filtered &&
              filtered.map((arg, index) => {
                return (
                  <div key={arg.id}>
                    {index === 0 && (
                      <Link
                        to={`/category/${arg.link}`}
                        className="flex my-1 items-center hover:bg-gray-200 py-1.5 px-0.5"
                        onClick={() => {
                          setOpen(false);
                          setFiltered([]);
                          removeQuery();
                        }}
                      >
                        <FiSearch className="mr-3 text-gray-700" />
                        <span className="text-base  text-blue-500 ">
                          {word}
                        </span>
                      </Link>
                    )}
                    {index === 0 && (
                      <Link
                        to={`/category/${arg.link}`}
                        className="flex my-1 items-center hover:bg-gray-200 py-1.5 px-0.5"
                        onClick={() => {
                          setOpen(false);
                          setFiltered([]);
                          removeQuery();
                        }}
                      >
                        <FiSearch className="mr-3 text-gray-700" />
                        <span className="text-base  text-gray-600 ">
                          <span className="text-blue-500">{word}</span> in{" "}
                          {arg.brand}
                        </span>
                      </Link>
                    )}
                    <Link
                      to={`/category/${arg.link}`}
                      className="flex my-1 items-center hover:bg-gray-200 py-1.5 px-0.5"
                      onClick={() => {
                        setOpen(false);
                        setFiltered([]);
                        removeQuery();
                      }}
                    >
                      <FiSearch className="mr-3 text-gray-700" />
                      <span className="text-base  text-gray-600 ">
                        <span className="text-blue-500">{word}</span> in{" "}
                        {arg.category}
                      </span>
                    </Link>
                  </div>
                );
              })}
          </div>
        </>
      </Modal>
    </div>
  );
};

export default ExtendedSearch;
