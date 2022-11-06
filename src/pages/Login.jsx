import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {


  const [userInfo, setUserInfo] = useState([]);
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const url = "http://localhost:3000/users";

  const navigate = useNavigate();

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div>{errorMessages.message}</div>
    );


  const errors = {
    msg: "Invalid email or password"
  };

  const fetchUser = async () => {
    const response = await fetch(url);
    const userInfo = await response.json();
    setUserInfo(userInfo);
  }
  useEffect(() => {
    fetchUser()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const getUserInfo = userInfo.find((info) => {
      return info.email === userEmail && info.password === userPassword

    });


    if (getUserInfo) {
      setUser({ email: userEmail, password: userPassword })
      navigate("/home")
    }
    else {
      setErrorMessages({ name: "msg", message: errors.msg });
      
    }
if(user){
  //no function
}
  };




  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={handleSubmit}>
                <div className="form__group">
                {renderErrorMessage("msg")}
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  

                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Login
                </button>
              </form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
