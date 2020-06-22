const mapFolder = require('map-folder');
const {FILE, FOLDER} = mapFolder;

module.exports = function requireFolder (dirPath, opts = {}) {
	const dirMap = mapFolder.sync(dirPath, ({type, ext, base}) => (
		type === FOLDER || ext === 'js' || base === '_INDEX_ONLY'
	));

	const alias = createAliasesMap(opts.alias || opts.aliases);
	const hooks = opts.hooks || {};
	const {type, entries} = dirMap;

	if (type === FILE || entries._INDEX_ONLY) return require(dirMap.path);

	const obj = {};

	forIn(entries, (key) => {
		const map = entries[key];
		const resolvedKey = resolveKey(key, map, alias);
		const hookFn = hooks[resolvedKey];

		if (hookFn) hookFn(obj, map);
		else obj[resolvedKey] = requireFolder(map.path, opts);
	});

	return obj;
};

function resolveKey (rawKey, map, aliasMap) {
	// map.base || key
	const key = (map.type === FILE) ? map.base : rawKey;

	if (aliasMap && aliasMap.has(key)) {
		return aliasMap.get(key);
	}

	return key;
}

function createAliasesMap (rawAliases) {
	if (!rawAliases) return null;

	const aliases = new Map();

	forIn(rawAliases, (key, value) => {
		if (typeof value == 'string') {
			aliases.set(value, key);
		}
		else if (Array.isArray(value)) {
			value.forEach((alias) => {
				aliases.set(alias, key);
			});
		}
	});

	return aliases;
}

const hasOwnProp = Object.hasOwnProperty;

function forIn (obj, fn) {
	const hasOwn = hasOwnProp.bind(obj);

	for (const key in obj) {
		if (hasOwn(key)) {
			fn.call(obj, key, obj[key]);
		}
	}
}
