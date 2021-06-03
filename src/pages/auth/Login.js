import React, { useState } from "react";
import FirstLogin from "./FirstLogin";
import SecondLogin from "./SecondLogin";
import LastLogin from "./LastLogin";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("registered");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = auth
      .signInWithEmailAndPassword(
        email,
        "@@justLookingIfUserExists@@@##~~@%^@@~///$."
      )
      .then()
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          setStatus("notRegistered");
        } else if (err.code === "auth/wrong-password") {
          setStatus("LoginPage");
        }
      });
    return () => check();
  };
  return status === "registered" ? (
    <FirstLogin handleSubmit={handleSubmit} email={email} setEmail={setEmail} />
  ) : status === "notRegistered" ? (
    <SecondLogin
      email={email}
      setPassword={setPassword}
      setName={setName}
      name={name}
    />
  ) : (
    <LastLogin email={email} />
  );
};

export default Login;
