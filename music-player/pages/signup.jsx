import AuthForm from "../components/authForm.jsx";

const Signup = () => {
  return <AuthForm mode="signup" option="signin" />;
};

Signup.authPage = true;

export default Signup;
