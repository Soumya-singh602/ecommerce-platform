import {
  ShoppingCart,
  Search,
  Menu,
  MessageCircle
} from "lucide-react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useState
} from "react";

import {
  useCart
} from "../context/CartContext";


export default function Navbar() {


  const navigate = useNavigate();

  const [search,setSearch] = useState("");

  const {
    cartItems
  } = useCart();



  const handleSearch = () => {


    const keyword =
      search.trim();



    if(!keyword){

      navigate("/shop");

      return;

    }


    navigate(
      `/shop?search=${encodeURIComponent(keyword)}`
    );


  };



  return (


    <header
      className="
        bg-white
        shadow-sm
        sticky
        top-0
        z-50
      "
    >


      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          h-16
          flex
          items-center
          justify-between
        "
      >



        {/* LOGO */}


        <Link to="/">


          <h1
            className="
              text-3xl
              font-bold
              text-blue-600
            "
          >

            Ecommerce

          </h1>


        </Link>





        {/* SEARCH */}


        <div
          className="
            hidden
            md:flex
            w-2/5
          "
        >


          <div
            className="
              flex
              w-full
              border
              rounded-lg
              overflow-hidden
            "
          >


            <input

              type="text"

              placeholder="Search Products..."

              value={search}

              onChange={(e)=>
                setSearch(e.target.value)
              }

              onKeyDown={(e)=>{

                if(e.key==="Enter"){

                  handleSearch();

                }

              }}

              className="
                flex-1
                px-4
                py-2
                outline-none
              "

            />



            <button

              onClick={handleSearch}

              className="
                bg-blue-600
                text-white
                px-4
              "

            >

              <Search size={20}/>

            </button>


          </div>


        </div>





        {/* RIGHT SIDE */}


        <div
          className="
            flex
            items-center
            gap-5
          "
        >



          {/* CHAT */}


          <Link to="/chat">


            <MessageCircle

              size={26}

              className="
                hover:text-blue-600
                cursor-pointer
              "

            />


          </Link>





          {/* CART */}


          <Link

            to="/cart"

            className="
              relative
            "

          >


            <ShoppingCart

              size={28}

              className="
                hover:text-blue-600
              "

            />



            {
              cartItems.length > 0 &&

              (

                <span

                  className="
                    absolute
                    -top-3
                    -right-3
                    bg-red-600
                    text-white
                    text-xs
                    rounded-full
                    w-5
                    h-5
                    flex
                    items-center
                    justify-center
                  "

                >

                  {cartItems.length}


                </span>

              )

            }



          </Link>




          {/* MOBILE MENU */}


          <Menu

            size={26}

            className="
              md:hidden
              cursor-pointer
            "

          />



        </div>



      </div>


    </header>


  );

}