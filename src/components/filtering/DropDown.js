import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { fetchProductsByFilter } from "../../CRUD/functions";

const DropDown = ({ setProducts, category }) => {
  const handleClick = async (arg) => {
    await fetchProductsByFilter({ cheapOrExp: arg, category })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  const handleClick1 = async (arg) => {
    await fetchProductsByFilter({ popularAndNew: arg, category })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  const menu = (
    <Menu>
      <Menu.Item key="2">
        <span onClick={() => handleClick1("new")}>Cele mai populare</span>
      </Menu.Item>
      <Menu.Item key="1">
        {" "}
        <span onClick={() => handleClick1("popular")}>Cele mai noi</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span onClick={() => handleClick("ascendent")}>Pret crescator</span>
      </Menu.Item>
      <Menu.Item key="3">
        <span onClick={() => handleClick("descendent")}>Pret descrescator</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]} className="ml-2">
      <span className="text-sm border border-gray-300   p-2 cursor-pointer rounded">
        Ordoneaza dupa <DownOutlined />
      </span>
    </Dropdown>
  );
};

export default DropDown;
