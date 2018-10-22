const titles = [
    'Dr.',
    'Reverend',
    'HRH',
    'Lord',
    'Lady',
    'Sir',
    'Dame',
    'Baroness',
    'Baron',
    'Father',
    'Sister',
    'King',
    'Queen'
];

const firstNames = [
    'Barry',
    'Sophie',
    'Colin',
    'Georgia',
    'Percy',
    'Lisa',
    'Dave',
    'Sheila',
    'Brad',
    'Amelia',
    'Ricky',
    'Victoria',
    'Sammy',
    'Olga',
    'Martin',
    'Richard',
    'Ulrich',
    'Tony'
];

const surnames = [
    'Bigginsworth',
    'Bigginsly',
    'Tompkins',
    'Flow',
    'Smith',
    'Wobblebottom',
    'Coleman',
    'Griffiths',
    'Jones',
    'Frankert',
    'McCreedy',
    'Frompleton',
    'Breem',
    'Potter',
    'Snape',
    'Fnip',
    'Thwomp',
    'Arse',
    'von Liechtenstein',
    'Inchpractice'
];

module.exports = (role) => {
    let nameTaken = true;
    let name = '';

    do {
        let firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        let surname = surnames[Math.floor(Math.random() * surnames.length)];

        let doubleBarrel = Math.floor(Math.random() * 4) === 1;
        if (doubleBarrel) {
            surname += '-' + surnames[Math.floor(Math.random() * surnames.length)];
        }

        name = firstName + ' ' + surname + ' (' + role + ')';

        let title = Math.floor(Math.random() * 4) === 1;
        if (title) {
            name = titles[Math.floor(Math.random() * titles.length)] + ' ' + name;
        }

        nameTaken = Game.creeps[name] !== undefined;
    } while (nameTaken);

    return name;
}
