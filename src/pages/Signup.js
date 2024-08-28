import { useState } from "react";
import Fullname from "../compoments/Fullname";
import Username from "../compoments/Username";
import Email from "../compoments/Email";
import Password from "../compoments/Password";
import Submitbutton from "../compoments/Submitbutton";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    const data = {
      fullname: inputs.fullname,
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
    };

    alert(data.fullname);
    return false;
  };

  return (
    <>
      <h1 className="text-center">Signup Now</h1>
      <div className="row">
        <div className="col-sm-6" style={{ width: "200px", margin: "auto" }}>
          <form>
            <Fullname handleChange={handleChange} setValue={inputs.fullname} />
            <Username handleChange={handleChange} setValue={inputs.username} />
            <Email handleChange={handleChange} setValue={inputs.email} />
            <Password handleChange={handleChange} setValue={inputs.password} />
            <Submitbutton handleSubmit={handleSubmit} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
