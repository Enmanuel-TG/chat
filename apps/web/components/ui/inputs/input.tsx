interface InputProps {
    name: string;
    type: string;
    placeholder?: string;
    value?: string | number;
}

const Input = ({type, placeholder, value, name}: InputProps) => {
  return (
    <div className="flex w-full flex-col">
      <label className="text-sm">{name}</label>
      <input className="w-full p-2 rounded-sm mb-2" type={type} placeholder={placeholder} value={value} />
    </div>
  )
}

export default Input;