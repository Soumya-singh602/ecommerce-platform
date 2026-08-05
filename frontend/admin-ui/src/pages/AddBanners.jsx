import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBanner } from "../services/bannerService";


export default function AddBanner() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        title: "",
        subtitle: "",
        button_text: "",
        button_link: "",
        image: null,
        is_active: true

    });


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,
            [name]: value

        });

    };


    const handleImage = (e) => {

        setFormData({

            ...formData,
            image: e.target.files[0]

        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        const data = new FormData();


        data.append(
            "title",
            formData.title
        );

        data.append(
            "subtitle",
            formData.subtitle
        );

        data.append(
            "button_text",
            formData.button_text
        );

        data.append(
            "button_link",
            formData.button_link
        );

        data.append(
            "is_active",
            formData.is_active
        );


        if(formData.image){

            data.append(
                "image",
                formData.image
            );

        }


        try {

            await createBanner(data);


            navigate("/banners");


        } catch(error){

            console.log(
                "CREATE BANNER ERROR:",
                error
            );

        }


    };


    return (

        <div className="p-8">


            <h1 className="text-3xl font-bold mb-8">
                Add Banner
            </h1>



            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow max-w-xl space-y-5"
            >


                <input

                    name="title"

                    placeholder="Banner Title"

                    value={formData.title}

                    onChange={handleChange}

                    className="w-full border p-3 rounded"

                />



                <input

                    name="subtitle"

                    placeholder="Subtitle"

                    value={formData.subtitle}

                    onChange={handleChange}

                    className="w-full border p-3 rounded"

                />



                <input

                    name="button_text"

                    placeholder="Button Text"

                    value={formData.button_text}

                    onChange={handleChange}

                    className="w-full border p-3 rounded"

                />



                <input

                    name="button_link"

                    placeholder="Button Link"

                    value={formData.button_link}

                    onChange={handleChange}

                    className="w-full border p-3 rounded"

                />



                <input

                    type="file"

                    onChange={handleImage}

                    className="w-full"

                />



                <button

                    type="submit"

                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg"

                >

                    Create Banner

                </button>


            </form>


        </div>

    );

}