import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Form from "../components/EditForm";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Details() {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);
    const navigate = useNavigate();

    type Comment = {
        id: number;
        comment_text: string;
        sample_id: number;
    };

    type Sample = {
        id: number;
        sample_type: string;
        location: string;
        operator: string;
        created_at: string;
        comments: Comment[];
    };

    const [sample, setSample] = useState<Sample | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSample = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://127.0.0.1:8000/samples/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch sample");
                }
                const data = await res.json();
                setSample(data);
            } catch (error) {
               setSample(null);
               toast.error("Failed to load sample. Please try again later.");
               throw error;
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchSample();
    }, [id]);

    const formattedDate = useMemo(() => {
        if (!sample?.created_at) return "";
        return new Date(sample.created_at).toLocaleDateString();
    }, [sample?.created_at]);

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/samples/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error("Failed to delete sample");
            }
            toast.success("Sample deleted successfully!");
            navigate("/samples");
        } catch (error) {
            toast.error("Failed to delete sample. Please try again.");
            throw error;
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        setCommentLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:8000/comments/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    comment_text: newComment,
                    sample_id: Number(id),
                }),
            });
            if (res.ok) {
                const comment = await res.json();
                setSample((prev) =>
                    prev
                        ? { ...prev, comments: [...prev.comments, comment] }
                        : prev
                );
                setNewComment("");
                toast.success("Comment added successfully!");
                setShowCommentInput(false);
            }
        } finally {
            setCommentLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-indigo-950 to-black flex flex-col items-center pt-2 px-1 sm:px-2">
            <div className="w-full max-w-2xl">
                <header className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-tr from-cyan-400 to-indigo-600 rounded-full p-1.5 shadow">
                            <span className="text-xl sm:text-2xl">🧫</span>
                        </div>
                        <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight drop-shadow flex items-center gap-2">
                            <span className="inline-block bg-black/70 text-cyan-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-base font-bold tracking-widest border border-cyan-800 shadow">
                                #{id}
                            </span>
                            <span className="hidden sm:inline">Sample Details</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            className="flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow border-2 border-cyan-700 hover:scale-105 hover:from-cyan-400 hover:to-indigo-500 transition-all duration-200 text-sm"
                            onClick={() => setShowModal(true)}
                        >
                            <FaEdit size={14} />
                            <span className="hidden sm:inline">EDIT</span>
                        </button>
                        <button
                            className="ml-1 p-1.5 sm:p-2 rounded-full bg-gradient-to-tr from-red-700 via-red-500 to-pink-500 hover:from-red-600 hover:to-pink-400 border-2 border-red-400 shadow hover:scale-110 transition-all duration-200 flex items-center justify-center group"
                            title="Delete"
                            onClick={handleDelete}
                        >
                            <FaTrashAlt size={16} className="text-white group-hover:text-red-200 transition" />
                        </button>
                    </div>
                </header>

                {loading ? (
                    <p className="text-cyan-200 font-mono text-sm">Loading...</p>
                ) : sample ? (
                    <div className="bg-white/10 border border-cyan-700 rounded-xl shadow p-2 sm:p-3 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mb-3">
                            <div className="space-y-2">
                                <div>
                                    <span className="block text-[10px] uppercase font-bold text-cyan-400 tracking-widest">Type</span>
                                    <span className="text-xs sm:text-sm text-cyan-100 font-mono bg-black/60 px-1.5 sm:px-2 py-0.5 rounded border border-cyan-800 shadow-inner">
                                        {sample.sample_type}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase font-bold text-cyan-400 tracking-widest">Location</span>
                                    <span className="text-xs sm:text-sm text-cyan-100 font-mono bg-black/60 px-1.5 sm:px-2 py-0.5 rounded border border-cyan-800 shadow-inner">
                                        {sample.location}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <span className="block text-[10px] uppercase font-bold text-cyan-400 tracking-widest">Operator</span>
                                    <span className="text-xs sm:text-sm text-cyan-100 font-mono bg-black/60 px-1.5 sm:px-2 py-0.5 rounded border border-cyan-800 shadow-inner">
                                        {sample.operator}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase font-bold text-cyan-400 tracking-widest">Created At</span>
                                    <span className="text-xs sm:text-sm text-cyan-100 font-mono bg-black/60 px-1.5 sm:px-2 py-0.5 rounded border border-cyan-800 shadow-inner">
                                        {formattedDate}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-2">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-bold text-base sm:text-lg text-cyan-200 tracking-wide">Comments</h3>
                                <button
                                    className="flex items-center gap-1 bg-cyan-700 hover:bg-cyan-600 text-white px-2 py-1 rounded text-xs font-bold transition"
                                    onClick={() => setShowCommentInput((v) => !v)}
                                >
                                    <FaPlus size={10} />
                                    Add Comment
                                </button>
                            </div>
                            {showCommentInput && (
                                <div className="flex items-center gap-1 mb-2">
                                    <input
                                        className="flex-1 px-2 py-1 rounded border border-cyan-700 bg-black/40 text-cyan-100 font-mono text-xs"
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Enter your comment"
                                        disabled={commentLoading}
                                    />
                                    <button
                                        className="bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded font-bold text-xs transition"
                                        onClick={handleAddComment}
                                        disabled={commentLoading}
                                    >
                                        {commentLoading ? "Adding..." : "Add"}
                                    </button>
                                </div>
                            )}
                            <ul className="list-disc pl-4 sm:pl-5 text-cyan-100 space-y-0.5 font-mono text-xs sm:text-sm">
                                {sample.comments?.length > 0 ? (
                                    sample.comments.map((comment) => (
                                        <li key={comment.id}>{comment.comment_text}</li>
                                    ))
                                ) : (
                                    <li className="italic text-cyan-400">No comments available.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500 font-mono text-sm">Sample not found.</p>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
                    <div className="bg-gradient-to-br from-cyan-900 via-indigo-950 to-black rounded-2xl shadow-2xl p-3 sm:p-4 max-w-md w-full relative border-2 border-cyan-700">
                        <button
                            className="absolute top-2 right-2 text-cyan-300 hover:text-white text-xl font-bold transition"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h4 className="text-base sm:text-lg font-bold text-white mb-2 tracking-widest">Edit Sample Details</h4>
                        <Form />
                    </div>
                </div>
            )}
        </div>
    );
}
