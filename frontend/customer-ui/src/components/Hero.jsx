export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Banner */}

        <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 text-white">

          <p className="uppercase tracking-widest">
            New Collection
          </p>

          <h1 className="text-5xl font-bold mt-4 leading-tight">
            Summer Sale <br />
            Up To 50% OFF
          </h1>

          <p className="mt-6 text-lg">
            Discover premium products at unbeatable prices.
          </p>

          <button className="mt-8 bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
            Shop Now
          </button>

        </div>

        {/* Right Categories */}

        <div className="space-y-4">

          {[
            "Electronics",
            "Fashion",
            "Home & Living",
          ].map((item) => (

            <div
              key={item}
              className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="font-semibold text-lg">
                {item}
              </h3>

              <p className="text-gray-500 mt-2">
                Explore Collection
              </p>
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}