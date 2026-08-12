import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
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
            console.log("GET BANNERS ERROR:", error);
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
            console.log("DELETE BANNER ERROR:", error);
        }
    };

    const getImageUrl = (image) => {
        if (!image) {
            return "";
        }

        // Backend already returns complete URL
        if (image.startsWith("http://") || image.startsWith("https://")) {
            return image;
        }

        // Backend returns /media/... path
        const mediaUrl = import.meta.env.VITE_MEDIA_URL || "";

        return `${mediaUrl.replace(/\/$/, "")}/${image.replace(/^\//, "")}`;
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="text-xl font-semibold">
                    Loading...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
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

                {banners.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-8 text-center">
                        <p className="text-gray-500">
                            No banners found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {banners.map((banner) => {
                            const imageUrl = getImageUrl(banner.image);

                            return (
                                <div
                                    key={banner.id}
                                    className="bg-white rounded-xl shadow overflow-hidden"
                                >

                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={banner.title || "Banner"}
                                            className="w-full h-56 object-cover"
                                            onLoad={() => {
                                                console.log(
                                                    "IMAGE LOADED:",
                                                    imageUrl
                                                );
                                            }}
                                            onError={(e) => {
                                                console.log(
                                                    "IMAGE FAILED:",
                                                    imageUrl
                                                );

                                                e.currentTarget.style.display =
                                                    "none";
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500">
                                                No Image
                                            </span>
                                        </div>
                                    )}

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
                                                onClick={() =>
                                                    handleDelete(banner.id)
                                                }
                                                className="bg-red-600 text-white px-4 py-2 rounded"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>
        </DashboardLayout>
    );
}