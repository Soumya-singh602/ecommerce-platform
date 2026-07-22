import { Send } from "lucide-react";

export default function ChatInput() {

    return (

        <div className="border-t bg-white p-4">

            <div className="flex gap-3">

                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-xl flex items-center gap-2"
                >

                    <Send size={18} />

                    Send

                </button>

            </div>

        </div>

    );

}