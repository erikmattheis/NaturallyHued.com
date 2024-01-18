const dyes = [
    {
        name: 'Alkanet',
        color: '#8B008B',
    },
    {
        name: 'Annatto',
        color: '#FFD700',
    },
    {
        name: 'Avocado pits',
        color: '#568203',
    },
    {
        name: 'Beets',
        color: '#8E354A',
    },
    {
        name: 'Black Beans',
        color: '#3D2B1F',
    },
    {
        name: 'Black Elderberry',
        color: '#503047',
    },
    {
        name: 'Black Walnuts',
        color: '#3D2B1F',
    },
    {
        name: 'Blackthorn',
        color: '#2E2D30',
    },
    {
        name: 'Blueberries',
        color: '#4682B4',
    },
    {
        name: 'Buckthorn Berries',
        color: '#8A3324',
    },
    {
        name: 'Brazilwood',
        color: '#DE3163',
    },
    {
        name: 'Buckthorn',
        color: '#8A3324',
    },
    {
        name: 'Cabbage',
        color: '#4B0082',
    },
    {
        name: 'Caramel',
        color: '#D2691E',
    },
    {
        name: 'Carrot Tops',
        color: '#FF7F00',
    },
    {
        name: 'Chamomile',
        color: '#F0DC82',
    },
    {
        name: 'Cherries',
        color: '#DE3163',
    },
    {
        name: 'Chokecherries',
        color: '#8B0000',
    },
    {
        name: 'Cinnabar',
        color: '#E34234',
    },
    {
        name: 'Cochineal',
        color: '#D70040',
    },
    {
        name: 'Cocoa',
        color: '#D2691E',
    },
    {
        name: 'Coffee',
        color: '#A52A2A',
    },
    {
        name: 'Coreopsis',
        color: '#FFD700',
    },
    {
        name: 'Cumin',
        color: '#924321',
    },
    {
        name: 'Dandelion',
        color: '#FED85D',
    },
    {
        name: 'Dutch Pink',
        color: '#d5af89',
    },
    {
        name: 'Elder',
        color: '#3E4095',
    },
    {
        name: 'Elderberry',
        color: '#3E4095',
    },
    {
        name: 'Eucalyptus',
        color: '#44D7A8',
    },
    {
        name: 'Falu Red',
        color: '#801818',
    },
    {
        name: 'Fustic',
        color: '#DAA520',
    },
    {
        name: 'Gamboge',
        color: '#E49B0F',
    },
    {
        name: 'Grapes',
        color: '#6F2DA8',
    },
    {
        name: 'Green Walnut Hulls',
        color: '#8A3324',
    },
    {
        name: 'Guava',
        color: '#E4717A',
    },
    {
        name: 'Henna',
        color: '#B06500',
    },
    {
        name: 'Hibiscus',
        color: '#ED2939',
    },
    {
        name: 'Hollyhock',
        color: '#B666D2',
    },
    {
        name: 'Indian Yellow',
        color: '#FFD700',
    },
    {
        name: 'Indigo',
        color: '#4B0082',
    },
    {
        name: 'Jackfruit',
        color: '#FFD700',
    },
    {
        name: 'Kermes',
        color: '#8B0000',
    },
    {
        name: 'Lac',
        color: '#C32148',
    },
    {
        name: 'Lavender',
        color: '#E6E6FA',
    },
    {
        name: 'Lichen',
        color: '#8F9779',
    },
    {
        name: 'Logwood',
        color: '#534B4F',
    },
    {
        name: 'Madder',
        color: '#E30022',
    },
    {
        name: 'Mahogany',
        color: '#C04000',
    },
    {
        name: 'Marigold',
        color: '#FFD700',
    },
    {
        name: 'Mulberries',
        color: '#722F37',
    },
    {
        name: 'Mullein',
        color: '#FFDB58',
    },
    {
        name: 'Mustard',
        color: '#FFDB58',
    },
    {
        name: 'Myrobalan',
        color: '#DAA520',
    },
    {
        name: 'Nettle',
        color: '#006400',
    },
    {
        name: 'Oak Galls',
        color: '#A52A2A',
    },
    {
        name: 'Onion Skin',
        color: '#FFA500',
    },
    {
        name: 'Osage Orange',
        color: '#FF4500',
    },
    {
        name: 'Orpiment',
        color: '#FFBF00',
    },
    {
        name: 'Paprika',
        color: '#FF4500',
    },
    {
        name: 'Pecan Shells',
        color: '#966F33',
    },
    {
        name: 'Pomegranate',
        color: '#FFD700',
    },
    {
        name: 'Purple Carrot',
        color: '#FF4500',
    },
    {
        name: 'Quebracho',
        color: '#E30022',
    },
    {
        name: 'Red Cabbage',
        color: '#8A2BE2',
    },
    {
        name: 'Red Onions',
        color: '#8A2BE2',
    },
    {
        name: 'Red Sandalwood',
        color: '#8B0000',
    },
    {
        name: 'Rhubarb',
        color: '#D2691E',
    },
    {
        name: 'Rose Petals',
        color: '#FF007F',
    },
    {
        name: 'Safflower',
        color: '#FFD700',
    },
    {
        name: 'Sorrel',
        color: '#DB7093',
    },
    {
        name: 'Sunflower',
        color: '#FFDB58',
    },
    {
        name: 'Tansy',
        color: '#DAA520',
    },
    {
        name: 'Tea',
        color: '#008080',
    },
    {
        name: 'Turmeric',
        color: '#FFD700',
    },
    {
        name: 'Tyrian',
        color: '#66023C',
    },
    {
        name: 'Ultramarine',
        color: '#3F00FF',
    },
    {
        name: 'Walnut',
        color: '#77202F',
    },
    {
        name: 'Woad',
        color: '#7b99b0',
    },
    {
        name: 'Weld',
        color: '#8A2BE2',
    },
]

module.exports = { dyes }
