import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBanner } from "../services/bannerService";


export default function Hero() {

    const [banner, setBanner] = useState(null);


    useEffect(() => {

        const fetchBanner = async () => {

            try {

                const response = await getBanner();

                console.log("BANNER:", response);

                setBanner(response.data);

            }
            catch(error) {

                console.log(
                    "BANNER ERROR:",
                    error
                );

            }

        };


        fetchBanner();

    }, []);



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

                        {banner.subtitle}

                    </p>


                    <h1 className="text-5xl font-bold mt-4">

                        {banner.title}

                    </h1>



                    <Link
                    to={banner.button_link}
                    className="inline-block mt-8 bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold"
                    >

                        {banner.button_text}

                    </Link>


                </div>


            </div>

        </section>

    );

}