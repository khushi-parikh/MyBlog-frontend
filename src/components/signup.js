import "./signup.css"
import React from "react";

function SignUp(){

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [message, setMessage] = React.useState("");

    const trySignUp = async (e) => {
      console.log("Signing up with", username, password, confirmPassword);
      if(password!==confirmPassword){
        setMessage("Passwords do not match.")
      }
      else{
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/MyBlogApp/register`,
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
        if (response.status === 200) {
          setMessage("User created successfully, you may now LogIn!")
        } else {
          setMessage("User not created.")
        }
      }
    };

    return(
    <div id="signupform">
      <div style={{margin: "2rem", color: "red"}}>{message}</div>
        <h2 id="headerTitle">Sign Up</h2>
        <div>
            <FormInput className="form-control" description="Username" placeholder="Enter your username" type="email" setUsername={setUsername} />
            <FormInput className="form-control" description="Password" placeholder="Enter a password" type="password" setPassword={setPassword} />
            <FormInput className="form-control" description="Confirm Password" placeholder="Confirm password" type="password" setConfirmPassword={setConfirmPassword} />
            <div id="links">
              <a href="/" id="logIn">Already a member?</a>
            </div>
            <div id="button-signUp" class="row">
              <button onClick={trySignUp}>Sign Up</button>
            </div>
        </div>
    </div>
    )
  }
  
  const FormInput = props => (
    <div class="row-signUp">
      <label>{props.description}</label>
      {(props.description==="Username") && <input type={props.type} placeholder={props.placeholder} onChange={(e)=>{props.setUsername(e.target.value)}} />}
      {(props.description==="Password") && <input type={props.type} placeholder={props.placeholder} onChange={(e)=>{props.setPassword(e.target.value)}} />}
      {(props.description==="Confirm Password") && <input type={props.type} placeholder={props.placeholder} onChange={(e)=>{props.setConfirmPassword(e.target.value)}} />}
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

export default SignUp;