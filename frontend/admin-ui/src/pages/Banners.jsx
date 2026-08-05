import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBanners, deleteBanner } from "../services/bannerService";

export default function Banners() {

    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBanners = async () => {

        try {

            const response = await getBanners();

            console.log("BANNERS:", response);

            setBanners(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchBanners();

    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this banner?"
        );

        if (!confirmDelete) return;

        try {

            await deleteBanner(id);

            fetchBanners();

        } catch (error) {

            console.log(error);

        }

    };

    if (loading) {

        return (
            <div className="p-8 text-xl">
                Loading...
            </div>
        );

    }

    return (

        <div className="p-8">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Banner Management
                </h1>

                <Link
                    to="/banners/add"
                    className="bg-indigo-600 text-white px-5 py-3 rounded-lg"
                >
                    + Add Banner
                </Link>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {
                    banners.map((banner) => (

                        <div
                            key={banner.id}
                            className="bg-white rounded-xl shadow overflow-hidden"
                        >

                            <img
                                src={`${import.meta.env.VITE_MEDIA_URL}${banner.image}`}
                                alt={banner.title}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-5">

                                <h2 className="text-xl font-bold">
                                    {banner.title}
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    {banner.subtitle}
                                </p>

                                <div className="flex justify-between mt-5">

                                    <Link
                                        to={`/banners/${banner.id}/edit`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(banner.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    );

}