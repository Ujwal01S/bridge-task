import { Link } from "react-router";

const Header = () => {
  return (
    <header className='w-full  px-4  shadow-md bg-white fixed z-20 md:z-99'>
      <div className=' h-16 flex items-center justify-between  '>
        <Link to={"/"}>
          <h2>Bridge Task</h2>
        </Link>
        <Link to='#' className='relative pr-4'>
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
