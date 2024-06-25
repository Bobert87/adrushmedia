/**
 * Groups an array of objects by a specified key.
 *
 * @param {Array} objArr - The array of objects to be grouped.
 * @param {string} objKey - The key to group the objects by.
 * @returns {Object} - An object where the keys are unique values of `objKey` and the values are arrays of objects with matching `objKey` values.
 */
function groupByKey(objArr, ObjKey) {
	return objArr.reduce((arr, item) => {
		const key = item[ObjKey];
		arr[key] = arr[key] ?? [];
		arr[key].push(item);
		return arr;
	}, {});
}

module.exports = groupByKey;