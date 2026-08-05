import { useEffect, useState } from "react";
import { getBanner } from "../services/bannerService";
import { useNavigate } from "react-router-dom";


export default function Hero() {

    const [banner, setBanner] = useState(null);

    const navigate = useNavigate();


    useEffect(()=>{

        const fetchBanner = async()=>{

            try{

                const response = await getBanner();

                console.log("BANNER:", response);

                setBanner(response.data);

            }
            catch(error){

                console.log("BANNER ERROR:", error);

            }

        };


        fetchBanner();

    },[]);



    if(!banner){
        return null;
    }



    return (

        <section className="max-w-7xl mx-auto mt-8 px-4">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                <div 
                className="lg:col-span-2 rounded-2xl p-12 text-white bg-cover bg-center"
                style={{
                    backgroundImage:
                    `url(${import.meta.env.VITE_MEDIA_URL}${banner.image})`
                }}
                >


                    <p className="uppercase tracking-widest">
                        New Collection
                    </p>


                    <h1 className="text-5xl font-bold mt-4">
                        {banner.title}
                    </h1>


                    <p className="mt-6 text-lg">
                        {banner.subtitle}
                    </p>



                    <button

                    onClick={()=>navigate(banner.button_link)}

                    className="mt-8 bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100"

                    >

                        {banner.button_text}

                    </button>


                </div>


                <div className="space-y-4">


                    {
                    [
                        "Electronics",
                        "Fashion",
                        "Home & Living",
                    ].map(item=>(

                        <div
                        key={item}
                        className="bg-white shadow rounded-xl p-6"
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