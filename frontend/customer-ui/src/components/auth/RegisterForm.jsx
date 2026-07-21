import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";


export default function RegisterForm() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    try {

      await registerUser(formData);


      setSuccess(
        "Registration successful. Redirecting to login..."
      );


      setTimeout(() => {

        navigate("/login");

      }, 1500);



    } catch (error) {


      setError(
        error.response?.data?.message ||
        "Registration failed"
      );


      console.log(
        "Register Error:",
        error.response?.data
      );

    }

  };



  return (

    <div className="bg-white shadow-lg rounded-xl p-8">


      <h2 className="text-3xl font-bold text-center mb-8">
        Create Account
      </h2>



      {error && (

        <p className="text-red-500 text-center mb-4">
          {error}
        </p>

      )}



      {success && (

        <p className="text-green-500 text-center mb-4">
          {success}
        </p>

      )}



      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >


        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
          required
        />



        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
          required
        />



        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
          required
        />



        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
          required
        />



        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>


      </form>



      <p className="text-center mt-6 text-gray-600">

        Already have an account?{" "}

        <Link
          to="/login"
          className="text-blue-600 hover:underline"
        >
          Login
        </Link>

      </p>


    </div>

  );

}