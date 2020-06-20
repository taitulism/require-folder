const mapFolder = require('map-folder');
const {FILE, FOLDER} = mapFolder;
// const TPL = require('./src/TPL');

module.exports = function requireFolder (dirPath) {
	const dirMap = mapFolder.sync(dirPath, ({type, ext, base}) => {
		return type === FOLDER || ext === 'js' || base === '_INDEX_ONLY';
	});

	if (dirMap.type === FOLDER) {
		const obj = {};
		const entries = dirMap.entries;

		if (entries._INDEX_ONLY) return require(dirMap.path);

		Object.keys(entries).forEach((key) => {
			const map = entries[key];
			obj[map.base || key] = requireFolder(map.path);
		});

		return obj;
	}

	return require(dirMap.path);
};
