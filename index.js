const {sep} = require('path');
const mapFolder = require('map-folder');
const {FILE, FOLDER} = mapFolder;

function requireFolder (dirPath, opts = {}) {
	const staleList = opts.stale || null;

	const dirMap = mapFolder.sync(dirPath, ({type, ext, base, path}) => (
		type === FOLDER || ext === 'js' || base === '_INDEX_ONLY' || isStale(path, staleList)
	));

	const aliasesMap = createAliasesMap(opts.alias || opts.aliases);
	const groupsMap = createGroupsMap(opts.group || opts.groups);
	const hooks = opts.hooks || Object.create(null);
	const {type, entries} = dirMap;

	if (type === FILE || entries._INDEX_ONLY) return require(dirMap.path);

	const obj = Object.create(null);

	forIn(entries, (rawKey) => {
		const entryMap = entries[rawKey];
		const key = resolveKey(rawKey, entryMap, aliasesMap, opts.mapKey);

		if (staleList && isStale(entryMap.path, staleList)) {
			obj[key] = {_entryMap: entryMap};
		}
		else if (groupsMap && groupsMap.has(key)) {
			const groupName = groupsMap.get(key);

			obj[groupName] = obj[groupName] || Object.create(null);
			obj[groupName][key] = requireFolder(entryMap.path, opts);
		}
		else {
			const hookFn = hooks[key];

			if (hookFn) hookFn(obj, entryMap);
			else obj[key] = requireFolder(entryMap.path, opts);
		}
	});

	return obj;
}

module.exports = requireFolder;

function resolveKey (rawKey, map, aliasMap, keyMapper) {
	// map.base || key
	const key = (map.type === FILE) ? map.base : rawKey;

	if (aliasMap && aliasMap.has(key)) {
		return aliasMap.get(key);
	}

	return typeof keyMapper == 'function' ? keyMapper(key) : key;
}

function createAliasesMap (rawAliases) {
	if (!rawAliases) return null;

	return flipFlatObjToMap(rawAliases);
}

function createGroupsMap (rawGroups) {
	if (!rawGroups) return null;

	return flipFlatObjToMap(rawGroups);
}

/*
	Turns an object with string/array values
	into a map of {value: key}.

	Flips: reversing key:value => value:key
	Flattens: key: [val1, val2, valu3] => val1=key, val2=key, val3=key

	Example:

	aliases = {
		nba: ['NBA', 'N.B.A.']
	}

	Becomes:

	aliasesMap = {
		'NBA'  : 'nba',
		'N.B.A': 'nba',
	}
*/
function flipFlatObjToMap (obj) {
	const map = new Map();

	forIn(obj, (key, value) => {
		if (typeof value == 'string') {
			map.set(value, key);
		}
		else if (Array.isArray(value)) {
			value.forEach((item) => {
				map.set(item, key);
			});
		}
	});

	return map;
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

function isStale (entryPath, staleList) {
	if (!staleList) return false;
	const staleLen = staleList.length;

	for (let i = 0; i < staleLen; i++) {
		const staleName = staleList[i];
		const pathSplit = entryPath.split(sep);
		const pathSegmentsLen = pathSplit.length;

		for (let j = 0; j < pathSegmentsLen; j++) {
			const segment = pathSplit[j];

			if (segment === staleName) return true;
		}
	}
}
