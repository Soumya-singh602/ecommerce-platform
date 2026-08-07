import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";


import {
  deleteSavedCard
} from "../../api/payment";



export default function PaymentMethod({

  paymentType,
  setPaymentType,

  savedCards,
  setSavedCards,

  selectedCard,
  setSelectedCard,

  loadingCards

}) {



  const handleDeleteCard = async (cardId) => {


    try {


      const response = await deleteSavedCard(cardId);



      if (response.success) {


        setSavedCards(

          prev =>

          prev.filter(
            card =>
            card.id !== cardId
          )

        );



        if (selectedCard?.id === cardId) {


          setSelectedCard(null);

          setPaymentType("new-card");


        }


      }


    } catch (error) {


      console.log(
        "DELETE CARD ERROR:",
        error
      );


    }


  };



  return (

    <div className="border rounded-xl shadow-sm p-6 mt-8">


      <h2 className="text-2xl font-bold mb-6">

        Payment Method

      </h2>



      {/* =====================================
          SAVED CARDS
      ====================================== */}


      {loadingCards ? (


        <div className="text-gray-500 mb-5">

          Loading saved cards...

        </div>



      ) : savedCards && savedCards.length > 0 ? (



        <div className="space-y-3 mb-6">


          <h3 className="text-lg font-semibold">

            Saved Cards

          </h3>



          {savedCards.map((card) => (



            <label

              key={card.id}

              className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition ${
                paymentType === "saved" &&
                selectedCard?.id === card.id
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200"
              }`}

            >



              <div className="flex items-center gap-3">



                <input

                  type="radio"

                  name="payment"


                  checked={

                    paymentType === "saved" &&

                    selectedCard?.id === card.id

                  }


                  onChange={() => {


                    setSelectedCard(card);

                    setPaymentType("saved");


                  }}

                />




                <div>



                  <p className="font-medium capitalize">


                    {card.brand}


                    {" **** "}


                    {card.last4}


                  </p>




                  <p className="text-sm text-gray-500">


                    Expires{" "}


                    {String(card.exp_month).padStart(

                      2,

                      "0"

                    )}


                    /


                    {card.exp_year}


                  </p>



                </div>



              </div>





              <div className="flex items-center gap-3">



                {card.is_default && (


                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">

                    Default

                  </span>


                )}




                <button


                  type="button"


                  onClick={(e)=>{


                    e.preventDefault();

                    e.stopPropagation();


                    handleDeleteCard(card.id);


                  }}


                  className="text-sm text-red-600 hover:text-red-800"


                >

                  Delete

                </button>



              </div>




            </label>



          ))}



        </div>




      ) : (



        <div className="text-gray-500 mb-5">


          No saved cards found.


        </div>



      )}






      {/* =====================================
          NEW CARD
      ====================================== */}



      <label

        className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer mb-5 ${
          paymentType === "new-card"
            ? "border-green-600 bg-green-50"
            : "border-gray-200"
        }`}

      >



        <input

          type="radio"

          name="payment"

          value="new-card"

          checked={paymentType === "new-card"}


          onChange={() => {


            setSelectedCard(null);

            setPaymentType("new-card");


          }}

        />



        <span className="font-medium">

          Use a new card

        </span>



      </label>






      {/* =====================================
          NEW CARD FIELDS
      ====================================== */}



      {paymentType === "new-card" && (


        <div className="space-y-4 mb-6">


          <div>

            <label className="block text-sm font-medium mb-2">

              Card Number

            </label>


            <div className="border p-3 rounded-lg">

              <CardNumberElement />

            </div>


          </div>




          <div>


            <label className="block text-sm font-medium mb-2">

              Expiry

            </label>


            <div className="border p-3 rounded-lg">


              <CardExpiryElement />


            </div>


          </div>




          <div>


            <label className="block text-sm font-medium mb-2">

              CVC

            </label>


            <div className="border p-3 rounded-lg">


              <CardCvcElement />


            </div>


          </div>




          <p className="text-sm text-gray-500">


            This card will be securely saved to

            your account for future payments.


          </p>



        </div>


      )}






      {/* =====================================
          COD
      ====================================== */}



      <label

        className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer ${
          paymentType === "cod"
            ? "border-green-600 bg-green-50"
            : "border-gray-200"
        }`}

      >



        <input

          type="radio"

          name="payment"

          value="cod"

          checked={paymentType === "cod"}


          onChange={() => {


            setSelectedCard(null);

            setPaymentType("cod");


          }}

        />



        <span>

          Cash on Delivery (COD)

        </span>



      </label>






      {/* =====================================
          UPI
      ====================================== */}



      <label

        className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer mt-3 ${
          paymentType === "upi"
            ? "border-green-600 bg-green-50"
            : "border-gray-200"
        }`}

      >



        <input

          type="radio"

          name="payment"

          value="upi"

          checked={paymentType === "upi"}


          onChange={() => {


            setSelectedCard(null);

            setPaymentType("upi");


          }}

        />



        <span>

          UPI Payment

        </span>



      </label>



    </div>

  );

}