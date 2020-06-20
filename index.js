const mapFolder = require('map-folder');
const {FILE, FOLDER} = mapFolder;
// const TPL = require('./src/TPL');

module.exports = function requireFolder (dirPath, opts = {}) {
	const dirMap = mapFolder.sync(dirPath, ({type, ext, base}) => {
		return type === FOLDER || ext === 'js' || base === '_INDEX_ONLY';
	});

	const alias = createAliasesMap(opts.alias || opts.aliases);

	if (dirMap.type === FOLDER) {
		const obj = {};
		const entries = dirMap.entries;

		if (entries._INDEX_ONLY) return require(dirMap.path);

		Object.keys(entries).forEach((key) => {
			const map = entries[key];
			const resolvedKey = resolveKey(key, map, alias);

			obj[resolvedKey] = requireFolder(map.path);
		});

		return obj;
	}

	return require(dirMap.path);
};

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

function resolveKey (rawKey, map, alias) {
	// map.base || key
	let key;
	if (map.type === FILE) {
		key = map.base;
	}
	else {
		key = rawKey;
	}

	if (!alias) return key;
	if (alias.has(key)) return alias.get(key);
}

const hasOwn = Object.hasOwnProperty;

function forIn (obj, fn) {
	const _hasOwn = hasOwn.bind(obj);

	for (let key in obj) {
		if (_hasOwn(key)) {
			fn.call(obj, key, obj[key]);
		}
	}
}
