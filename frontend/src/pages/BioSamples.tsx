import { useState, useEffect } from "react";
import AddForm from "../components/AddForm";
import { toast } from "react-toastify";

type Sample = {
    id: number;
    sample_type: string;
    location: string;
};

export default function BioSamples() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [samples, setSamples] = useState<Sample[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/samples/")
            .then(res => res.json())
            .then(data => {
                setSamples(data);
                setLoading(false);
            })
            .catch(() =>{
                setSamples([]);
                setLoading(false);
                toast.error("Failed to load samples. Please try again later.");
            });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-indigo-950 to-black flex flex-col items-center pt-10 px-2">
            <div className="w-full max-w-3xl">
                <header className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-tr from-cyan-400 to-indigo-600 rounded-full p-2 shadow">
                            <span className="text-2xl">🧬</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow">
                            BioSamples
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-4 md:mt-0 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow font-semibold hover:scale-105 hover:from-cyan-400 hover:to-indigo-500 transition-all duration-200 text-sm"
                    >
                        + New Sample
                    </button>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loading ? (
                        <div className="text-white col-span-full text-center text-base">Loading...</div>
                    ) : samples.length === 0 ? (
                        <div className="text-white col-span-full text-center text-base">No samples found.</div>
                    ) : (
                        samples.map(sample => (
                            <div
                                key={sample.id}
                                className="relative bg-white/10 border border-cyan-700 rounded-xl shadow p-4 flex flex-col group overflow-hidden hover:scale-105 transition-transform duration-200"
                            >
                                <div className="absolute -top-6 -right-6 opacity-20 text-[4rem] pointer-events-none select-none">
                                    🧫
                                </div>
                                <div className="mb-3">
                                    <span className="inline-block bg-cyan-700/80 text-cyan-100 px-2 py-0.5 rounded-full text-[10px] font-bold mb-2 tracking-widest uppercase shadow">
                                        
                                        Sample #{sample.id}
                                    </span>
                                    <h2 className="text-lg font-bold text-white mt-2 mb-1 drop-shadow">
                                       {sample.sample_type}
                                    </h2>
                                    <p className="text-cyan-100/80 text-xs">
                                        <span className="font-semibold text-cyan-200">Location:</span> {sample.location}
                                    </p>
                                </div>
                                <a
                                    href={`/samples/${sample.id}`}
                                    className="mt-auto inline-flex items-center gap-1 bg-cyan-700/90 text-white px-3 py-1.5 rounded font-semibold shadow hover:bg-cyan-600 transition text-xs"
                                >
                                    View Details
                                    <span className="text-base">→</span>
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
                    <div className="bg-gradient-to-br from-cyan-900 via-indigo-950 to-black rounded-2xl shadow-xl p-6 max-w-md w-full relative border border-cyan-700">
                        <button
                            className="absolute top-3 right-3 text-cyan-300 hover:text-white text-2xl font-bold transition"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-1">
                            <span>➕</span> Add New Sample
                        </h2>
                        <AddForm
                            onSuccess={() => {
                                fetch("http://127.0.0.1:8000/samples/")
                                    .then(res => res.json())
                                    .then(data => setSamples(data));
                            }}
                            onClose={() => setShowModal(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
