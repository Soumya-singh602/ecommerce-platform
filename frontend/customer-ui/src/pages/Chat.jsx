import { useEffect, useState } from "react";
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

                console.log("HISTORY:", data);

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
    }, [
        adminId,
        customerId,
        setMessages,
    ]);

    // =========================
    // SEND MESSAGE
    // =========================

    const handleSend = () => {
        if (!text.trim()) {
            return;
        }

        sendMessage(
            socketRef.current,
            text
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

            <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-6 md:px-8">

                <div className="max-w-6xl mx-auto">

                    {/* ================= HEADER ================= */}

                    <div className="mb-6">

                        <h1 className="text-3xl font-bold text-slate-800">
                            Chat
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Chat with our support team
                        </p>

                    </div>


                    {/* ================= CHAT CARD ================= */}

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                        {/* ================= CHAT HEADER ================= */}

                        <div className="h-20 px-6 border-b flex items-center justify-between">

                            <div className="flex items-center gap-4">

                                {/* ADMIN AVATAR */}

                                <div className="relative">

                                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                                        A
                                    </div>

                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />

                                </div>


                                <div>

                                    <h2 className="font-semibold text-slate-800">
                                        Admin Support
                                    </h2>

                                    <p className="text-sm text-green-600">
                                        Online
                                    </p>

                                </div>

                            </div>


                            <div className="text-sm text-gray-400">
                                Support
                            </div>

                        </div>


                        {/* ================= MESSAGES ================= */}

                        <div className="h-[500px] md:h-[550px] overflow-y-auto p-5 md:p-6 bg-slate-50">

                            {messages.length === 0 ? (

                                <div className="h-full flex items-center justify-center">

                                    <div className="text-center">

                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl">
                                            💬
                                        </div>

                                        <h3 className="font-semibold text-slate-700">
                                            Start a conversation
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Send a message to our admin team.
                                        </p>

                                    </div>

                                </div>

                            ) : (

                                <div className="space-y-4">

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
                                                        className={`max-w-[75%] md:max-w-[60%] ${
                                                            isCustomer
                                                                ? "items-end"
                                                                : "items-start"
                                                        } flex flex-col`}
                                                    >

                                                        {/* SENDER */}

                                                        <span className="text-xs text-gray-400 mb-1 px-1">
                                                            {isCustomer
                                                                ? "You"
                                                                : msg.sender || "Admin"}
                                                        </span>


                                                        {/* MESSAGE */}

                                                        <div
                                                            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                                                isCustomer
                                                                    ? "bg-indigo-600 text-white rounded-br-md"
                                                                    : "bg-white text-slate-700 border border-gray-100 rounded-bl-md"
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


                        {/* ================= MESSAGE INPUT ================= */}

                        <div className="border-t bg-white p-4">

                            <div className="flex items-center gap-3">

                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) =>
                                        setText(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your message..."
                                    className="flex-1 h-12 border border-gray-200 rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                />

                                <button
                                    onClick={handleSend}
                                    disabled={!text.trim()}
                                    className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition"
                                >
                                    Send
                                </button>

                            </div>

                            <p className="text-xs text-gray-400 mt-2 px-1">
                                Press Enter to send
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>
    );
}