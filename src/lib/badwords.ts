import { Filter } from 'bad-words';

const filter = new Filter();
filter.removeWords();

const bannedWords = [
    'puta', 'mierda', 'idiota', 'pendejo', 'imbécil', 'gil', 'tonto', 'estúpido', "boludo",
    "hijueputa", "gonorrea", "malparido", "lampara", "perra", "trava",
    'maricón', 'negro', 'judio', 'musulmán', 'puto', 'zorra', 'maldito', 'sidoso',
    'terrorista', 'nazi', 'racista', 'homofóbico', 'machista', 'machorra', 'feminazi',
    'odio', 'detesto', 'asco', 'hater', "suicidate", "matate", "cuelgate", "tirate", "disparate", 
    "matese", "suicidese", "cuelgese", "tirese", "disparese", "matese"
];
const variations = bannedWords.flatMap(word => {
    const subs = [
        word.replace(/a/gi, '4'),
        word.replace(/e/gi, '3'),
        word.replace(/i/gi, '1'),
        word.replace(/o/gi, '0'),
        word.replace(/u/gi, 'v')
    ];
    return [word, ...subs];
});

filter.addWords(...variations);


export function containsBadWords(message: string) {
    return filter.isProfane(message);
}

export function cleanMessage(message: string) {
    return filter.clean(message);
}
