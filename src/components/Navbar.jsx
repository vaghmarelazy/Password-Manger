import { useState, useEffect } from "react";

function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-slate-800 text-white absolute top-0 w-full">
      <div className="flex justify-between px-4 py-4 items-center h-14">
        <div className="logo font-bold text-2xl">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </div>
        {isMobile ? (
          <lord-icon
            src="https://cdn.lordicon.com/eouimtlu.json"
            trigger="hover"
    colors="primary:#ffffff"
          ></lord-icon>
        ) : (
          <ul>
            <li className="flex gap-4">
              <a href="/">Home</a>
              <a href="/">About</a>
              <a href="/">Contact</a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
