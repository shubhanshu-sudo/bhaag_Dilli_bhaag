'use client';

import Link from 'next/link';

const prizeData = [
    {
        distance: "2 KM",
        raceKey: "2KM",
        first: "Rs 5100/-",
        second: "GIFT HAMPER",
        third: "GIFT HAMPER"
    },
    {
        distance: "5 KM",
        raceKey: "5KM",
        first: "Rs 11000/-",
        second: "Rs 5100/-",
        third: "GIFT HAMPER"
    },
    {
        distance: "10 KM",
        raceKey: "10KM",
        first: "Rs 21000/-",
        second: "Rs 11000/-",
        third: "GIFT HAMPER"
    }
];

export function PrizeCard({ category }: { category: any }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border-2 border-blue-600 shadow-xl w-full max-w-[280px]">
            <div className="bg-white px-4 py-2 border-b-2 border-blue-600 text-center">
                <span className="text-red-600 font-extrabold text-xl">{category.distance}</span>
            </div>
            <div className="grid grid-rows-3">
                <div className="flex justify-between items-center px-4 py-3 border-b border-blue-100">
                    <span className="text-red-600 font-black italic text-lg whitespace-nowrap">1st</span>
                    <span className="text-blue-600 font-black italic text-lg text-right">{category.first}</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 border-b border-blue-100">
                    <span className="text-red-600 font-black italic text-lg whitespace-nowrap">2nd</span>
                    <span className="text-blue-600 font-black italic text-sm text-right leading-tight max-w-[100px]">{category.second}</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3">
                    <span className="text-red-600 font-black italic text-lg whitespace-nowrap">3rd</span>
                    <span className="text-blue-600 font-black italic text-sm text-right leading-tight max-w-[100px]">{category.third}</span>
                </div>
            </div>
        </div>
    );
}

