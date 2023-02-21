import { Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [registrateds, setRegistrateds] = useState("");
  const navigate = useNavigate()
  const { name } = useParams()
  console.log(name)
  console.log("huhu");
  const createDeck = async (event) => {
    event.preventDefault();
    const data = { user, password };
    const response = await fetch(`http://localhost:3000/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const accepted = await response.text();

    setRegistrateds(accepted);
    props.getUpData(accepted);
    if (accepted == "Successfully logged in!") {
      props.getUpData2(user);
      if (name !="home"){
        navigate(`/tracks/${name}`)
      }
    }
    console.log(registrateds);
  
  };

  return (
    <div className="logindiv">
      <Header
        title="Login to your account"
        success={registrateds}
        name={user}
      />
      {registrateds != "Successfully logged in!" ? (  <div>{name!="home" ? <Typography>Please log in to see the page of that track!</Typography>:""}
        <form onSubmit={createDeck}>
          <div>
            <label htmlFor="names"><Typography>Name:</Typography> </label>
            <input
              type="text"
              id="names"
              onChange={(e) => setUser(e.target.value)}
            />
            <label htmlFor="prices"><Typography>Password:</Typography> </label>
            <input
              type="text"
              id="prices"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button><Typography>Submit</Typography> </button>
          </div>
        </form></div>
      ) : (
        ""
      )}
      {registrateds == "Successfully logged in!" ? (
        <Typography sx={{marginTop:"15px"}} variant="h5" className="success">Welcome {user}</Typography>
      ) : (
        ""
      )}

      <Typography variant="h5" className="success">{registrateds}</Typography>
      {registrateds == "something went wrong" ? (
        <Typography variant="h5" className="success">Please try again</Typography>
      ) : (
        ""
      )}
    </div>
  );
}
