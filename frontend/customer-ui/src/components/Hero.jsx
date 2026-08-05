import { useEffect, useState } from "react";
import { getBanner } from "../services/bannerService";


export default function Hero() {

    const [banner, setBanner] = useState(null);


    useEffect(() => {

        const fetchBanner = async () => {

            try {

                const response = await getBanner();

                setBanner(response.data);

            }
            catch(error){

                console.log(
                    "BANNER ERROR:",
                    error
                );

            }

        };


        fetchBanner();

    }, []);



    if(!banner){

        return (
            <p className="text-center mt-10">
                Loading Banner...
            </p>
        );

    }



    return (

        <section className="max-w-7xl mx-auto mt-8 px-4">


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                {/* Dynamic Banner */}


                <div className="lg:col-span-2 relative rounded-2xl overflow-hidden">


                    <img

                        src={
                            `${import.meta.env.VITE_MEDIA_URL}${banner.image}`
                        }

                        alt={banner.title}

                        className="w-full h-[420px] object-cover"

                    />


                    <div className="absolute inset-0 bg-black/40 flex items-center">


                        <div className="p-12 text-white">


                            <p className="uppercase tracking-widest">

                                New Collection

                            </p>



                            <h1 className="text-5xl font-bold mt-4 leading-tight">

                                {banner.title}

                            </h1>



                            <p className="mt-6 text-lg">

                                {banner.description}

                            </p>



                            <button

                                className="mt-8 bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"

                            >

                                Shop Now

                            </button>


                        </div>


                    </div>


                </div>





                {/* Right Categories */}


                <div className="space-y-4">


                    {
                        [
                            "Electronics",
                            "Fashion",
                            "Home & Living",
                        ].map((item)=>(


                            <div

                                key={item}

                                className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition cursor-pointer"

                            >


                                <h3 className="font-semibold text-lg">

                                    {item}

                                </h3>


                                <p className="text-gray-500 mt-2">

                                    Explore Collection

                                </p>


                            </div>


                        ))
                    }


                </div>


            </div>


        </section>

    );

}