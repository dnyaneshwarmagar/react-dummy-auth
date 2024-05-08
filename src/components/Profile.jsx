import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      console.log("user:", user);
      if (user && user.id) {
        let response = await fetch(`https://dummyjson.com/users/${user.id}`);
        let data = await response.json();
        console.log("data:", data);
        if (data.username) {
          setUser(data);
        } else {
          setErrorMsg("Not valid id or token!");
          setError(true);
        }
      } else {
        setErrorMsg("Please Login with valid credentials to get your profile!");
        setError(true);
        // navigate("/");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      setError(true);
    }
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }
  return (
    <div className="profile_box">
      <h1>Profile</h1>
      {error ? (
        <p style={{ color: "red" }}>{errorMsg}</p>
      ) : (
        <>
        <div style={{border:"2px solid white",borderRadius:"50%",width:"150px",height:"150px",overflow:"hidden",padding:"20px"}}>

        <img src={user?.image} height="100px" width={"100px"}/>
        </div>
          <p>
            Username: <span>{user?.username}</span>
          </p>
          <p>
            Password: <span>{user?.password}</span>
          </p>
          <p>
            Email: <span>{user?.email}</span>
          </p>
          <p>
            First Name: <span>{user?.firstName}</span>
          </p>
          <p>
            Last Name: <span>{user?.lastName}</span>
          </p>
          <p>
            Phone: <span>{user?.phone}</span>
          </p>

          <button onClick={() => handleLogout()}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Profile;
