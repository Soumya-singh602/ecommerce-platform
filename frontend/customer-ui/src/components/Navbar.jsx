import {
  ShoppingCart,
  Search,
  User,
  Menu,
  MessageCircle,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import {
  getUser,
  isAuthenticated,
  logout,
} from "../utils/auth";

import { useCart } from "../context/CartContext";


export default function Navbar() {


  const navigate = useNavigate();


  const [loggedIn, setLoggedIn] = useState(
    isAuthenticated()
  );


  const [search, setSearch] = useState("");


  const user = getUser();


  const { cartItems } = useCart();



  const handleLogout = () => {

    logout();

    setLoggedIn(false);

    navigate("/login");

  };



  const handleSearch = () => {

    const keyword = search.trim();


    if (!keyword) {

      navigate("/shop");

      return;

    }


    navigate(
      `/shop?search=${encodeURIComponent(keyword)}`
    );

  };



  return (

    <header className="bg-white shadow-md">


      <div className="max-w-7xl mx-auto px-4">


        <div className="flex items-center justify-between h-16">


          {/* Logo */}

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

                value={search}

                onChange={(e) => setSearch(e.target.value)}

                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    handleSearch();

                  }

                }}

                className="w-full px-4 py-2 outline-none"

              />



              <button

                onClick={handleSearch}

                className="px-4 bg-blue-600 text-white"

              >

                <Search size={20} />

              </button>


            </div>


          </div>





          {/* Right Side */}


          <div className="flex items-center gap-6">


            {


              loggedIn ? (

                <>


                  {/* Profile */}

                  <Link

                    to="/profile"

                    className="hover:text-blue-600 transition-colors"

                    title="My Profile"

                  >

                    <User size={26} />

                  </Link>




                  <span className="hidden md:block text-sm">


                    {user?.email}


                  </span>




                  <button

                    onClick={handleLogout}

                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"

                  >

                    Logout


                  </button>



                </>


              ) : (


                <>


                  {/* Login */}

                  <Link

                    to="/login"

                    className="hover:text-blue-600 transition-colors"

                    title="Login"

                  >

                    <User size={26} />


                  </Link>




                  <Link

                    to="/register"

                    className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"

                  >

                    Register


                  </Link>


                </>


              )


            }





            {


              loggedIn && (


                <Link to="/chat">


                  <MessageCircle

                    size={26}

                    className="cursor-pointer hover:text-blue-600 transition-colors"

                  />


                </Link>


              )


            }





            <Link

              to="/cart"

              className="relative"

            >


              <ShoppingCart

                size={28}

                className="cursor-pointer hover:text-blue-600 transition-colors"

              />



              {


                cartItems.length > 0 && (


                  <span

                    className="absolute -top-3 -right-3 bg-red-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center"

                  >

                    {cartItems.length}


                  </span>


                )


              }


            </Link>




            <Menu

              size={26}

              className="md:hidden cursor-pointer"

            />



          </div>



        </div>


      </div>


    </header>


  );


}