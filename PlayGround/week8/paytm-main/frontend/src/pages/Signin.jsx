import { useState } from 'react';
import { Heading } from '../components/Heading'
import { InputBox } from '../components/InputBox'
import { SubHeading } from '../components/SubHeader'
import { useNavigate } from 'react-router-dom';


function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const userSignin = () => {
    console.log("email: ", email, "password: ", password);
  }

    return (
      <div className='flex justify-center items-center h-[85vh]'>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-4 pb-8 mb-4">
            <Heading label={"Sign In"}/>
            <SubHeading label={"Enter your infromation to signin into an account"} />
          <div className="mb-4">
            <InputBox label={"Email"} placeholder={"John@email.com"} onChange={(e)=> {setEmail(e.target.value)}}/>
            <InputBox label={"Password"} placeholder={"123***45"} type={"password"} onChange={(e)=> {setPassword(e.target.value)}}/>
            
          </div>
          <div className="flex items-center justify-between flex-col">
            <button className="bg-slate-950 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[100%] mb-2"
              type="button" onClick={userSignin}>
              Sign In
            </button>
            <div>
              Don't have an account? 
              <a className="inline-block align-baseline font-bold text-sm ml-1 underline" onClick={()=> {navigate('/signup')}}>
                 Sign Up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
    )
}

export default Signin;