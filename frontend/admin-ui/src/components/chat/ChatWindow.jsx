const messages = [

    {
        id: 1,
        sender: "Rahul",
        text: "Hello Sir",
        me: false,
    },

    {
        id: 2,
        sender: "Admin",
        text: "Hello Rahul, how can I help you?",
        me: true,
    },

    {
        id: 3,
        sender: "Rahul",
        text: "Is iPhone 15 available?",
        me: false,
    },

    {
        id: 4,
        sender: "Admin",
        text: "Yes, it is available in stock.",
        me: true,
    }

];

export default function ChatWindow() {

    return (

        <div className="flex-1 flex flex-col">

            {/* Chat Header */}

            <div className="border-b p-5">

                <h2 className="text-xl font-bold">

                    Rahul Sharma

                </h2>

                <p className="text-sm text-gray-500">

                    Online

                </p>

            </div>


            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">

                {

                    messages.map((message) => (

                        <div
                            key={message.id}
                            className={`flex ${message.me ? "justify-end" : "justify-start"}`}
                        >

                            <div
                                className={`max-w-sm px-4 py-3 rounded-2xl ${
                                    message.me
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white shadow"
                                }`}
                            >

                                <p className="text-sm font-semibold mb-1">

                                    {message.sender}

                                </p>

                                <p>

                                    {message.text}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}