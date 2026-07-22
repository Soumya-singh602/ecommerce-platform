export default function CheckoutSummary({
  product,
  quantity
}) {


  const subtotal = Number(product?.price || 0) * quantity;

  const shipping = 99;

  const tax = 300;

  const total = subtotal + shipping + tax;



  return (

    <div className="border rounded-xl shadow-sm p-6">


      <h2 className="text-2xl font-bold mb-6">

        Order Summary

      </h2>




      <div className="space-y-4">



        <div className="flex justify-between">

          <span>
            Product
          </span>

          <span className="font-semibold">

            {product?.name}

          </span>

        </div>




        <div className="flex justify-between">

          <span>
            Quantity
          </span>

          <span>

            {quantity}

          </span>

        </div>




        <div className="flex justify-between">

          <span>
            Subtotal
          </span>

          <span>

            ₹{subtotal}

          </span>

        </div>




        <div className="flex justify-between">

          <span>
            Shipping
          </span>

          <span>

            ₹{shipping}

          </span>

        </div>




        <div className="flex justify-between">

          <span>
            Tax
          </span>

          <span>

            ₹{tax}

          </span>

        </div>




        <hr />




        <div className="flex justify-between text-xl font-bold">

          <span>
            Total
          </span>


          <span>

            ₹{total}

          </span>


        </div>



      </div>



    </div>

  );

}