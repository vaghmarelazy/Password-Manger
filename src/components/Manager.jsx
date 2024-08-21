import { useState, useEffect } from "react";

function Manager() {
  const [eye, setEye] = useState(true);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [errors, setErrors] = useState({
    site: false,
    username: false,
    password: false,
  });
  const [visibilityArray, setVisibilityArray] = useState([]);

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

      // Add visibility state for the new password
      setVisibilityArray([...visibilityArray, false]);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false }); // Clear error on input change
  }

  function toggleVisibility(index) {
    const updatedVisibilityArray = [...visibilityArray];
    updatedVisibilityArray[index] = !updatedVisibilityArray[index];
    setVisibilityArray(updatedVisibilityArray);
  }

  function copyToClipboard(password) {
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
    });
  }

  function deletePassword(index) {
    const updatedPasswordArray = passwordArray.filter((_, i) => i !== index);
    const updatedVisibilityArray = visibilityArray.filter((_, i) => i !== index);

    setPasswordArray(updatedPasswordArray);
    setVisibilityArray(updatedVisibilityArray);
    localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
  }

  useEffect(() => {
    let password = localStorage.getItem("password");
    if (password) {
      const parsedPasswordArray = JSON.parse(password);
      setPasswordArray(parsedPasswordArray);
      setVisibilityArray(new Array(parsedPasswordArray.length).fill(false));
    }
  }, []);

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mycontainer sm: ">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-lg text-center text-green-900">
          Your own Password Manager
        </p>

        <div className="p-4 flex flex-col items-center text-black gap-4 sm:gap-8">
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
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
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
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
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
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    savePassword(); // Call the savePassword function when Enter is pressed
                  }
                }}
              />
              <span
                className={`absolute right-1 cursor-pointer duration-100 `}
                onClick={Action}
              >
                <img
                  src={eye ? "/eye.png" : "/eyeopened.png"}
                  alt="closed eye"
                  className="w-8 mr-2 py-auto h-full"
                />
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
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
              <p>No Saved Passwords to show !</p>
              <img className="w-52 sm:w-[25%]" src="/searching-data.svg" alt="" />
            </div>
          )}
          {passwordArray.length !== 0 && (
            <div className="password">
              <h2 className="font-bold text-slate-800 text-md w-full text-center">
                Your Passwords
              </h2>
              <table className="table-fixed w-full overflow-hidden rounded-xl gap-2">
                <thead className="bg-green-600 text-white text-lg">
                  <tr>
                    <th>Site</th>
                    <th>Username</th>
                    <th className="w-3/6 sm:w-auto">Password</th>
                  </tr>
                </thead>
                <tbody className="text-center bg-green-100">
                  {passwordArray.map((e, index) => (
                    <tr key={index} className="h-10 relative">
                      <td>{e.site}</td>
                      <td>{e.username}</td>
                      <td className="flex items-center justify-between">
                        <input
                          type={visibilityArray[index] ? "text" : "password"}
                          value={e.password}
                          readOnly
                          className="bg-inherit w-[60%]"
                        />
                        <div className="w-[40%] sm:w-[30%] flex">
                          <lord-icon
                            src="/Eye.json"
                            style={{ cursor: "pointer", top: "3px" }}
                            onClick={() => toggleVisibility(index)}
                          ></lord-icon>
                          {}
                          <lord-icon
                            src="/copy.json"
                            style={{ cursor: "pointer" }}
                            onClick={() => copyToClipboard(e.password)}
                          ></lord-icon>
                          <lord-icon
                            src="/delete.json"
                            style={{ cursor: "pointer" }}
                            onClick={() => deletePassword(index)}
                          ></lord-icon>
                        </div>
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
