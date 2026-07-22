export default function ProductToolbar() {

    return (

        <div className="bg-white rounded-2xl shadow p-5 mb-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


                {/* Search */}

                <input

                    type="text"

                    placeholder="Search products..."

                    className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"

                />


                {/* Category */}

                <select

                    className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"

                >

                    <option>

                        All Categories

                    </option>

                    <option>

                        Mobiles

                    </option>

                    <option>

                        Laptops

                    </option>

                    <option>

                        Accessories

                    </option>

                </select>



                {/* Stock */}

                <select

                    className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"

                >

                    <option>

                        All Stock

                    </option>

                    <option>

                        In Stock

                    </option>

                    <option>

                        Out of Stock

                    </option>

                </select>


            </div>

        </div>

    );

}