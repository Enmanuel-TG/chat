import Input from "../../components/ui/inputs/input";
import ButtonBlue from "../../components/ui/buttons/button.blue";
const Login = () => {

  return (
    <div>
      <h1>Login</h1>
      <div className="flex flex-col bg-gray-400 rounded-md w-1/3 m-auto p-4">
        <form>
          <Input name="email" type="email" />
          <Input name="Password" type="password" />
          <ButtonBlue name="Login" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;