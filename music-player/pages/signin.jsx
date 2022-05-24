import AuthForm from "../components/authForm.jsx";

const Signin = () => {
  return <AuthForm mode="signin" option="signup" />;
};

Signin.authPage = true;

export default Signin;
