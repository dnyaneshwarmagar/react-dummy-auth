import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
  });
  const [showMsg, setShowMsg] = useState(false);
  const [error, setError] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();


  function handleInputChange(e) {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log("inputs", inputs);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setShowMsg(true);
    if (inputs.name === "" || inputs.password === "") {
      setErrMsg("Error:All the fields are manadatory");
      return;
    }

    try {
      let response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: inputs.name,
          password: inputs.password,
        }),
      });

      let data = await response.json();

      if (data.message) {
        setErrMsg(data.message);
      } else {
        let user = {
          id: data.id,
          token: data.token,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setError(false);
        navigate("/profile");
      }
      console.log("htitt", data);
    } catch (error) {
      console.log("error:", error);
      setErrMsg(error);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={inputs.name}
        onChange={(e) => handleInputChange(e)}
        name="name"
      />
      <input
        type="password"
        placeholder="Password"
        value={inputs.password}
        onChange={(e) => handleInputChange(e)}
        name="password"
      />
      {showMsg && (
        <p style={{ color: error ? "red" : "green" }}>
          {error ? `${errMsg}` : "Successfully Logged In!"}
        </p>
      )}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
