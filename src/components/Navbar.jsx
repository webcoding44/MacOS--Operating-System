import dayjs from "dayjs";
import { navIcons, navLinks } from "../constants/index.js";
import { useState, useEffect } from "react";
import usewindowStore from "../store/window.js";


function Navbar () {
  
  const { openWindow } = usewindowStore();
  
  const [currentTime, setCurrentTime] = useState('');
 useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("ddd MMM D h:mm A"));
    }, 1000); // هر ۱ ثانیه آپدیت بشه

     return () => clearInterval(interval); // تمیز کردن interval وقتی کامپوننت از بین میره
   }, []);



  return (
    <>
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Safiurahman's Portfolio</p>

        <ul>
          {navLinks.map(({id , name , type}) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
         {navIcons.map(({id , img}) => (
          <li>
            <img className="icon-hover" src={img} alt={`icon-${id}`} />
          </li>
         ))}
        </ul>

          <time>{currentTime}</time>


      </div>
    </nav>
    </>
  )
}

export default Navbar;