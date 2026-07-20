export default function Newsletter() {
  return (
    <section className="bg-blue-600 mt-20">

      <div className="max-w-7xl mx-auto py-16 px-6 text-center">

        <h2 className="text-4xl font-bold text-white">

          Subscribe To Our Newsletter

        </h2>

        <p className="text-blue-100 mt-4">

          Get latest offers, discounts and new arrivals directly in your inbox.

        </p>

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-3 rounded-lg w-full md:w-96 outline-none"
          />

          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">

            Subscribe

          </button>

        </div>

      </div>

    </section>
  );
}