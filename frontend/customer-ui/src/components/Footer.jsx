export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>

          <h2 className="text-2xl font-bold">

            Ecommerce

          </h2>

          <p className="mt-4 text-gray-400">

            Modern ecommerce platform built with React and Django.

          </p>

        </div>

        <div>

          <h3 className="font-semibold text-lg">

            Shop

          </h3>

          <ul className="space-y-2 mt-4 text-gray-400">

            <li>Electronics</li>

            <li>Fashion</li>

            <li>Home</li>

            <li>Beauty</li>

          </ul>

        </div>

        <div>

          <h3 className="font-semibold text-lg">

            Support

          </h3>

          <ul className="space-y-2 mt-4 text-gray-400">

            <li>Help Center</li>

            <li>Returns</li>

            <li>Privacy Policy</li>

            <li>Terms</li>

          </ul>

        </div>

        <div>

          <h3 className="font-semibold text-lg">

            Contact

          </h3>

          <ul className="space-y-2 mt-4 text-gray-400">

            <li>Email</li>

            <li>Phone</li>

            <li>Address</li>

          </ul>

        </div>

      </div>

      <div className="border-t border-gray-800 text-center py-6 text-gray-400">

        © 2026 Ecommerce Platform. All Rights Reserved.

      </div>

    </footer>
  );
}