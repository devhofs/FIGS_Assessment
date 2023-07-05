/*
 * Mocked response from /search endpoint with breed information
 */
export const CAT_API_RESPONSE = [
    {
        breeds: [{
            "weight": {
                "imperial": "6 - 13",
                "metric": "3 - 6"
            },
            "id": "buri",
            "name": "Burmilla",
            "cfa_url": "http://cfa.org/Breeds/BreedsAB/Burmilla.aspx",
            "vetstreet_url": "http://www.vetstreet.com/cats/burmilla",
            "temperament": "Easy Going, Friendly, Intelligent, Lively, Playful, Social",
            "origin": "United Kingdom",
            "country_codes": "GB",
            "country_code": "GB",
            "description": "The Burmilla is a fairly placid cat. She tends to be an easy cat to get along with, requiring minimal care. The Burmilla is affectionate and sweet and makes a good companion, the Burmilla is an ideal companion to while away a lonely evening. Loyal, devoted, and affectionate, this cat will stay by its owner, always keeping them company.",
            "life_span": "10 - 15",
            "indoor": 0,
            "lap": 1,
            "alt_names": "",
            "adaptability": 5,
            "affection_level": 5,
            "child_friendly": 4,
            "dog_friendly": 4,
            "energy_level": 3,
            "grooming": 3,
            "health_issues": 3,
            "intelligence": 3,
            "shedding_level": 3,
            "social_needs": 4,
            "stranger_friendly": 3,
            "vocalisation": 5,
            "experimental": 0,
            "hairless": 0,
            "natural": 0,
            "rare": 0,
            "rex": 0,
            "suppressed_tail": 0,
            "short_legs": 0,
            "wikipedia_url": "https://en.wikipedia.org/wiki/Burmilla",
            "hypoallergenic": 0,
            "reference_image_id": "jvg3XfEdC"
        }],
        categories: [
            {
                id: 4,
                name: "sunglasses",
            },
        ],
        id: "15o",
        url: "https://cdn2.thecatapi.com/images/15o.jpg",
        width: 500,
        height: 400,
    },
    {
        breeds: [{
            "weight": {
                "imperial": "7 - 11",
                "metric": "3 - 5"
            },
            "id": "nebe",
            "name": "Nebelung",
            "temperament": "Gentle, Quiet, Shy, Playful",
            "origin": "United States",
            "country_codes": "US",
            "country_code": "US",
            "description": "The Nebelung may have a reserved nature, but she loves to play (being especially fond of retrieving) and enjoys jumping or climbing to high places where she can study people and situations at her leisure before making up her mind about whether she wants to get involved.",
            "life_span": "11 - 16",
            "indoor": 0,
            "lap": 1,
            "alt_names": "Longhaired Russian Blue",
            "adaptability": 5,
            "affection_level": 5,
            "child_friendly": 4,
            "dog_friendly": 4,
            "energy_level": 3,
            "grooming": 3,
            "health_issues": 2,
            "intelligence": 5,
            "shedding_level": 3,
            "social_needs": 3,
            "stranger_friendly": 3,
            "vocalisation": 1,
            "experimental": 0,
            "hairless": 0,
            "natural": 0,
            "rare": 1,
            "rex": 0,
            "suppressed_tail": 0,
            "short_legs": 0,
            "wikipedia_url": "https://en.wikipedia.org/wiki/Nebelung",
            "hypoallergenic": 0,
            "reference_image_id": "OGTWqNNOt"
        }],
        id: "217",
        url: "https://cdn2.thecatapi.com/images/217.jpg",
        width: 500,
        height: 340,
    },
];

/*
 * Mocked response from /search endpoint without breed information.
 * uses .slice() to create a new array and avoid mutating the original, while otherwise maintaining the same structure.
 */
export const CAT_API_RESPONSE_NO_BREED_INFO = CAT_API_RESPONSE
    .slice()
    .map(cat => ({
        ...cat,
        breeds: []
    }));