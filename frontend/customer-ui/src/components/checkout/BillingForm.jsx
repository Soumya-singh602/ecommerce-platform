import { useState } from "react";

export default function BillingForm({
  billingData,
  setBillingData
}) {


const handleChange = (e)=>{

  setBillingData({

    ...billingData,

    [e.target.name]: e.target.value

  });

};



return (

<div>

<h2 className="text-2xl font-bold mb-6">
Billing Details
</h2>


<div className="space-y-4">


<input

type="text"

name="name"

placeholder="Full Name"

value={billingData.name}

onChange={handleChange}

className="w-full border rounded-lg px-4 py-3"

/>



<input

type="email"

name="email"

placeholder="Email Address"

value={billingData.email}

onChange={handleChange}

className="w-full border rounded-lg px-4 py-3"

/>



<input

type="text"

name="phone"

placeholder="Phone Number"

value={billingData.phone}

onChange={handleChange}

className="w-full border rounded-lg px-4 py-3"

/>



<textarea

name="address"

placeholder="Shipping Address"

value={billingData.address}

onChange={handleChange}

rows="4"

className="w-full border rounded-lg px-4 py-3"

/>



<input

type="text"

name="city"

placeholder="City"

value={billingData.city}

onChange={handleChange}

className="w-full border rounded-lg px-4 py-3"

/>



<input

type="text"

name="pincode"

placeholder="Pincode"

value={billingData.pincode}

onChange={handleChange}

className="w-full border rounded-lg px-4 py-3"

/>



</div>


</div>

);

}