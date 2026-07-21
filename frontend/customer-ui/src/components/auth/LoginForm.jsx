import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";


export default function LoginForm() {


  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });


  const [error, setError] = useState("");



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const data = await loginUser(formData);


      console.log(data);


      // token save
      localStorage.setItem(
        "access",
        data.access
      );


      localStorage.setItem(
        "refresh",
        data.refresh
      );


      navigate("/");


    } catch (error) {

      setError(
        error.message || "Login failed"
      );

    }

  };



  return (

    <div className="bg-white shadow-lg rounded-xl p-8">


      <h2 className="text-3xl font-bold text-center mb-8">
        Login
      </h2>



      {error && (

        <p className="text-red-500 mb-4 text-center">
          {error}
        </p>

      )}



      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >


        <input

          type="email"

          name="email"

          placeholder="Email Address"

          value={formData.email}

          onChange={handleChange}

          className="w-full border rounded-lg px-4 py-3"

        />



        <input

          type="password"

          name="password"

          placeholder="Password"

          value={formData.password}

          onChange={handleChange}

          className="w-full border rounded-lg px-4 py-3"

        />



        <div className="text-right">

          <Link
            to="/forgot-password"
            className="text-blue-600 text-sm"
          >
            Forgot Password?
          </Link>

        </div>



        <button

          type="submit"

          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"

        >

          Login

        </button>


      </form>



      <p className="text-center mt-6 text-gray-600">

        Don't have an account?{" "}

        <Link
          to="/register"
          className="text-blue-600"
        >
          Register
        </Link>

      </p>


    </div>

  );
}