import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">


          {/* Logo + Navigation */}
          <div className="flex items-center">

            <Link to="/">
              <h1 className="text-3xl font-bold text-blue-600">
                Ecommerce
              </h1>
            </Link>


            <div className="hidden lg:flex gap-8 ml-12">

              <Link
                to="/"
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </Link>


              <Link
                to="/shop"
                className="hover:text-blue-600 transition-colors"
              >
                Shop
              </Link>


            </div>

          </div>



          {/* Search */}
          <div className="hidden md:flex w-2/5">

            <div className="flex w-full border rounded-lg overflow-hidden">

              <input
                type="text"
                placeholder="Search Products..."
                className="w-full px-4 py-2 outline-none"
              />


              <button className="px-4 bg-blue-600 text-white">
                <Search size={20} />
              </button>


            </div>

          </div>



          {/* Icons + Auth */}
          <div className="flex items-center gap-6">


            {/* Login */}
            <Link
              to="/login"
              className="hover:text-blue-600 transition-colors"
            >
              <User />
            </Link>


            {/* Register */}
            <Link
              to="/register"
              className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>


            {/* Cart */}
            <Link to="/cart">

              <ShoppingCart
                className="cursor-pointer hover:text-blue-600 transition-colors"
              />

            </Link>


            {/* Mobile Menu */}
            <Menu className="md:hidden cursor-pointer" />


          </div>


        </div>

      </div>
    </header>
  );
}