import React from "react";
import { Tooltip } from "antd";

const links = [
  {
    id: 1,
    img: "https://s13emagst.akamaized.net/layout/ro/images/db//59/88517.png",
    text: "eMAG Genius",
    textToolTip: "Bucură-te de cumpărături cu beneficii premium!",
  },
  {
    id: 2,
    img: "https://s13emagst.akamaized.net/layout/ro/images/db//59/88518.png",
    text: "easybox by eMAG",
    textToolTip:
      "Comanzi când vrei, ridici când poți! În plus, poți să returnezi la easybox produsele care nu ți se potrivesc!",
  },
  {
    id: 3,
    img: "https://s13emagst.akamaized.net/layout/ro/images/db//59/88519.png",
    text: "Livrare in 1h",
    textToolTip:
      "Bucură-te de livrări în super viteză cu Tazz by eMAG! În doar o oră, primești ce îți dorești din showroom, magazine sau restaurante!",
  },
  {
    id: 4,
    img: "https://s13emagst.akamaized.net/layout/ro/images/db//59/88520.png",
    text: "Cardul eMAG de la Reiffensein Bank",
    textToolTip:
      "Aplica acum! Ai până la 10% înapoi în puncte și până la 24 rate fara dobândă.",
  },
  {
    id: 5,
    img: "https://s13emagst.akamaized.net/layout/ro/images/db//59/88521.png",
    text: "Daruieste un voucher eMAG",
    textToolTip:
      "Fă-le o surpriză celor dragi și oferă-le un voucher cadou cu care să își cumpere exact ce își doresc!",
  },
];

const SubBar = () => {
  return (
    <div
      className="h-24 bg-white flex flex-wrap items-center justify-center mt-36"
      // style={{ width: "90%" }}
    >
      {links.map((arg) => {
        return (
          <Tooltip
            key={arg.id}
            title={arg.textToolTip}
            placement="bottom"
            color={"green"}
          >
            <span className="flex items-center justify-center mx-4 w-52">
              <img className="w-12 h-12" src={arg.img} alt="fck" />
              <p className="text-gray-800 text-base font-semibold flex flex-wrap ml-4 mt-2 tracking-tight">
                {arg.text}
              </p>
            </span>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default SubBar;
