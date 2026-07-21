export default function LoginForm() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8">

      <h2 className="text-3xl font-bold text-center mb-8">
        Login
      </h2>

      <form className="space-y-5">

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

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

      </form>

    </div>
  );
}