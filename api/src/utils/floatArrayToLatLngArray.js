/**
	 * Converts a float array to a latitude-longitude array.
	 *
	 * @param {number[]} floatArray - The float array to convert.
	 * @returns {Array<number[]>} The latitude-longitude array.
	 */
function floatArrayToLatLngArray(floatArray) {
    const latLngArray = [];
    for (let i = 0; i < floatArray.length; i = i + 2) {
        const element = [floatArray[i + 1], floatArray[i]];
        latLngArray.push(element);
    }
    return latLngArray;
}
module.exports = floatArrayToLatLngArray;