import { useEffect, useState } from "react";

import {
getSavedCards
} from "../services/paymentService";

import MainLayout from "../layouts/MainLayout";


export default function SavedCards(){


const [cards,setCards] = useState([]);

const [loading,setLoading] = useState(true);



useEffect(()=>{


    const loadCards = async()=>{


        try{


            const response =
                await getSavedCards();


            setCards(
                response.data || []
            );


        }
        catch(error){

            console.log(
                "GET SAVED CARD ERROR",
                error
            );

        }
        finally{

            setLoading(false);

        }

    };


    loadCards();


},[]);




if(loading){

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


    <div className="max-w-xl mx-auto mt-10">


        <h1 className="text-3xl font-bold mb-6">

            My Saved Cards

        </h1>



        {
            cards.length === 0 ?

            (

                <p>
                    No saved cards
                </p>

            )

            :

            cards.map((card)=>(


                <div

                key={card.id}

                className="
                border
                rounded-lg
                p-5
                mb-4
                shadow
                "

                >


                    <h2 className="text-xl font-semibold">

                        💳 {card.brand.toUpperCase()} **** {card.last4}

                    </h2>



                    <p>

                        Expiry:
                        {" "}
                        {card.exp_month}/
                        {card.exp_year}

                    </p>


                </div>


            ))

        }


    </div>


</MainLayout>

);


}