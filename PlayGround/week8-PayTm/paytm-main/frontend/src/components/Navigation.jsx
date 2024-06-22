import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-400 p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
        <span className="font-semibold text-xl tracking-tight">Paytm</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-1 border rounded text-white-200 border-teal-400 hover:text-black hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mr-4"
            onClick={() => {
              navigate('/dashboard');
            }}
          >
            Dashboard
          </a>
          <a
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mr-4"
            onClick={() => {
              navigate('/signin');
            }}
          >
            Signin
          </a>
          <a
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mr-4"
            onClick={() => {
              navigate('/signup');
            }}
          >
            Signup
          </a>
          <a
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black"
            onClick={() => {
              navigate('/send');
            }}
          >
            Send
          </a>
        </div>
        <div>
          <a
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            onClick={() => {
              navigate('/logout');
            }}
          >
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}
