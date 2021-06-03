import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";
import ErrorPage from "../../pages/404/404";
import axios from "axios";

const checkAdmin = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/admin-check`,
    {},
    {
      headers: {
        authtoken: token,
      },
    }
  );
};

// const AdminRoute = ({ component: Component, ...rest }) => {
//   const { user } = useSelector((state) => ({ ...state }));
//   const [ok, setOk] = useState(false);
//   useEffect(() => {
//     if (user && user.token) {
//       checkAdmin(user.token)
//         .then((res) => {
//           if (res.data.res === "OK") {
//             setOk(true);
//           } else if (res.data.res === "Fail") {
//             setOk(false);
//           }
//         })
//         .catch(() => {
//           setOk(false);
//         });
//     }
//   }, []);
//   // console.log(Component);
//   return ok ? (
//     <Route
//       {...rest}
//       render={(props) => {
//         return <Component {...props} />;
//       }}
//     />
//   ) : (
//     <Route {...rest} component={ErrorPage} />
//   );
// };

// export default AdminRoute;

const AdminRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);
  const user = useSelector((state) => state.user);
  const checkingAdmin = async () => {
    checkAdmin(user.token)
      .then((res) => {
        if (res.data.res === "OK") {
          setOk(true);
        } else if (res.data.res === "Fail") {
          setOk(false);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (user.token) {
      checkingAdmin();
    }
  }, [user.token]);
  return ok === true ? (
    <Route {...rest} render={() => children} />
  ) : (
    <Route {...rest} component={ErrorPage} />
  );
};

export default AdminRoute;
