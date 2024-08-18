import { useState } from "react";

function Manager() {
  const [eye, setEye] = useState(true);
  
  function Action() {
    setEye(!eye);
  }

  function savePassword(){

  }

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-lg text-center text-green-900">
          Your own Password Manager
        </p>

        <div className="p-4 flex flex-col items-center text-black gap-8">
          <input
            type="text"
            placeholder="Enter Website Name or URL"
            className="border border-green-500 py-1 px-4 rounded-full w-full"
          />
          <div className="flex w-full gap-5">
            <input
              type="text"
              placeholder="Enter Username"
              className="border border-green-500 py-1 px-4 rounded-full w-3/5"
            />
            <div className="relative w-2/5">
              <input
                type={eye?"password":"text"}
                placeholder="Enter Password"
                className="border border-green-500 py-1 px-4 rounded-full w-full "
              />
              <span
                className={`absolute right-0 cursor-pointer duration-100 ${
                  eye ? "top-1" : "top-0"
                }`}
                onClick={Action}
              >
                <img
                  src={eye ? "/eye.png" : "/eyeopened.png"}
                  alt="closed eye"
                  className="w-8 mr-2 py-auto h-full"
                />
              </span>
            </div>
          </div>
          <button
            className="bg-green-600 rounded-full flex items-center justify-center w-fit px-4 py-2 hover:bg-green-400 duration-150 gap-1"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
      </div>
    </>
  );
}

export default Manager;
