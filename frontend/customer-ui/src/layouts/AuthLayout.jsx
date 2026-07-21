export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Logo */}
      <div className="py-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Ecommerce
        </h1>
      </div>


      {/* Page Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        {children}
      </main>

    </div>
  );
}