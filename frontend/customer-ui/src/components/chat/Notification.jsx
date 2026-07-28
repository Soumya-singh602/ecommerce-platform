import { useEffect } from "react";

export default function Notification({
    show,
    message,
    onClose
}) {

    console.log("NOTIFICATION:", show, message);

    useEffect(() => {

        if (!show) return;

        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);

    }, [show, onClose]);

    if (!show) return null;

    return (
        <div
            className="
                fixed
                top-5
                right-5
                bg-green-600
                text-white
                px-5
                py-3
                rounded-lg
                shadow-2xl
                z-[9999]
                border
                border-white
            "
        >
            <div className="font-semibold">
                📩 New Message
            </div>

            <div className="mt-1">
                {message}
            </div>
        </div>
    );
}