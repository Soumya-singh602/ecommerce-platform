import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <Link
        to="/"
        className="text-gray-500 hover:text-blue-600"
      >
        Home
      </Link>

      <ChevronRight size={16} className="text-gray-400" />

      <span className="font-medium text-gray-900">
        Shop
      </span>
    </nav>
  );
}