import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8">

      <h2 className="text-3xl font-bold text-center mb-8">
        Create Account
      </h2>

      <form className="space-y-5">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-lg px-4 py-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>

      </form>

      <p className="text-center text-gray-600 mt-6">
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