// Third party library
import axios from 'axios';

// Constant(s)
import * as Constants from 'constants/constants';
import * as Services from 'constants/services';

export function getMusicList(term, media, callback, errorCallback) {
	axios.get(
		Constants.BASE_URL + Services.searchMusicList, 
		{
			params: {
				term,
				media
			}
		}
	)
	.then(response => {
		callback(response.data.results);
	})
	.catch((error) => {
		errorCallback(error);
	});
}