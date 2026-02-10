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

interface PrizeCategory {
    distance: string;
    raceKey: string;
    first: string;
    second: string;
    third: string;
}

export function PrizeCard({ category, showLabel = true }: { category: PrizeCategory, showLabel?: boolean }) {
    if (!category) return null;

    return (
        <div className="bg-white rounded-2xl overflow-hidden border-2 border-blue-600 shadow-xl w-full max-w-[320px] mx-auto">
            {showLabel && (
                <div className="bg-blue-600 px-4 py-3 text-center">
                    <span className="text-white font-black text-2xl tracking-tight italic uppercase">{category.distance}</span>
                </div>
            )}
            <div className="divide-y divide-blue-50">
                <div className="flex justify-between items-center px-5 py-4 hover:bg-blue-50/30 transition-colors">
                    <span className="text-[#4343d1] font-black italic text-xl">1st</span>
                    <span className="text-gray-900 font-bold text-xl text-right">{category.first}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-4 hover:bg-blue-50/30 transition-colors">
                    <span className="text-[#4343d1] font-black italic text-xl">2nd</span>
                    <span className="text-gray-900 font-bold text-lg text-right max-w-[150px] leading-tight">{category.second}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-4 hover:bg-blue-50/30 transition-colors">
                    <span className="text-[#4343d1] font-black italic text-xl">3rd</span>
                    <span className="text-gray-900 font-bold text-lg text-right max-w-[150px] leading-tight">{category.third}</span>
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
                <div className="text-center mb-12 relative animate-fade-in">
                    <h2 className="flex flex-col items-center">
                        <span className="text-white text-5xl sm:text-8xl font-black italic tracking-tighter drop-shadow-2xl">
                            PRIZE
                        </span>
                        <span className="relative mt-[-8px] sm:mt-[-20px]">
                            <span className="text-white/90 text-3xl sm:text-7xl font-black italic tracking-tight uppercase">
                                ANNOUNCEMENT
                            </span>
                        </span>
                    </h2>
                    <div className="h-1.5 w-32 bg-yellow-500 mx-auto mt-6 rounded-full shadow-lg"></div>
                </div>

                {/* Prize Table Container - Desktop */}
                <div className="hidden lg:block w-full max-w-5xl px-2">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-blue-100/50 backdrop-blur-sm">
                        <table className="w-full border-separate border-spacing-3">
                            <thead>
                                <tr>
                                    <th className="bg-blue-50/80 rounded-2xl border border-blue-100 p-5 w-1/4">
                                        <span className="text-[#4343d1] font-black italic text-3xl uppercase tracking-tighter">PRIZE</span>
                                    </th>
                                    {prizeData.slice().reverse().map((category) => (
                                        <th key={category.raceKey} className="bg-blue-50/80 rounded-2xl border border-blue-100 p-5 w-1/4">
                                            <span className="text-[#4343d1] font-black italic text-3xl uppercase tracking-tighter">{category.distance}</span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { rank: "1st", key: "first" },
                                    { rank: "2nd", key: "second" },
                                    { rank: "3rd", key: "third" }
                                ].map((row) => (
                                    <tr key={row.rank}>
                                        <td className="bg-white rounded-2xl border border-blue-100 p-6 text-center shadow-sm">
                                            <span className="text-[#4343d1] font-black italic text-5xl tracking-tighter">
                                                {row.rank.slice(0, -2)}<sup className="lowercase text-2xl ml-0.5">{row.rank.slice(-2)}</sup>
                                            </span>
                                        </td>
                                        {prizeData.slice().reverse().map((category) => {
                                            const value = category[row.key as keyof typeof category];
                                            const isGift = value.toLowerCase().includes('gift');
                                            return (
                                                <td key={category.raceKey} className="bg-blue-50/40 rounded-2xl border border-blue-50 p-6 text-center hover:bg-blue-50/60 transition-colors">
                                                    {isGift ? (
                                                        <span className="text-gray-700 font-bold text-2xl uppercase leading-none block">GIFT<br />HAMPER</span>
                                                    ) : (
                                                        <span className="text-gray-900 font-black text-3xl tracking-tight">{value}</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Prize Cards Container - Mobile & Tablet */}
                <div className="lg:hidden w-full max-w-md space-y-8 px-4">
                    {prizeData.slice().reverse().map((category) => (
                        <PrizeCard key={category.raceKey} category={category} />
                    ))}
                </div>

                {/* Info Bar */}
                <div className="w-full mt-16 bg-white/10 backdrop-blur-md py-6 border-y border-white/20">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <span className="text-white font-black text-lg sm:text-3xl uppercase tracking-[0.2em] leading-relaxed block">
                            EVENT - 1<sup className="lowercase">st</sup> MARCH, 2026 - SECTOR -10, ROHINI
                        </span>
                    </div>
                </div>

                {/* Register Button */}
                <div className="mt-14">
                    <Link href="/register">
                        <button className="
                            bg-white text-[#4343d1] font-black italic 
                            text-2xl sm:text-4xl px-12 sm:px-24 py-5 sm:py-7
                            rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)]
                            hover:scale-105 active:scale-95 transition-all
                            uppercase tracking-tight
                            border-b-4 border-blue-200
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
