export default function CustomerToolbar({

    search,

    setSearch

}) {

    return (

        <div className="bg-white rounded-2xl shadow p-5 mb-6">

            <input

                type="text"

                placeholder="Search Customer..."

                value={search}

                onChange={(e) => setSearch(e.target.value)}

                className="w-full border rounded-xl px-4 py-3"

            />

        </div>

    );

}