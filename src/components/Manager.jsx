import { useState, useEffect } from "react";

function Manager() {
  const [eye, setEye] = useState(true);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [errors, setErrors] = useState({ site: false, username: false, password: false });

  function Action() {
    setEye(!eye);
  }

  function validateForm() {
    const newErrors = {
      site: !form.site.trim(),
      username: !form.username.trim(),
      password: !form.password.trim(),
    };
    setErrors(newErrors);
    return !newErrors.site && !newErrors.username && !newErrors.password;
  }

  function savePassword() {
    if (validateForm()) {
      const updatedPasswordArray = [...passwordArray, form];
      setPasswordArray(updatedPasswordArray);
      localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
      setForm({ site: "", username: "", password: "" }); // Clear form after saving
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false }); // Clear error on input change
  }

  useEffect(() => {
    let password = localStorage.getItem("password");
    if (password) {
      setPasswordArray(JSON.parse(password));
    }
  }, []);

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
          <div className="w-full">
            <input
              value={form.site}
              name="site"
              type="text"
              onChange={handleChange}
              placeholder="Enter Website Name or URL"
              className={`border ${
                errors.site ? "border-red-500" : "border-green-500"
              } py-1 px-4 rounded-full w-full`}
            />
            {errors.site && (
              <p className="text-red-500 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div className="flex w-full gap-5">
            <div className="w-3/5">
              <input
                value={form.username}
                name="username"
                type="text"
                onChange={handleChange}
                placeholder="Enter Username"
                className={`border ${
                  errors.username ? "border-red-500" : "border-green-500"
                } py-1 px-4 rounded-full w-full`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">This field is required</p>
              )}
            </div>

            <div className="relative w-2/5">
              <input
                value={form.password}
                name="password"
                type={eye ? "password" : "text"}
                onChange={handleChange}
                placeholder="Enter Password"
                className={`border ${
                  errors.password ? "border-red-500" : "border-green-500"
                } py-1 px-4 rounded-full w-full`}
              />
              <span
                className={`absolute right-0 cursor-pointer duration-100 top-1`}
                onClick={Action}
              >
                <img
                  src={eye ? "/eye.png" : "/eyeopened.png"}
                  alt="closed eye"
                  className="w-8 mr-2 py-auto h-full"
                />
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">This field is required</p>
              )}
            </div>
          </div>

          <button
            className="bg-green-600 rounded-full flex items-center justify-center w-fit px-4 py-2 hover:bg-green-500 duration-150 gap-1"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="password">
          {passwordArray.length === 0 && (
            <div className="text-center flex flex-col items-center">
              <p>No Passwords to show</p>
              <img className="w-1/5" src="/searching-data.svg" alt="" />
            </div>
          )}
          {passwordArray.length !== 0 && (
            <div className="password">
              <h2 className="font-bold">Your Passwords</h2>
              <table className="table-fixed w-full overflow-hidden rounded-xl gap-2">
                <thead className="bg-green-600 text-white text-lg">
                  <tr>
                    <th>Site</th>
                    <th>Username</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody className="text-center bg-green-100">
                  {passwordArray.map((e, index) => (
                    <tr key={index} className="mt-2">
                      <td>{e.site}</td>
                      <td>{e.username}</td>
                      <td className="flex items-center justify-center">
                        {e.password}
                        <lord-icon
                          src="https://cdn.lordicon.com/wpyrrmcq.json"
                          trigger="hover"
                          style={{ cursor: "pointer", marginLeft: "10px" }}
                        ></lord-icon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
