export default function CheckoutSummary({
  product,
  quantity,
  cartItems
}) {


  let subtotal = 0;


  if(product){

    subtotal = Number(product.price || 0) * (quantity || 1);

  }


  else if(cartItems){


    subtotal = cartItems.reduce(

      (total, item) =>

        total + Number(item.price || 0) * (item.quantity || 1),

      0

    );


  }



  const shipping = 99;

  const tax = 300;

  const total = subtotal + shipping + tax;



  return (

    <div className="border rounded-xl shadow-sm p-6">


      <h2 className="text-2xl font-bold mb-6">

        Order Summary

      </h2>




      <div className="space-y-4">


        {
          product && (

            <div className="flex justify-between">

              <span>
                Product
              </span>

              <span className="font-semibold">

                {product.name}

              </span>

            </div>

          )
        }




        {
          cartItems && (

            <div>

              {
                cartItems.map((item)=>(

                  <div

                  key={item.id}

                  className="flex justify-between"

                  >

                    <span>
                      {item.name}
                    </span>


                    <span>

                      x{item.quantity}

                    </span>


                  </div>

                ))
              }

            </div>

          )
        }





        <div className="flex justify-between">

          <span>
            Quantity
          </span>

          <span>

            {
              product
              ? quantity
              : cartItems?.length
            }

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