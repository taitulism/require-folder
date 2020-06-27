const mapFolder = require('map-folder');
const {FILE, FOLDER} = mapFolder;

function requireFolder (dirPath, opts = {}) {
	const dirMap = mapFolder.sync(dirPath, ({type, ext, base}) => (
		type === FOLDER || ext === 'js' || base === '_INDEX_ONLY'
	));

	const aliasesMap = createAliasesMap(opts.alias || opts.aliases);
	const groupsMap = createGroupsMap(opts.group || opts.groups);
	const hooks = opts.hooks || Object.create(null);
	const {type, entries} = dirMap;

	if (type === FILE || entries._INDEX_ONLY) return require(dirMap.path);

	const obj = Object.create(null);

	forIn(entries, (key) => {
		const map = entries[key];
		const resolvedKey = resolveKey(key, map, aliasesMap);

		if (groupsMap && groupsMap.has(resolvedKey)) {
			const groupName = groupsMap.get(resolvedKey);

			obj[groupName] = obj[groupName] || Object.create(null);
			obj[groupName][resolvedKey] = requireFolder(map.path, opts);
		}
		else {
			const hookFn = hooks[resolvedKey];

			if (hookFn) hookFn(obj, map);
			else obj[resolvedKey] = requireFolder(map.path, opts);
		}
	});

	return obj;
}

module.exports = requireFolder;

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