export default function Prizes() {
    return (
        <section className="relative py-16 sm:py-24 bg-blue-900 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-marathon.jpg"
                    alt="Marathon Runners"
                    className="w-full h-full object-cover opacity-30 grayscale blur-[2px]"
                />
                <div className="absolute inset-0 bg-blue-900/60" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center">

                {/* Title */}
                <div className="text-center mb-10 relative">
                    <h2 className="flex flex-col items-center">
                        <span className="text-white text-6xl sm:text-8xl font-black italic tracking-tighter drop-shadow-lg">
                            PRIZE
                        </span>
                        <span className="relative mt-[-10px] sm:mt-[-20px]">
                            <span className="text-white/90 text-4xl sm:text-7xl font-black italic tracking-tight uppercase">
                                ANNOUNCEMENT
                            </span>
                        </span>
                    </h2>
                </div>

                {/* Prize Table Container */}
                <div className="w-full max-w-5xl overflow-x-auto pb-4 scrollbar-hide px-2">
                    <div className="min-w-[600px] sm:min-w-0">
                        <div className="bg-white rounded-[2rem] p-4 sm:p-6 shadow-2xl border border-blue-100">
                            <table className="w-full border-separate border-spacing-2 sm:border-spacing-3">
                                <thead>
                                    <tr>
                                        <th className="bg-blue-50 rounded-2xl border border-blue-100 p-2 sm:p-4 w-1/4">
                                            <span className="text-[#4343d1] font-black italic text-lg sm:text-2xl uppercase">PRIZE</span>
                                        </th>
                                        <th className="bg-blue-50 rounded-2xl border border-blue-100 p-2 sm:p-4 w-1/4">
                                            <span className="text-[#4343d1] font-black italic text-lg sm:text-2xl uppercase">10KM</span>
                                        </th>
                                        <th className="bg-blue-50 rounded-2xl border border-blue-100 p-2 sm:p-4 w-1/4">
                                            <span className="text-[#4343d1] font-black italic text-lg sm:text-2xl uppercase">5KM</span>
                                        </th>
                                        <th className="bg-blue-50 rounded-2xl border border-blue-100 p-2 sm:p-4 w-1/4">
                                            <span className="text-[#4343d1] font-black italic text-lg sm:text-2xl uppercase">2KM</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="bg-white rounded-2xl border border-blue-100 p-2 sm:p-5 text-center">
                                            <span className="text-[#4343d1] font-black italic text-2xl sm:text-5xl tracking-tighter">1<sup className="lowercase text-xl sm:text-2xl">st</sup></span>
                                        </td>
                                        <td className="bg-blue-50/50 rounded-2xl border border-blue-50 p-2 sm:p-5 text-center">
                                            <span className="text-gray-900 font-bold text-lg sm:text-3xl whitespace-nowrap">Rs 21000/-</span>
                                        </td>
                                        <td className="bg-blue-50/50 rounded-2xl border border-blue-50 p-2 sm:p-5 text-center">
                                            <span className="text-gray-900 font-bold text-lg sm:text-3xl whitespace-nowrap">Rs 11000/-</span>
                                        </td>
                                        <td className="bg-blue-50/50 rounded-2xl border border-blue-50 p-2 sm:p-5 text-center">
                                            <span className="text-gray-900 font-bold text-lg sm:text-3xl whitespace-nowrap">Rs 5100/-</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="bg-white rounded-2xl border border-blue-100 p-2 sm:p-5 text-center">
                                            <span className="text-[#4343d1] font-black italic text-2xl sm:text-5xl tracking-tighter">2<sup className="lowercase text-xl sm:text-2xl">nd</sup></span>
                                        </td>
                                        <td className="bg-blue-50/50 rounded-2xl border border-blue-50 p-2 sm:p-5 text-center">
                                            <span className="text-gray-900 font-bold text-lg sm:text-3xl whitespace-nowrap">Rs 11000/-</span>
                                        </td>
                                        <td className="bg-blue-50/50 rounded-2xl border border-blue-50 p-2 sm:p-5 text-center">
                                            <span className="text-gray-900 font-bold text-lg sm:text-3xl whitespace-nowrap">Rs 5100/-</span>
                                        </td>
                                        <td className="bg-blue-50/50 rounded-2xl border border-blue-50 p-2 sm:p-5 text-center">
                                            <span className="text-gray-700 font-bold text-sm sm:text-2xl uppercase leading-none block">GIFT<br />HAMPER</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="bg-white rounded-2xl border border-blue-100 p-2 sm:p-5 text-center">
                                            <span className="text-[#4343d1] font-black italic text-2xl sm:text-5xl tracking-tighter">3<sup className="lowercase text-xl sm:text-2xl">rd</sup></span>
                                        </td>
                                        <td className="bg-blue-50/50 rounded-2xl border border-blue-50 p-2 sm:p-5 text-center">
                                            <span className="text-gray-700 font-bold text-sm sm:text-2xl uppercase leading-none block">GIFT<br />HAMPER</span>
                                        </td>
                                        <td className="bg-blue-50/50 rounded-2xl border border-blue-50 p-2 sm:p-5 text-center">
                                            <span className="text-gray-700 font-bold text-sm sm:text-2xl uppercase leading-none block">GIFT<br />HAMPER</span>
                                        </td>
                                        <td className="bg-blue-50/50 rounded-2xl border border-blue-50 p-2 sm:p-5 text-center">
                                            <span className="text-gray-700 font-bold text-sm sm:text-2xl uppercase leading-none block">GIFT<br />HAMPER</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="w-full mt-10 bg-white/10 backdrop-blur-md py-4 sm:py-5 border-y border-white/20">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <span className="text-white font-bold text-xl sm:text-3xl uppercase tracking-widest">
                            EVENT - 1<sup className="lowercase">st</sup> MARCH, 2026 - SECTOR -10, ROHINI
                        </span>
                    </div>
                </div>

                {/* Register Button */}
                <div className="mt-12">
                    <Link href="/register">
                        <button className="
                            bg-white text-[#4343d1] font-black italic 
                            text-2xl sm:text-4xl px-12 sm:px-24 py-4 sm:py-6 
                            rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.3)]
                            hover:scale-105 active:scale-95 transition-all
                            uppercase
                        ">
                            REGISTER NOW
                        </button>
                    </Link>
                </div>
            </div>


        </section>
    );
}

export { prizeData };
