import { AiOutlineTablet } from "react-icons/ai";
import { RiMouseLine } from "react-icons/ri";
import { AiOutlineCamera } from "react-icons/ai";
import { IoGameControllerOutline } from "react-icons/io5";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { BsBag } from "react-icons/bs";
import { IoShirtOutline } from "react-icons/io5";
import { GiMirrorMirror } from "react-icons/gi";
import { RiHomeSmileLine } from "react-icons/ri";
import { GiTennisRacket } from "react-icons/gi";
import { AiOutlineCar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import Teddy from "../../pages/404/teddy.svg";

export const MainBarLinks = [
  {
    id: 1,
    img: <AiOutlineTablet className="w-8 h-5 mx-1" />,
    mTitle: "Laptop,Tablete & Telefoane",
    target: "/",
  },
  {
    id: 2,
    img: <RiMouseLine className="w-8 h-5 mx-1" />,
    mTitle: "PC, Periferice & Software",
    target: "/",
  },
  {
    id: 3,
    img: <AiOutlineCamera className="w-8 h-5 mx-1" />,
    mTitle: "TV, Audio-Vide & Foto",
    target: "/",
  },
  {
    id: 4,
    img: <CgSmartHomeWashMachine className="w-8 h-5 mx-1" />,
    mTitle: "Electrocasnice & Climatizare",
    target: "/",
  },
  {
    id: 5,
    img: <IoGameControllerOutline className="w-8 h-5 mx-1" />,
    mTitle: "Gaming, Carti & Birotica",
    target: "/",
  },
  {
    id: 6,
    img: <BsBag className="w-8 h-5 mx-1" />,
    mTitle: "Bacanie",
    target: "/",
  },
  {
    id: 7,
    img: <IoShirtOutline className="w-8 h-5 mx-1" />,
    mTitle: "Fashion",
    target: "/",
  },
  {
    id: 8,
    img: <GiMirrorMirror className="w-8 h-5 mx-1" />,
    mTitle: "Ingrijire personala & Cosmetice",
    target: "/",
  },
  {
    id: 9,
    img: <RiHomeSmileLine className="w-8 h-5 mx-1" />,
    mTitle: "Casa, Gradina & Bricolaj",
    target: "/",
  },
  {
    id: 10,
    img: <GiTennisRacket className="w-8 h-5 mx-1" />,
    mTitle: "Sport & Activitati in aer liber",
    target: "/",
  },
  {
    id: 11,
    img: <AiOutlineCar className="w-8 h-5 mx-1" />,
    mTitle: "Auto, Moto & RCA",
    target: "/",
  },
  {
    id: 12,
    img: <img src={Teddy} alt="fck" className="w-8 h-5 mx-1" />,
    mTitle: "Jucarii, Copii & Bebe",
    target: "/",
  },
  {
    id: 13,
    img: <GiShoppingCart className="w-8 h-5 mx-1" />,
    mTitle: "Supermarket",
    target: "/",
  },
];

export const HoverLinks = [
  {
    id: 1,
    Links: [
      {
        Title: "Laptopuri si accesorii",
        target: "/category/laptops",
        color: "text-green-500",
        link: [
          { lname: "Laptopuri", target: "/category/laptops" },
          { lname: "Laptopuri cu Windows", target: "/category/laptops" },
        ],
      },
      {
        Title: "Branduri de TOP ",
        id: 2,
        target: "/",
        link: [
          { lname: "Laptopuri", target: "/" },
          { lname: "Asus", target: "/" },
          { lname: "Lenovo", target: "/" },
          { lname: "HP", target: "/" },
          { lname: "Apple", target: "/" },
          { lname: "Dell", target: "/" },
          { lname: "Acer", target: "/" },
        ],
      },
      {
        Title: "Accesorii Laptop",
        target: "/",
        link: [
          { lname: "Genti laptop", target: "/" },
          { lname: "Standuri/Coolere laptop", target: "/" },
          { lname: "Hard disk-uri notebook", target: "/" },
          { lname: "Docking stations", target: "/" },
        ],
      },
      {
        Title: "Telefoane mobile si accesorii",
        target: "/category/phones",
        color: "text-green-500",
        link: [
          { lname: "Telefoane mobile", target: "/category/phones" },
          { lname: "Apple Shop", target: "/category/phones" },
          { lname: "Brand Shop Huawei", target: "/category/phones" },
        ],
      },
      {
        Title: "Televizoare",
        target: "/category/tv",
        color: "text-green-500",
        link: [
          { lname: "Samsung", target: "/" },
          { lname: "iPhone", target: "/" },
          { lname: "Huawei", target: "/" },
          { lname: "Xiaomi", target: "/" },
        ],
      },
      {
        Title: "Accesorii Telefoane",
        target: "/",
        link: [
          { lname: "Huse Telefoane", target: "/" },
          { lname: "Folii protectie telefoane", target: "/" },
          { lname: "Incarcator telefoane", target: "/" },
          { lname: "Casti audio jack", target: "/" },
          { lname: "Casti audio usb-C", target: "/" },
        ],
      },
      {
        Title: "Reincarcare cartela",
        target: "/",
        link: [],
      },
      {
        Title: "Tablete si accesorii",
        target: "/",
        link: [
          { lname: "Tablete", target: "/" },
          { lname: "Huse tablete", target: "/" },
          { lname: "Suport auto si Docking", target: "/" },
        ],
      },
      {
        Title: "Wearables & Gadgeturi",
        target: "/",
        link: [
          { lname: "Smartwatch-uri", target: "/" },
          { lname: "Bratari fitness", target: "/" },
          { lname: "Kit-uri Smart Home", target: "/" },
        ],
      },
      {
        Title: "Alege produsul potrivit",
        target: "/",
        link: [
          { lname: "Asistent shopping Laptop", target: "/" },
          { lname: "Asistent shopping Telefoane", target: "/" },
        ],
      },
      {
        Title: "Resigilate",
        target: "/",
        link: [],
      },
      {
        Title: "Laptopuri Resigilate",
        target: "/",
        link: [
          { lname: "Laptopuri Asus", target: "/" },
          { lname: "Laptopuri Lenovo", target: "/" },
          { lname: "Laptopuri HP", target: "/" },
          { lname: "Laptopuri Dell", target: "/" },
          { lname: "Laptopuri Acer", target: "/" },
          { lname: "Laptopuri gaming", target: "/" },
          { lname: "Laptopuri ultraportabile", target: "/" },
          { lname: "Laptopuri home & office", target: "/" },
        ],
      },
      {
        Title: "Telefoane Resigilate",
        target: "/",
        link: [
          { lname: "Telefoane Apple", target: "/" },
          { lname: "Telefoane Samsung", target: "/" },
          { lname: "Telefoane Huawei", target: "/" },
          { lname: "Smartwatch-uri", target: "/" },
          { lname: "Bratari fitness", target: "/" },
          { lname: "Tablete", target: "/" },
        ],
      },
    ],
  },
];
