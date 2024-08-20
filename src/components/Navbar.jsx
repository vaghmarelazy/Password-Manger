function Navbar() {
  return (
    <nav className="bg-slate-800 text-white fixed top-0 w-full">
      <div className="mycontainer  flex justify-between px-4 py-4 items-center h-14">
        <div className="logo font-bold text-2xl">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </div>
        <ul>
          <li className="flex gap-4">
            <a href="/">Home</a>
            <a href="/">About</a>
            <a href="/">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
