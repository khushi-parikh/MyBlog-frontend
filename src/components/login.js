import "./login.css"
import React from "react";

const login_api = async (username, password, success, fail) => {
  const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/token/`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "username": username,
              "password": password,
            })
        }
    );
  const text = await response.text();
  if (response.status === 200) {
    success(JSON.parse(text));
  } else {
    Object.entries(JSON.parse(text)).forEach(([key, value])=>{
      fail(`${key}: ${value}`);
    });
  }
};

function LogIn(){

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");

    const success = async (text)=> {
      console.log("Yeah! Authenticated!");
      localStorage.setItem("salesToken", text.access);
      localStorage.setItem("username", username);
      window.location = "/dashboard";
    };

    const tryLogin = async (e) => {
      console.log("Loggin in with", username, password);
      await login_api(username, password, success, (text)=>{setMessage(text)});
    };

    return(
    <div id="loginform">
      <div style={{margin: "2rem", color: "red"}}>{message}</div>
        <h2 id="headerTitle-login">Log In</h2>
        <div class="form-group">
          {/* <FormInput className="form-control" 
                  description="Email" 
                  placeholder="Enter your email" 
                  type="email"
                  // value={email}
                  onChange={(e)=>{console.log(e.target.value)}}
                  required /> */}
          <div class="row">
            <label>Username</label>
            <input type="email" placeholder="Enter your Username" onChange={(e)=>{setUsername(e.target.value)}}/>
          </div> 
          <div class="row">
            <label>Password</label>
            <input type="password" placeholder="Enter your Password" minLength="6" onChange={(e)=>{setPassword(e.target.value)}}/>
          </div> 
          {/* <FormInput className="form-control" 
                  description="Password" 
                  placeholder="Enter your password" 
                  type="password"
                  // value={password}
                  onChange={e=>setPassword(e.target.value)}
                  minlength='6'
                  required /> */}
          <div id="links">
            {/* <a href="#" id="forgotPassword">Forgot Password?</a> */}
            <a href="/signup" id="signUp">Not a member yet?</a>
          </div>
          <FormButton title="Log In" tryLogin={tryLogin} />
        </div>
    </div>
    )
}


const FormButton = props => (
  <div id="button" class="row">
    <button onClick={props.tryLogin}>{props.title}</button>
  </div>
);

// const OtherMethods = props => (
//   <div id="alternativeLogin">
//     <label>Or sign in with:</label>
//     <div id="iconGroup">
//       <Facebook />
//       <Twitter />
//       <Google />
//     </div>
//   </div>
// );

// const Facebook = props => (
//   <a href="#" id="facebookIcon"></a>
// );

// const Twitter = props => (
//   <a href="#" id="twitterIcon"></a>
// );

// const Google = props => (
//   <a href="#" id="googleIcon"></a>
// );

export default LogIn;