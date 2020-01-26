const LastFM = require('lastfm-node-client');

const lastfm = new LastFM('c31eeb95bb18e4adf49a42ef3c92d36c', '0df50f6de311ccdb787216cc548b1269', 'Hysteria');

lastfm.userGetTopAlbums({
	user: 'Hysterrics',
	limit: 1
}).then(data => {
	console.log(data.topalbums.album[0]);
})
