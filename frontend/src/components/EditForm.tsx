import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type BioSample = {
    id?: number;
    sample_type: string;
    location: string;
    operator: string;
    created_at: string; // ISO date string
};

export default function Form() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState<BioSample>({
        sample_type: "",
        location: "",
        operator: "",
        created_at: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch sample data if editing
    useEffect(() => {
        if (isEdit) {
            setLoading(true);
            fetch(`http://127.0.0.1:8000/samples/${id}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch sample");
                    return res.json();
                })
                .then((data) => {
                    setForm({
                        sample_type: data.sample_type,
                        location: data.location,
                        operator: data.operator,
                        created_at: data.created_at,
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                    toast.error("Failed to load sample. Please try again later.");
                });
        }
    }, [id, isEdit]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const method = isEdit ? "PUT" : "POST";
        const url = isEdit ? `http://127.0.0.1:8000/samples/${id}` : "http://127.0.0.1:8000/samples/";
        const body = JSON.stringify(form);

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body,
            });
            if (!res.ok) throw new Error("Failed to save sample");
            navigate("/samples");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-gray-100 font-medium mb-1">Type</label>
                <input
                    type="text"
                    name="sample_type"
                    className="w-full border border-gray-300 text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.sample_type}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className="block text-gray-100 font-medium mb-1">Location</label>
                <input
                    type="text"
                    name="location"
                    className="w-full border border-gray-300 text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className="block text-gray-100 font-medium mb-1">Operator</label>
                <input
                    type="text"
                    name="operator"
                    className="w-full border border-gray-300 text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.operator}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className="block text-gray-100 font-medium mb-1">Created At</label>
                <input
                    type="date"
                    name="created_at"
                    className="w-full border border-gray-300 text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.created_at}
                    onChange={handleChange}
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition"
                disabled={loading}
            >
                {isEdit ? "Save Changes" : "Create Sample"}
            </button>
        </form>
    );
}
