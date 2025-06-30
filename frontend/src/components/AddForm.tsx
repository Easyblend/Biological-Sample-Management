import { useState } from "react";
import React from "react";
import { toast } from "react-toastify";

interface FormProps {
    onSuccess: () => void;
    onClose: () => void;
}

export default function Form({ onSuccess, onClose }: FormProps) {
    const [sampleType, setSampleType] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [operator, setOperator] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");

        // Simple validation
        if (!sampleType || !location || !operator || !date) {
            setMessage("All fields are required.");
            return;
        }

        setLoading(true);
        const payload = {
            sample_type: sampleType,
            location,
            operator,
            created_at: date,
        };
        try {
            const res = await fetch("http://127.0.0.1:8000/samples/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Failed to add sample");
            setMessage("Sample added!");
            setSampleType("");
            setLocation("");
            setOperator("");
            setDate("");

            onSuccess();
            onClose();
        } catch {
            setMessage("Error adding sample");
            toast.error("Failed to add sample. Server error occured");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-gray-400 font-medium mb-1">Type</label>
                <input
                    type="text"
                    className="w-full text-gray-100 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={sampleType}
                    onChange={e => setSampleType(e.target.value)}
                    placeholder="e.g. Water, Soil, Air"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-400 font-medium mb-1">Location</label>
                <input
                    type="text"
                    className="w-full border text-gray-100 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Lake Victoria, Amazon Rainforest"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-400 font-medium mb-1">Operator</label>
                <input
                    type="text"
                    className="w-full border text-gray-100 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={operator}
                    onChange={e => setOperator(e.target.value)}
                    placeholder="e.g. John Doe, Jane Smith"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-400 font-medium mb-1">Date</label>
                <input
                    type="date"
                    className="w-full border text-gray-100 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition"
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>
            {message && <div className="text-center text-sm mt-2">{message}</div>}
        </form>
    );
}
