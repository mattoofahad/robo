import {CHANGE_SEARCH_FIELD} from './constants.js';

export const setSearchField = (text) => {
	console.log("C");
	return {

	type: CHANGE_SEARCH_FIELD,
	payload: text}
};