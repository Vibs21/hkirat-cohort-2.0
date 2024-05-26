import { useState } from 'react';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

  const userSignup = async () => {
    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        firstName,
        lastName,
        email,
        password
    });
    localStorage.setItem("token", response.data.token)
    navigate("/dashboard")
  }

  return (
    <div className='flex justify-center items-center h-[85vh]'>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-4 pb-8 mb-4">
            <Heading label={"Sign Up"}/>
            <SubHeading label={"Enter your infromation to create an account"} />
          <div className="mb-4">
            <InputBox label={"First Name"} placeholder={"John"} onChange={(e)=> {setFirstName(e.target.value)}}/>
            <InputBox label={"Last Name"} placeholder={"Doe"} onChange={(e)=> {setLastName(e.target.value)}}/>
            <InputBox label={"Email"} placeholder={"John@email.com"} onChange={(e)=> {setEmail(e.target.value)}}/>
            <InputBox label={"Password"} placeholder={"123***45"} type={"password"} onChange={(e)=> {setPassword(e.target.value)}}/>
            
          </div>
          <div className="flex items-center justify-between flex-col">
            <button className="bg-slate-950 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[100%] mb-2"
              type="button" onClick={userSignup}>
              Sign Up
            </button>
            <div>
              Already have an account? 
              <a className="inline-block align-baseline font-bold text-sm ml-1 underline" onClick={()=> {navigate('/signin')}}>
                 Login
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
