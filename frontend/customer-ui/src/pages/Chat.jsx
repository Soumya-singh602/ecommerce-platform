
import { useEffect, useState } from "react";
import { Send, MessageCircle, Headphones } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import { sendMessage } from "../services/chatSocket";
import { getChatHistory } from "../api/chatApi";
import { useChat } from "../context/ChatContext";

export default function Chat() {
    const [text, setText] = useState("");

    const {
        socketRef,
        messages,
        setMessages,
    } = useChat();

    const adminId = String(
        import.meta.env.VITE_ADMIN_ID
    );

    let user = null;

    try {
        const storedUser = localStorage.getItem("user");

        user = storedUser
            ? JSON.parse(storedUser)
            : null;
    } catch (error) {
        console.error("Invalid user data:", error);
    }

    const customerId = user?.user_id
        ? String(user.user_id)
        : null;

    // =========================
    // LOAD CHAT HISTORY
    // =========================

    useEffect(() => {
        if (!customerId) {
            console.log("CUSTOMER ID NOT FOUND");
            return;
        }

        const loadHistory = async () => {
            try {
                const data = await getChatHistory(
                    adminId,
                    customerId
                );

                const uniqueMessages = data.filter(
                    (msg, index, self) =>
                        index ===
                        self.findIndex(
                            (item) => item.id === msg.id
                        )
                );

                setMessages(uniqueMessages);
            } catch (error) {
                console.log("HISTORY ERROR:", error);
            }
        };

        loadHistory();
    }, [adminId, customerId, setMessages]);

    // =========================
    // SEND MESSAGE
    // =========================

    const handleSend = () => {
        if (!text.trim()) {
            return;
        }

        sendMessage(
            socketRef.current,
            text.trim()
        );

        setText("");
    };

    // =========================
    // ENTER TO SEND
    // =========================

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <MainLayout>

            <div className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-8">

                <div className="max-w-5xl mx-auto">

                    {/* ================= PAGE HEADER ================= */}

                    <div className="mb-6">

                        <p className="text-sm font-medium text-indigo-600 mb-1">
                            CUSTOMER SUPPORT
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Help & Support
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Have a question? Our support team is here to help.
                        </p>

                    </div>


                    {/* ================= CHAT CARD ================= */}

                    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

                        {/* ================= CHAT HEADER ================= */}

                        <div className="px-5 md:px-7 py-5 border-b border-gray-100">

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-4">

                                    <div className="relative">

                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">

                                            <Headphones size={25} />

                                        </div>

                                        <span className="absolute -right-1 -bottom-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />

                                    </div>


                                    <div>

                                        <h2 className="font-bold text-gray-900 text-lg">
                                            Admin Support
                                        </h2>

                                        <div className="flex items-center gap-2 mt-1">

                                            <span className="w-2 h-2 bg-green-500 rounded-full" />

                                            <span className="text-sm text-green-600 font-medium">
                                                Online
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50">

                                    <MessageCircle
                                        size={17}
                                        className="text-indigo-600"
                                    />

                                    <span className="text-sm text-gray-500">
                                        Live Support
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* ================= MESSAGES ================= */}

                        <div className="h-[500px] md:h-[560px] overflow-y-auto px-4 md:px-7 py-6 bg-gray-50">

                            {messages.length === 0 ? (

                                <div className="h-full flex items-center justify-center">

                                    <div className="text-center max-w-sm">

                                        <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center">

                                            <MessageCircle size={34} />

                                        </div>

                                        <h3 className="text-xl font-bold text-gray-800 mt-5">
                                            Start a conversation
                                        </h3>

                                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                                            Send us a message and our support
                                            team will get back to you.
                                        </p>

                                    </div>

                                </div>

                            ) : (

                                <div className="space-y-5">

                                    {messages.map(
                                        (msg, index) => {

                                            const isCustomer =
                                                String(msg.sender_id) ===
                                                String(customerId);

                                            return (

                                                <div
                                                    key={`${msg.id}-${index}`}
                                                    className={`flex ${
                                                        isCustomer
                                                            ? "justify-end"
                                                            : "justify-start"
                                                    }`}
                                                >

                                                    <div
                                                        className={`flex flex-col ${
                                                            isCustomer
                                                                ? "items-end"
                                                                : "items-start"
                                                        } max-w-[85%] md:max-w-[65%]`}
                                                    >

                                                        <span className="text-xs text-gray-400 mb-1.5 px-2">
                                                            {isCustomer
                                                                ? "You"
                                                                : msg.sender || "Admin Support"}
                                                        </span>


                                                        <div
                                                            className={`px-4 py-3.5 text-sm leading-relaxed shadow-sm ${
                                                                isCustomer
                                                                    ? "bg-indigo-600 text-white rounded-2xl rounded-br-md"
                                                                    : "bg-white text-gray-700 border border-gray-200 rounded-2xl rounded-bl-md"
                                                            }`}
                                                        >

                                                            {msg.message}

                                                        </div>

                                                    </div>

                                                </div>

                                            );
                                        }
                                    )}

                                </div>

                            )}

                        </div>


                        {/* ================= INPUT ================= */}

                        <div className="border-t border-gray-100 bg-white p-4 md:p-5">

                            <div className="flex items-center gap-3">

                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) =>
                                        setText(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your message..."
                                    className="
                                        flex-1
                                        h-12
                                        px-4
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        text-sm
                                        text-gray-800
                                        outline-none
                                        transition
                                        focus:bg-white
                                        focus:border-indigo-500
                                        focus:ring-2
                                        focus:ring-indigo-100
                                    "
                                />


                                <button
                                    type="button"
                                    onClick={handleSend}
                                    disabled={!text.trim()}
                                    className="
                                        h-12
                                        w-12
                                        md:w-auto
                                        md:px-6
                                        rounded-xl
                                        bg-indigo-600
                                        hover:bg-indigo-700
                                        disabled:bg-gray-200
                                        disabled:text-gray-400
                                        text-white
                                        font-semibold
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        transition
                                    "
                                >

                                    <Send size={18} />

                                    <span className="hidden md:inline">
                                        Send
                                    </span>

                                </button>

                            </div>


                            <p className="text-xs text-gray-400 mt-2 px-1">
                                Press Enter to send your message
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>
    );
}
