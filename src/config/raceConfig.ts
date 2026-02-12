// Central race configuration
export const RACE_CONFIG = {
    '2KM': {
        raceKey: '2KM',
        title: 'Fun Run',
        distance: '2 KM',
        price: 499,
        includes: [
            'Finisher Medal',
            'Goodie Bag',
            'Hydration Support',
            'Medical Support'
        ],
        featured: false
    },
    '5KM': {
        raceKey: '5KM',
        title: 'Fitness Run',
        distance: '5 KM',
        price: 699,
        includes: [
            'Finisher Medal',
            'Goodie Bag',
            'Hydration Support',
            'Medical Support',
            'Timing Chip (RFID)'
        ],
        featured: true
    },
    '10KM': {
        raceKey: '10KM',
        title: 'Endurance Run',
        distance: '10 KM',
        price: 1199,
        includes: [
            'Finisher Medal',
            'Goodie Bag',
            'Hydration Support',
            'Medical Support',
            'Timing Chip (RFID)'
        ],
        featured: false
    }
} as const;

export type RaceKey = keyof typeof RACE_CONFIG;

export function getRaceConfig(raceKey: string) {
    return RACE_CONFIG[raceKey as RaceKey] || RACE_CONFIG['5KM'];
}
