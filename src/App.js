import React, { Fragment, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGGED_IN_USER, LOGGED_OUT } from "./redux/auth/auth-types";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { createOrUpdateUser } from "./CRUD/functions";
import { CLEAR_CART } from "./redux/shopping/shopping-types";
import { CLEAR_FAVORITE } from "./redux/favorite/favorite-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { PATH } from "./redux/propDrilling/prop-types";

// import Header from "./components/nav/Header";
// import SubHeader from "./components/nav/SubHeader";
// import Login from "./pages/auth/Login";
// import Home from "./pages/Hero/Home";
// import History from "./pages/user/History";
// import ErrorPage from "./pages/404/404";
// import UserRoute from "./components/routes/UserRoute";
// import AdminRoute from "./components/routes/AdminRoute";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import Footer from "./components/footer/Footer";
// import AdminPage from "./pages/admin/AdminPage";
// import CreateCategory from "./pages/admin/category/CreateCategory";
// import ProductCreate from "./pages/admin/product/ProductCreate";
// import CategoryHome from "./pages/category/CategoryHome";

const Header = lazy(() => import("./components/nav/Header"));
const SubHeader = lazy(() => import("./components/nav/SubHeader"));
const Login = lazy(() => import("./pages/auth/Login"));
const Home = lazy(() => import("./pages/Hero/Home"));
const History = lazy(() => import("./pages/user/History"));
const ErrorPage = lazy(() => import("./pages/404/404"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const Footer = lazy(() => import("./components/footer/Footer"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const CreateCategory = lazy(() =>
  import("./pages/admin/category/CreateCategory")
);
const DescriptionEditor = lazy(() =>
  import("./pages/admin/editor/DescriptionEditor")
);
const Coupon = lazy(() => import("./pages/admin/coupon/Coupon"));
const AddSpecs = lazy(() => import("./pages/admin/editor/Specs.js"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const ProductPage = lazy(() => import("./pages/category/ProductPage"));
const UserCart = lazy(() => import("./pages/cart/UserCart"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const Payment = lazy(() => import("./pages/payment/Payment"));

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    dispatch({
      type: PATH,
      payload: location.pathname,
    });
  }, [location]);

  const roleBaseRedirect = (role) => {
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
      if (intended.elementToScroll) {
        let elmt = document.getElementById(intended.elementToScroll);
        elmt.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (role === "admin") {
        history.push("/admin/dashboard");
      } else if (role === "Subscriber") {
        history.push("/user/history");
      }
    }
  };
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        let displayName =
          user.displayName || localStorage.getItem("displayName");
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: LOGGED_IN_USER,
              payload: {
                email: res.data.email,
                token: idTokenResult.token,
                name: displayName,
                role: res.data.role,
                _id: res.data._id,
                profileImage: res.data.profileImage?.url,
                phone: res.data.phone,
                gender: res.data.gender,
                nickname: res.data.nickname,
                fix: res.data.fix,
              },
            });
            roleBaseRedirect(res.data.role);
          })
          .catch((err) => console.log(err));
      } else {
        dispatch({
          type: CLEAR_CART,
          payload: [],
        });
        dispatch({
          type: CLEAR_FAVORITE,
          payload: [],
        });
        dispatch({
          type: LOGGED_OUT,
          payload: {
            user: null,
          },
        });
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <Suspense
      fallback={
        <div style={{ position: "absolute", top: "48%", left: "48%" }}>
          <Spin tip="Loading..." />
        </div>
      }
    >
      <ToastContainer
        hideProgressBar={true}
        autoClose={1500}
        position="top-right"
        style={{ marginTop: "5em" }}
      />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/404" component={ErrorPage} />
        <AdminRoute
          exact
          path="/admin/edit-description"
          component={DescriptionEditor}
        />
        <Fragment>
          <Header />
          <SubHeader />
          <Route exact path="/" component={Home} />
          <UserRoute exact path="/user/history" component={History} />
          <Route exact path="/category/:slug" component={CategoryHome} />
          <Route exact path="/:slug" component={ProductPage} />
          <Route exact path="/user/cart" component={UserCart} />
          <UserRoute exact path="/cart/checkout" component={Checkout} />
          <UserRoute exact path="/cart/payment" component={Payment} />
          <AdminRoute exact path="/admin/dashboard" component={AdminPage} />
          <AdminRoute exact path="/admin/coupon" component={Coupon} />
          <AdminRoute
            exact
            path="/admin/create-category"
            component={CreateCategory}
          />
          <AdminRoute
            exact
            path="/admin/create-product"
            component={ProductCreate}
          />
          <AdminRoute exact path="/admin/add-specs" component={AddSpecs} />

          <Footer />
        </Fragment>
      </Switch>
    </Suspense>
  );
};

export default App;
