const allPets = [
    {
        name: 'african-lion',
        location: 'Africa',
        diet: 'Carnivorous',
        image: 'african-lion',
    },
    {
        name: 'alpaca',
        location: 'South Africa',
        diet: 'Herbivorous',
        image: 'alpaca',
    },
    {
        name: 'Babirusas',
        location: 'Russia',
        diet: 'Herbivorous',
        image: 'Babirusas',
    },
    {
        name: 'Badger',
        location: 'USA',
        diet: 'Carnivorous',
        image: 'Badger',
    },
    {
        name: 'Bobcat',
        location: 'Mountain',
        diet: 'Carnivorous',
        image: 'Bobcat',
    },
    {
        name: 'brown_bear',
        location: 'Russia',
        diet: 'Carnivorous',
        image: 'brown_bear',
    },
    {
        name: 'coala',
        location: 'Australia',
        diet: 'Herbivorous',
        image: 'coala',
    },
    {
        name: 'giant_rabbit',
        location: 'Everywhere',
        diet: 'Herbivorous',
        image: 'giant_rabbit',
    },
    {
        name: 'giraffe',
        location: 'Africa',
        diet: 'Herbivorous',
        image: 'giraffe',
    },
    {
        name: 'Leopard',
        location: 'Africa',
        diet: 'Carnivorous',
        image: 'Leopard',
    },
    {
        name: 'lion_rabbit',
        location: 'Russia',
        diet: 'Herbivorous',
        image: 'lion_rabbit',
    },
    {
        name: 'lizard',
        location: 'South America',
        diet: 'Herbivorous',
        image: 'lizard',
    },
    {
        name: 'ringtailed_lemur',
        location: 'Africa',
        diet: 'Herbivorous',
        image: 'ringtailed_lemur',
    },
    {
        name: 'whistling_duck',
        location: 'Asia',
        diet: 'Herbivorous',
        image: 'whistling_duck',
    },
    {
        name: 'zebra',
        location: 'Africa',
        diet: 'Herbivorous',
        image: 'zebra',
    },
    {
        name: 'Prairie-Dog',
        location: 'Austria',
        diet: 'Carnivorous',
        image: 'Prairie-Dog',
    },
    {
        name: 'jaguar',
        location: 'Africs',
        diet: 'Carnivorous',
        image: 'jaguar',
    },
    {
        name: 'elephant',
        location: 'Africa',
        diet: 'Herbivorous',
        image: 'elephant',
    },
]

function getRandomInt(max) {
    const min = 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomPets(numberOfPets) {
    const uniqueIndexes = new Set();
    const uniquePets = [];

    for (let i = 0; i < numberOfPets; i++) {
        let randomIndex;

        do {
            randomIndex = getRandomInt(allPets.length - 1);
        } while(uniqueIndexes.has(randomIndex));

        uniqueIndexes.add(randomIndex);
        uniquePets.push(allPets[randomIndex]);
    }

    return uniquePets;
}

export function getPetImagePathByImage(image) {
    return `assets/images/pets/${image}.jpg`
}

export function getDietImgByDietName(diet) {
    if (diet === 'Herbivorous') {
        return 'assets/icons/banana-bamboo_icon.svg';
    }

    return 'assets/icons/meet-fish_icon.svg';
}