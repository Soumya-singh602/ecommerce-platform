import { useEffect, useState } from "react";

import { getConversations } from "../../services/chatService";

export default function ChatSidebar({

    currentUserId,

    selectedUser,

    setSelectedUser

}) {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchConversations = async () => {

        try {

            const data = await getConversations(currentUserId);

            setUsers(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchConversations();

    }, []);

    return (

        <div className="w-80 border-r">

            <div className="p-5 font-bold text-xl border-b">

                Conversations

            </div>

            {

                loading ? (

                    <div className="p-5">

                        Loading...

                    </div>

                ) : (

                    users.map((user) => (

                        <div

                            key={user.user_id}

                            onClick={() => setSelectedUser(user)}

                            className={
                                selectedUser?.user_id === user.user_id

                                    ? "p-4 border-b bg-indigo-100 cursor-pointer"

                                    : "p-4 border-b hover:bg-slate-100 cursor-pointer"
                            }

                        >

                            <div className="font-semibold">

                                {user.name}

                            </div>

                            <div className="text-sm text-gray-500 truncate">

                                {user.last_message}

                            </div>

                            {

                                user.unread_count > 0 && (

                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">

                                        {user.unread_count}

                                    </span>

                                )

                            }

                        </div>

                    ))

                )

            }

        </div>

    );

}