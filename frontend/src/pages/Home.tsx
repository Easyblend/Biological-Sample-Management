export default function Home() {
    return (
        <main className="min-h-screen pt-10 bg-gradient-to-tr from-black via-gray-900 to-gray-800 flex flex-col items-center justify-center px-4">
            <div className="relative max-w-xl w-full bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-gray-700">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-gray-700 to-black rounded-full p-3 shadow-lg">
                    <img
                        src="https://img.icons8.com/color/96/000000/dna-helix.png"
                        alt="Bio Sample Logo"
                        className="w-20 h-20"
                    />
                </div>
                <h1 className="mt-14 text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400 text-center drop-shadow mb-4">
                    SporeBio
                </h1>
                <p className="text-xl text-gray-300 mb-8 text-center font-medium">
                    Effortlessly manage, track, and analyze your samples.
                </p>
                <a
                    href="/samples"
                    className="mt-2 px-8 py-4 bg-gradient-to-r from-gray-700 to-black hover:from-gray-600 hover:to-gray-900 text-white text-lg font-bold rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-600"
                >
                    View Samples
                </a>
            </div>
            <footer className="mt-12 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} SporeBio. All rights reserved.
            </footer>
        </main>
    );
}
