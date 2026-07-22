const users = [

    {
        id:1,
        name:"Rahul Sharma"
    },

    {
        id:2,
        name:"Priya Singh"
    },

    {
        id:3,
        name:"Amit Kumar"
    }

];

export default function ChatSidebar(){

    return(

        <div className="w-80 border-r">

            <div className="p-5 font-bold text-xl border-b">

                Conversations

            </div>

            {

                users.map(user=>(

                    <div
                    key={user.id}
                    className="p-4 border-b hover:bg-slate-100 cursor-pointer"
                    >

                        {user.name}

                    </div>

                ))

            }

        </div>

    )

}