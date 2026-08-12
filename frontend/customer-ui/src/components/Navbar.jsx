
import {
  ShoppingCart,
  Search,
  Menu,
  MessageCircle,
  X,
  User,
  ChevronDown,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const { cartItems } = useCart();

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearch = () => {
    const keyword = search.trim();

    if (!keyword) {
      navigate("/shop");
      return;
    }

    navigate(
      `/shop?search=${encodeURIComponent(keyword)}`
    );

    setMobileMenuOpen(false);
  };

  // ============================================================
  // MOBILE MENU
  // ============================================================

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-200
        bg-white/95
        backdrop-blur-md
      "
    >

      {/* ======================================================
          MAIN NAVBAR
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-[72px] flex items-center justify-between gap-4">

          {/* ==================================================
              LOGO
          ================================================== */}

          <Link
            to="/"
            className="flex-shrink-0 group"
          >

            <div className="flex items-center gap-2">

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600
                  text-white
                  shadow-md
                  shadow-blue-600/20
                  transition
                  duration-200
                  group-hover:scale-105
                "
              >
                <ShoppingCart size={21} />
              </div>

              <div className="hidden sm:block">

                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Ecommerce
                </h1>

                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-blue-600">
                  Store
                </p>

              </div>

            </div>

          </Link>

          {/* ==================================================
              DESKTOP SEARCH
          ================================================== */}

          <div className="hidden md:flex flex-1 max-w-xl mx-4">

            <div className="relative flex w-full items-center">

              <Search
                size={19}
                className="
                  absolute
                  left-4
                  text-slate-400
                  pointer-events-none
                "
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="
                  w-full
                  h-11
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-11
                  pr-24
                  text-sm
                  text-slate-900
                  placeholder:text-slate-400
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />

              <button
                type="button"
                onClick={handleSearch}
                className="
                  absolute
                  right-1.5
                  top-1.5
                  h-8
                  rounded-lg
                  bg-blue-600
                  px-4
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                  active:scale-95
                "
              >
                Search
              </button>

            </div>

          </div>

          {/* ==================================================
              RIGHT ACTIONS
          ================================================== */}

          <div className="flex items-center gap-1 sm:gap-2">

            {/* CHAT */}

            <Link
              to="/chat"
              className="
                group
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                text-slate-600
                transition
                hover:bg-blue-50
                hover:text-blue-600
              "
              title="Chat"
            >

              <MessageCircle
                size={21}
                className="transition-transform group-hover:scale-110"
              />

            </Link>

            {/* CART */}

            <Link
              to="/cart"
              className="
                group
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                text-slate-600
                transition
                hover:bg-blue-50
                hover:text-blue-600
              "
              title="Cart"
            >

              <ShoppingCart
                size={22}
                className="transition-transform group-hover:scale-110"
              />

              {cartItems.length > 0 && (
                <span
                  className="
                    absolute
                    -right-0.5
                    -top-0.5
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    px-1
                    text-[10px]
                    font-bold
                    text-white
                    ring-2
                    ring-white
                  "
                >
                  {cartItems.length > 99
                    ? "99+"
                    : cartItems.length}
                </span>
              )}

            </Link>

            {/* ACCOUNT */}

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="
                hidden
                sm:flex
                items-center
                gap-2
                rounded-xl
                px-3
                py-2
                text-slate-600
                transition
                hover:bg-blue-50
                hover:text-blue-700
              "
            >

              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-slate-100
                "
              >
                <User size={17} />
              </span>

              <span className="hidden lg:block text-sm font-semibold">
                Account
              </span>

              <ChevronDown
                size={15}
                className="hidden lg:block text-slate-400"
              />

            </button>

            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              className="
                flex
                md:hidden
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                text-slate-600
                transition
                hover:bg-blue-50
                hover:text-blue-600
              "
              aria-label="Toggle menu"
            >

              {mobileMenuOpen ? (
                <X size={23} />
              ) : (
                <Menu size={23} />
              )}

            </button>

          </div>

        </div>

        {/* ==================================================
            MOBILE SEARCH
        ================================================== */}

        <div className="md:hidden pb-3">

          <div className="relative flex items-center">

            <Search
              size={18}
              className="
                absolute
                left-3.5
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="
                w-full
                h-11
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-10
                pr-20
                text-sm
                outline-none
                transition
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10
              "
            />

            <button
              type="button"
              onClick={handleSearch}
              className="
                absolute
                right-1.5
                top-1.5
                h-8
                rounded-lg
                bg-blue-600
                px-3
                text-xs
                font-semibold
                text-white
                hover:bg-blue-700
              "
            >
              Search
            </button>

          </div>

        </div>

      </div>

      {/* ======================================================
          MOBILE MENU
      ====================================================== */}

      {mobileMenuOpen && (
        <div
          className="
            md:hidden
            border-t
            border-slate-100
            bg-white
          "
        >

          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                text-slate-700
                hover:bg-blue-50
                hover:text-blue-700
              "
            >
              Home
            </Link>

            <Link
              to="/shop"
              onClick={closeMobileMenu}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                text-slate-700
                hover:bg-blue-50
                hover:text-blue-700
              "
            >
              Shop
            </Link>

            <Link
              to="/chat"
              onClick={closeMobileMenu}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                text-slate-700
                hover:bg-blue-50
                hover:text-blue-700
              "
            >
              <MessageCircle size={18} />
              Chat
            </Link>

            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                text-slate-700
                hover:bg-blue-50
                hover:text-blue-700
              "
            >

              <span className="flex items-center gap-3">
                <ShoppingCart size={18} />
                Cart
              </span>

              {cartItems.length > 0 && (
                <span
                  className="
                    rounded-full
                    bg-red-500
                    px-2
                    py-0.5
                    text-xs
                    font-bold
                    text-white
                  "
                >
                  {cartItems.length}
                </span>
              )}

            </Link>

            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                navigate("/login");
              }}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-left
                text-sm
                font-medium
                text-slate-700
                hover:bg-blue-50
                hover:text-blue-700
              "
            >

              <User size={18} />

              Account

            </button>

          </div>

        </div>
      )}

    </header>
  );
}