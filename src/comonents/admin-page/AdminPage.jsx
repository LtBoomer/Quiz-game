import "./AdminPage.scss";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import AdminQuestionList from "../admin-question-list/AdminQuestionList";
const AdminPage = (props) => {
  //PROPS
  const { moveBack } = props;
  //VARIABLES
  // const signupInfo = document.getElementsByClassName("signup")
  const [loginSignUp, setLoginSignUp] = useState("page");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginModel, setLoginModel] = useState({
    email: "",
    password: "",
  });
  const [adminAccounts, setAdminAccounts] = useState();
  //REQUEST
  const Accounts = collection(db, "Admin-Info");
  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(Accounts);
      const loadedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAdminAccounts(loadedData[0].AdminAccounts)
    };
    getData();
  }, []);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  //FUNCTIONS
  // const errorTimer = () => {
  //   setTimeout(() => {
  //     setErrorMessage("");
  //   }, 3000);
  // };
  return (
    <div className="Admin-acc">
      {errorMessage !== "correctInfo" && <div className="Admin-check">
        <div className="Admin-page-title-wrapper">
          {loginSignUp !== "page" && (
            <button
              onClick={() => {
                setLoginSignUp("page");
              }}
            >
              back
            </button>
          )}
          <h2>Admin {loginSignUp}</h2>
        </div>
        {loginSignUp === "page" && (
          <div className="Admin-page-button-wrapper">
            <button
              onClick={() => {
                setLoginSignUp("login");
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                moveBack(true);
              }}
            >
              Back
            </button>
          </div>
        )}
        {loginSignUp === "login" && (
          <div className="login-wrapper">
            <input
              placeholder="Email adress"
              onChange={(event) => {
                setLoginModel({
                  ...loginModel,
                  email: event.target.value,
                });
              }}
            ></input>
            <input
              placeholder="Password"
              onChange={(event) => {
                setLoginModel({
                  ...loginModel,
                  password: event.target.value,
                });
              }}
            ></input>
            <button onClick={() => {
              
              adminAccounts.forEach((element) =>{
                if(element.email === loginModel.email && element.password === loginModel.password){
                    setErrorMessage("correctInfo")
                }else{
                  setShowErrorMessage(true)
                  setTimeout(()=>{
                    setShowErrorMessage(false)
                  },1000)
                }
            })}}>Login</button>
            {showErrorMessage && <p>Error</p>}
          </div>
        )}
        {errorMessage !== "" && errorMessage !== "correctInfo" && (
          <div className="error-message-wrapper">
            <div className="error-message">{errorMessage}</div>
          </div>
        )}
      </div>}
      {errorMessage === "correctInfo" && <AdminQuestionList />}
    </div>
  );
};

export default AdminPage;
