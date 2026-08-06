import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../services/axios";
import { updateBanner } from "../services/bannerService";
import DashboardLayout from "../layouts/DashboardLayout";

export default function EditBanner() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        title: "",
        subtitle: "",
        button_text: "",
        button_link: "",
        image: null,
        preview: "",
        is_active: true,

    });

    useEffect(() => {

        fetchBanner();

    }, []);

    const fetchBanner = async () => {

        try {

            const response = await axios.get(`/products/banners/${id}/`);

            const banner = response.data.data;

            setFormData({

                title: banner.title,
                subtitle: banner.subtitle,
                button_text: banner.button_text,
                button_link: banner.button_link,
                image: null,
                preview: banner.image,
                is_active: banner.is_active,

            });

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,
            [name]: value,

        });

    };

    const handleImage = (e) => {

        setFormData({

            ...formData,
            image: e.target.files[0],
            preview: URL.createObjectURL(e.target.files[0]),

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = new FormData();

        data.append("title", formData.title);
        data.append("subtitle", formData.subtitle);
        data.append("button_text", formData.button_text);
        data.append("button_link", formData.button_link);
        data.append("is_active", formData.is_active);

        if (formData.image) {

            data.append("image", formData.image);

        }

        try {

            await updateBanner(id, data);

            navigate("/banners");

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">
                Edit Banner
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow max-w-xl space-y-5"
            >

                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    name="button_text"
                    value={formData.button_text}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    name="button_link"
                    value={formData.button_link}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                {formData.preview && (

                    <img
                        src={formData.preview}
                        alt=""
                        className="w-full h-56 object-cover rounded"
                    />

                )}

                <input
                    type="file"
                    onChange={handleImage}
                    className="w-full"
                />

                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
                >
                    Update Banner
                </button>

            </form>

        </DashboardLayout>

    );

}