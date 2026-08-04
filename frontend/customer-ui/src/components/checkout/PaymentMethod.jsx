import { CardElement } from "@stripe/react-stripe-js";


export default function PaymentMethod({
  paymentType,
  setPaymentType
}) {


  return (

    <div className="border rounded-xl shadow-sm p-6 mt-8">


      <h2 className="text-2xl font-bold mb-6">
        Payment Method
      </h2>



      <div className="space-y-4">


        <label className="flex items-center gap-3 cursor-pointer">

          <input

            type="radio"

            name="payment"

            value="cod"

            checked={paymentType === "cod"}

            onChange={(e)=>setPaymentType(e.target.value)}

          />

          <span>
            Cash on Delivery (COD)
          </span>


        </label>





        <label className="flex items-center gap-3 cursor-pointer">


          <input

            type="radio"

            name="payment"

            value="card"

            checked={paymentType === "card"}

            onChange={(e)=>setPaymentType(e.target.value)}

          />


          <span>
            Credit / Debit Card
          </span>


        </label>





        {
          paymentType === "card" && (

            <div className="border rounded-lg p-4 mt-4">


              <CardElement />


            </div>

          )
        }





        <label className="flex items-center gap-3 cursor-pointer">


          <input

            type="radio"

            name="payment"

            value="upi"

            checked={paymentType === "upi"}

            onChange={(e)=>setPaymentType(e.target.value)}

          />


          <span>
            UPI Payment
          </span>


        </label>



      </div>



    </div>

  );

}