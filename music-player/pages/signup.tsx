import AuthForm from "../components/authForm";

const Signup = (): JSX.Element => {
  return <AuthForm mode="signup" option="signin" />;
};

Signup.authPage = true;

export default Signup;
