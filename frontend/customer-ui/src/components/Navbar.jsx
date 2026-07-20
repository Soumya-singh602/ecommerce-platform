import { ShoppingCart, Search, User, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}

          <div className="flex items-center">

            <h1 className="text-3xl font-bold text-blue-600">

              Ecommerce

            </h1>

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

          {/* Icons */}

          <div className="flex items-center gap-6">

            <User className="cursor-pointer" />

            <ShoppingCart className="cursor-pointer" />

            <Menu className="md:hidden cursor-pointer" />

          </div>

        </div>

      </div>

    </header>
  );
}