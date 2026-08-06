import { useEffect, useState } from "react";

import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

import {
    createStripeCustomer,
    createSetupIntent,
    saveCard
} from "../services/paymentService";


export default function AddCard() {

    const stripe = useStripe();

    const elements = useElements();

    const [clientSecret, setClientSecret] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const setup = async () => {

            try {

                await createStripeCustomer();

                const response =
                    await createSetupIntent();


                setClientSecret(
                    response.client_secret
                );


            } catch(error){

                console.log(
                    "SETUP ERROR:",
                    error
                );

                alert(
                    "Unable to initialize card setup"
                );

            }
            finally{

                setLoading(false);

            }

        };


        setup();

    },[]);



    const handleSubmit = async(e)=>{

        e.preventDefault();


        if(!stripe || !elements || !clientSecret){

            return;

        }


        const card =
            elements.getElement(
                CardElement
            );


        const result =
            await stripe.confirmCardSetup(

                clientSecret,

                {
                    payment_method:{
                        card: card
                    }
                }

            );


        if(result.error){

            alert(
                result.error.message
            );

            return;

        }


        const paymentMethodId =
            result.setupIntent.payment_method;


        console.log(
            "PAYMENT METHOD:",
            paymentMethodId
        );


        try {


            const response =
                await saveCard({

                    payment_method_id:
                    paymentMethodId

                });


            console.log(
                "SAVE CARD RESPONSE:",
                response
            );


            alert(
                "Card Saved Successfully"
            );


        }
        catch(error){

            console.log(
                "SAVE CARD ERROR:",
                error
            );

            alert(
                "Card save failed"
            );

        }


    };



    if(loading){

        return (
            <div className="text-center mt-10">
                Loading...
            </div>
        );

    }



    return (

        <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-xl">


            <h1 className="text-2xl font-bold mb-5">
                Save Card
            </h1>


            <form onSubmit={handleSubmit}>


                <div className="border p-4 rounded">

                    <CardElement />

                </div>


                <button

                    type="submit"

                    className="mt-5 bg-blue-600 text-white px-6 py-3 rounded"

                >

                    Save Card

                </button>


            </form>


        </div>

    );

}