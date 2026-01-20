// Central race configuration
export const RACE_CONFIG = {
    '2KM': {
        raceKey: '2KM',
        title: 'Fun Run',
        distance: '2 KM',
        price: 499,
        includes: [
            'Event T-Shirt',
            'Finisher Medal',
            'Refreshments',
            'E-Certificate'
        ]
    },
    '5KM': {
        raceKey: '5KM',
        title: 'Fitness Run',
        distance: '5 KM',
        price: 699,
        includes: [
            'Event T-Shirt',
            'Finisher Medal',
            'Timed Bib',
            'Refreshments',
            'E-Certificate'
        ],
        featured: true
    },
    '10KM': {
        raceKey: '10KM',
        title: 'Endurance Run',
        distance: '10 KM',
        price: 999,
        includes: [
            'Premium Event T-Shirt',
            'Finisher Medal',
            'Timed Bib',
            'Energy Gels & Refreshments',
            'E-Certificate'
        ]
    }
} as const;

export type RaceKey = keyof typeof RACE_CONFIG;

export function getRaceConfig(raceKey: string) {
    return RACE_CONFIG[raceKey as RaceKey] || RACE_CONFIG['5KM'];
}
