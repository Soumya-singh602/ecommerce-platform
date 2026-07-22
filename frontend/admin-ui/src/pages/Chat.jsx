import DashboardLayout from "../layouts/DashboardLayout";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

export default function Chat() {

    return (

        <DashboardLayout>

            <div className="bg-white rounded-2xl shadow overflow-hidden h-[80vh] flex">

                {/* Left Sidebar */}

                <ChatSidebar />

                {/* Right Section */}

                <div className="flex-1 flex flex-col">

                    <ChatWindow />

                    <ChatInput />

                </div>

            </div>

        </DashboardLayout>

    );

}