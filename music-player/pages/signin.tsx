import AuthForm from "../components/authForm.jsx";

const Signin = (): JSX.Element => {
  return <AuthForm mode="signin" option="signup" />;
};

Signin.authPage = true;

export default Signin;
