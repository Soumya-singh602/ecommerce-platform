import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";


export default function MainLayout({ children }) {

  return (

    <div className="min-h-screen flex flex-col bg-gray-50">


      {/* TOP NAVBAR */}

      <Navbar />



      {/* BODY */}

      <div className="flex flex-1">


        {/* SIDEBAR */}

        <Sidebar />



        {/* PAGE CONTENT */}

        <main className="flex-1 p-6">

          {children}

        </main>


      </div>



      {/* FOOTER */}

      <Footer />


    </div>

  );

}