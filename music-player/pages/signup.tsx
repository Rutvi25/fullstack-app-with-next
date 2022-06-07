import AuthForm from "../components/authForm.jsx";

const Signup = (): JSX.Element => {
  return <AuthForm mode="signup" option="signin" />;
};

Signup.authPage = true;

export default Signup;
