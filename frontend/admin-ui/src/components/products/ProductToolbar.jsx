export default function ProductToolbar({
    search,
    setSearch,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice
}) {


    return (

        <div className="bg-white rounded-2xl shadow p-5 mb-6">


            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">


                {/* Search */}

                <input

                    type="text"

                    placeholder="Search products..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

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



                {/* Min Price */}

                <input

                    type="number"

                    placeholder="Min Price"

                    value={minPrice}

                    onChange={(e)=>setMinPrice(e.target.value)}

                    className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"

                />



                {/* Max Price */}

                <input

                    type="number"

                    placeholder="Max Price"

                    value={maxPrice}

                    onChange={(e)=>setMaxPrice(e.target.value)}

                    className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"

                />


            </div>


        </div>

    );

}