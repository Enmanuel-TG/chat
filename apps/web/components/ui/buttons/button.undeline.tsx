// Normal button ---> use this to create a button component that can be used in multiple places in the app, for example in the login page, sign up page, etc. try to use the button in the login page, register page, and any other page that requires a button with an underline.
import { buttonProps } from "./button.interface";

const Button = ({ name, type }: buttonProps) => {
  // The button component should accept a name prop and a type prop. The name prop is the text that will be displayed on the button, and the type prop is the type of the button (submit, reset, or button).
  return (
    <div className="text-white p-2 text-center rounded-md hover:cursor-pointer">
      <button className="underline" type={type}>{name}</button>
    </div>
  )
};

export default Button;