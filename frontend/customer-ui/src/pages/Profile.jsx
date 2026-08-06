import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/userService";
import MainLayout from "../layouts/MainLayout";


export default function Profile() {


    const [profile, setProfile] = useState(null);


    const [formData, setFormData] = useState({

        first_name: "",
        last_name: ""

    });



    const fetchProfile = async () => {

        try {

            const response = await getProfile();

            const user = response.data;


            setProfile(user);


            setFormData({

                first_name: user.first_name || "",
                last_name: user.last_name || ""

            });


        } catch (error) {

            console.log(
                "PROFILE FETCH ERROR:",
                error
            );

        }

    };



    useEffect(() => {

        fetchProfile();

    }, []);




    const handleChange = (e) => {


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };





    const handleSubmit = async (e) => {


        e.preventDefault();


        try {


            await updateProfile(formData);


            alert(
                "Profile updated successfully"
            );


            fetchProfile();


        } catch (error) {


            console.log(
                "PROFILE UPDATE ERROR:",
                error
            );


        }


    };





    if (!profile) {


        return (

            <MainLayout>

                <div className="text-center mt-10">

                    Loading...

                </div>

            </MainLayout>

        );


    }





    return (


        <MainLayout>


            <div className="max-w-xl mx-auto mt-10 bg-white shadow rounded-xl p-6">


                <h1 className="text-3xl font-bold mb-6">

                    My Profile

                </h1>





                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >





                    <div>


                        <label className="block mb-2 font-semibold">

                            First Name

                        </label>



                        <input

                            type="text"

                            name="first_name"

                            value={formData.first_name}

                            onChange={handleChange}

                            className="w-full border p-3 rounded"

                        />


                    </div>







                    <div>


                        <label className="block mb-2 font-semibold">

                            Last Name

                        </label>



                        <input

                            type="text"

                            name="last_name"

                            value={formData.last_name}

                            onChange={handleChange}

                            className="w-full border p-3 rounded"

                        />


                    </div>







                    <div>


                        <label className="block mb-2 font-semibold">

                            Email

                        </label>



                        <input

                            type="email"

                            value={profile.email}

                            disabled

                            className="w-full border p-3 rounded bg-gray-100"

                        />


                    </div>







                    <div>


                        <label className="block mb-2 font-semibold">

                            Role

                        </label>



                        <input

                            value={profile.role}

                            disabled

                            className="w-full border p-3 rounded bg-gray-100"

                        />


                    </div>







                    <button

                        type="submit"

                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"

                    >

                        Save Changes

                    </button>





                </form>





            </div>


        </MainLayout>


    );


}