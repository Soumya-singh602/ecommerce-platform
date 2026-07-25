export default function Pagination({
    page,
    setPage,
    totalPages
}) {


    const handlePrevious = ()=>{

        if(page > 1){

            setPage(page - 1);

        }

    };



    const handleNext = ()=>{


        if(page < totalPages){

            setPage(page + 1);

        }

    };



    return (

    <div className="flex justify-center items-center gap-2 mt-10">


        <button

        onClick={handlePrevious}

        disabled={page === 1}

        className="
        px-4
        py-2
        border
        rounded-lg
        hover:bg-gray-100
        disabled:opacity-50
        "

        >

        Previous

        </button>




        {
            Array.from(
                {length: totalPages},
                (_,index)=>index+1
            )
            .map((number)=>(


                <button

                key={number}

                onClick={()=>setPage(number)}

                className={

                page === number

                ?

                "px-4 py-2 rounded-lg bg-blue-600 text-white"

                :

                "px-4 py-2 border rounded-lg hover:bg-gray-100"

                }

                >

                {number}

                </button>


            ))
        }





        <button

        onClick={handleNext}

        disabled={page === totalPages}

        className="
        px-4
        py-2
        border
        rounded-lg
        hover:bg-gray-100
        disabled:opacity-50
        "

        >

        Next

        </button>



    </div>

    );


}