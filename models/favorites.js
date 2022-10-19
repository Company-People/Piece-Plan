const { v4: uuid } = require('uuid');

let favorites = [
  {
    favoriteId: '6f398ac8-e2dd-4a3a-a548-32d8b64130ec',
    userId: 'f3c01bd3-c491-4034-a961-bf63e988ccbf',
    pieceId: '88ef1bc9-f037-4eaa-aaaa-5f94b0997285',
  },
];

const getFavorites = () => favorites;

const getMyFavorites = userId => favorites.filter(favorite => favorite.userId === userId);

const toggleFavorite = (userId, pieceId, isFavorite) => {
  if (isFavorite) {
    favorites = favorites.filter(favorite => favorite.userId !== userId || favorite.pieceId !== pieceId);
  } else {
    favorites = [...favorites, { favoriteId: uuid(), userId, pieceId }];
  }
};

module.exports = { getFavorites, getMyFavorites, toggleFavorite };
