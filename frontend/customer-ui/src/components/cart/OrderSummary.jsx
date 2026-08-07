import { useNavigate } from "react-router-dom";


export default function OrderSummary({ cartItems }) {


const navigate = useNavigate();


// Calculate subtotal

const subtotal = cartItems.reduce(

(total, item) => {

return total + (
Number(item.price) * Number(item.quantity || 1)
);

},

0

);


// Charges

const shipping = subtotal > 0 ? 99 : 0;

const tax = Math.round(subtotal * 0.10);


// Final Total

const totalAmount = subtotal + shipping + tax;



return (

<div className="border rounded-xl shadow-sm p-6">


<h2 className="text-2xl font-bold mb-6">

Order Summary

</h2>




<div className="space-y-4">



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
₹{totalAmount}
</span>


</div>



</div>





<button


onClick={() => {


navigate("/checkout", {

state: {

cartItems: cartItems

}

});


}}



className="
w-full
mt-8
bg-blue-600
text-white
py-3
rounded-lg
hover:bg-blue-700
transition
"


>


Proceed to Checkout


</button>



</div>


);

}