import { Dialog } from "@headlessui/react";
import { useEffect } from "react";
import { useFriendsStore } from "../../store/useFriendsStore";

export default function FriendRequestsModal({ isOpen, onClose }) {
    const {
        requests,
        getFriendRequests,
        isLoadingRequests,
        acceptRequest,
        declineRequest,
    } = useFriendsStore();

    useEffect(() => {
        if (isOpen) {
            getFriendRequests();
        }
    }, [isOpen, getFriendRequests]);

    const handleAccept = async (requestId) => {
        await acceptRequest(requestId);
        getFriendRequests();
    };

    const handleDecline = async (requestId) => {
        await declineRequest(requestId);
        getFriendRequests();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Friend Requests</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-red-500 text-xl font-bold"
                        >
                            ×
                        </button>
                    </div>

                    {/* Content */}
                    {isLoadingRequests ? (
                        <div className="text-center py-6 text-gray-400 text-sm">Loading...</div>
                    ) : requests.length === 0 ? (
                        <div className="text-center py-6 text-gray-400 text-sm">No pending requests.</div>
                    ) : (
                        <ul className="space-y-4 max-h-[300px] overflow-y-auto">
                            {requests.map((req) => (
                                <li key={req._id} className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={req.requester.avatar || "/default-avatar.png"}
                                            alt={req.requester.username}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <span className="font-medium text-sm text-gray-800">{req.requester.username}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAccept(req._id)}
                                            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleDecline(req._id)}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
