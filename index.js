const mapFolder = require('map-folder');

function requireFolder (dirPath, opts = {}) {
	const indexFlagFile = opts.indexFlagFile;
	const includeList = new Set(opts.include || []);
	const excludeList = opts.exclude || [];

	const dirMap = mapFolder(dirPath, {
		include: ['.js', indexFlagFile, ...includeList],
		exclude: excludeList
	});

	const aliasesMap = createAliasesMap(opts.alias || opts.aliases);
	const groupsMap = createGroupsMap(opts.group || opts.groups);
	const hooks = opts.hooks || Object.create(null);
	const {isFile, entries} = dirMap;

	if (isFile || isIndexOnly(indexFlagFile, entries)) return require(dirMap.path);

	const obj = Object.create(null);

	forIn(entries, (mapKey, entryMap) => {
		const key = resolveKey(entryMap, aliasesMap, opts.mapKey, opts.normalizeKeys);

		if (includeList && includeList.has(entryMap.name)) {
			obj[key] = entryMap;
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

function resolveKey (map, aliasMap, keyMapper, normalizeKeys = false) {
	const rawKey = (map.isFile) ? map.base : map.name;

	if (aliasMap && aliasMap.has(rawKey)) {
		return aliasMap.get(rawKey);
	}

	const key = normalizeKeys ? normalizeKey(rawKey) : rawKey;

	return typeof keyMapper == 'function' ? keyMapper(key) : key;
}

const UNDERSCORE = '_';
const DASHES_N_SPACES_RGX = /(-|\s)+/ug;

function normalizeKey (rawKey) {
	return rawKey.replace(DASHES_N_SPACES_RGX, UNDERSCORE);
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

function isIndexOnly (indexFlagFile, entries) {
	return entries['index.js'];
	// const entryCount = Object.keys(entries).length;
	// const singleIndex = entryCount === 1 && entries['index.js'];

	// return singleIndex || entries[indexFlagFile];
}
