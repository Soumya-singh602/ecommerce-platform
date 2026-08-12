


import {
  Home,
  ShoppingBag,
  Package,
  User,
  CreditCard,
  MessageCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  logout,
  getUser,
} from "../utils/auth";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Shop",
      path: "/shop",
      icon: ShoppingBag,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: Package,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Saved Cards",
      path: "/saved-cards",
      icon: CreditCard,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: MessageCircle,
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const getUserName = () => {
    if (!user) {
      return "Account";
    }

    return (
      user?.name ||
      user?.username ||
      user?.first_name ||
      "Account"
    );
  };

  return (
    <aside
      className="
        w-64
        min-h-screen
        flex
        flex-col
        bg-white
        border-r
        border-slate-200
        shadow-sm
      "
    >

      {/* ======================================================
          USER / ACCOUNT
      ====================================================== */}

      <Link
        to="/profile"
        className="
          mx-4
          mt-5
          mb-5
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          p-4
          transition
          duration-200
          hover:border-blue-200
          hover:bg-blue-50
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-11
              w-11
              flex-shrink-0
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              text-white
              shadow-sm
            "
          >
            <User size={21} />
          </div>

          <div className="min-w-0 flex-1">

            <p className="text-xs font-medium text-slate-500">
              Welcome back
            </p>

            <p className="mt-0.5 truncate text-sm font-bold text-slate-900">
              {getUserName()}
            </p>

            <p className="mt-0.5 truncate text-xs text-slate-500">
              {user?.email || "Manage your account"}
            </p>

          </div>

          <ChevronRight
            size={17}
            className="flex-shrink-0 text-slate-400"
          />

        </div>

      </Link>

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <div className="px-5 mb-2">

        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </p>

      </div>

      {/* ======================================================
          MENU
      ====================================================== */}

      <nav className="flex-1 px-3 space-y-1">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                group
                relative
                flex
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                font-medium
                transition
                duration-200

                ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >

              {active && (
                <span
                  className="
                    absolute
                    left-0
                    top-1/2
                    h-7
                    w-1
                    -translate-y-1/2
                    rounded-r-full
                    bg-blue-600
                  "
                />
              )}

              <span
                className={`
                  flex
                  h-9
                  w-9
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  transition
                  duration-200

                  ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600"
                  }
                `}
              >
                <Icon size={18} />
              </span>

              <span className="flex-1">
                {item.name}
              </span>

              <ChevronRight
                size={15}
                className={`
                  transition
                  duration-200

                  ${
                    active
                      ? "text-blue-500"
                      : "text-slate-300 group-hover:translate-x-0.5 group-hover:text-slate-400"
                  }
                `}
              />

            </Link>
          );
        })}

      </nav>

      {/* ======================================================
          QUICK HELP
      ====================================================== */}

      <div
        className="
          mx-4
          mb-4
          rounded-2xl
          bg-blue-600
          p-4
          text-white
          shadow-lg
          shadow-blue-600/20
        "
      >

        <div className="flex items-start gap-3">

          <div
            className="
              flex
              h-9
              w-9
              flex-shrink-0
              items-center
              justify-center
              rounded-lg
              bg-white/15
            "
          >
            <MessageCircle size={17} />
          </div>

          <div>

            <p className="text-sm font-semibold">
              Need help?
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-100">
              Chat with our support team.
            </p>

          </div>

        </div>

        <Link
          to="/chat"
          className="
            mt-3
            flex
            w-full
            items-center
            justify-center
            rounded-lg
            bg-white
            px-3
            py-2
            text-xs
            font-bold
            text-blue-700
            transition
            hover:bg-blue-50
          "
        >
          Open Chat
        </Link>

      </div>

      {/* ======================================================
          LOGOUT
      ====================================================== */}

      <div className="border-t border-slate-200 p-4">

        <button
          type="button"
          onClick={handleLogout}
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-3
            text-sm
            font-semibold
            text-red-600
            transition
            duration-200
            hover:bg-red-50
          "
        >

          <span
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-red-50
              text-red-500
              transition
              group-hover:bg-red-100
            "
          >
            <LogOut size={18} />
          </span>

          <span className="flex-1 text-left">
            Logout
          </span>

          <ChevronRight
            size={15}
            className="
              text-red-300
              transition
              group-hover:translate-x-0.5
            "
          />

        </button>

      </div>

    </aside>
  );
}