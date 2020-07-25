[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/taitulism/require-folder.svg?branch=develop)](https://travis-ci.org/taitulism/require-folder)

require-folder
==============
Recursively require all files within a folder.

Installation
------------
```sh
$ npm install require-folder
```

Usage
-----
```js
const requireFolder = require('require-folder');

const result = requireFolder('path/to/folder', options);
```

Result
-----
Example folder structure:
```
└─ target-folder
   ├─ utils
   │  ├─ string_utils.js
   │  └─ array_utils.js
   └─ index.js
```

Results:
```js
result = {
    index: require('target-folder'),
    utils: {
        string_utils: require('target-folder/utils/string_utils')
        array_utils: require('target-folder/utils/array_utils')
    }
}
```

## API
------------------------------------------------------------------------
## `requireFolder(path, options)`
### Arguments:
* **path** - A string, a folder path to require.
* **options** - A configuration object. See below.

### Return:
An object contains all the required modules in the target folder. The object's structure is generally a representation of the folder.

## Options
* [exclude](#exclude)
* [include](#include)
* [indexFlagFile](#indexflagfile)
* [skipSingleIndex](#skipsingleindex)
* [aliases](#aliases)
* [groups](#groups)
* [mapKey](#mapKey)
* [hooks](#hooks)



### `exclude`
file & folder names to skip. See [map-folder](https://github.com/taitulism/map-folder/#map-folder) docs for more details.



### `include`
file & folder names and extensions to map only. See [map-folder](https://github.com/taitulism/map-folder/#map-folder) docs for more details.



### `indexFlagFile`
Naturally in Node, when you require a folder you get its `index.js` file content, which is everything that folder `exports`. With `require-folder`, you will have all the `exports` of all files, including `index.js`.

If you want Node's natural behavior for certain folders ...........................?????????????

When you have a folder and it's main file, `index.js`, requires everything around it



### `skipSingleIndex`
By default, `require-folder` skips an `index` property if it's the only property on an object(the only file in a folder). Set to `false` if you want to keep single index files.

Example:
```
└─ target-folder
   └─ module_A
      └─ index.js
```
```js
const result = requireFolder('./target-folder', {
    skipSingleIndex: false
});
```
When `true` (default):
```js
result = {
    module_A: require('index.js')
}
```

When `false`:
```js
result = {
    module_A: {
        index: require('index.js')
    }
}
```



### `mapKey`
You can rename the required modules\` names by using a `mapKey` function. This could be used for normalizing  file names (lower/upper case), converting dashes to undersocres or spaces into camelCase, for example. This function gets called with the file/folder name. The returned string will be used as the new prop name on the result object.

Example:
```
└─ target-folder
   ├─ HELLO.js
   └─ WORLD.js
```
```js
requireFolder('./target-folder', {
    mapKey (rawKey) {
        return rawKey.toLowerCase();
    }
})
```
```js
result = {
    hello: require('target-folder/HELLO'),
    world: require('target-folder/WORLD'),
}
```



### `aliases`
You can map different names to the same key. For example, when a certain prop could be found in different variation: with spaces, dashes or underscores, and you want to convert them all into camelCase.
```js
// converts all the variations in the array into "helloWorld"
requireFolder('./target-folder', {
    alias: {
        helloWorld: ['hello world', 'hello-world', 'hello_world'],
    }
})
```

> Having more than one aliased filename is stupid....................................



### `groups`
You can group multiple items under one namespace property.

Example:
```
└─ target-folder
   ├─ red.js
   ├─ green.js
   ├─ blue.js
   └─ utils.js
```
```js
requireFolder('./target-folder', {
    group: {
        colors: ['red', 'green', 'blue'],
    },
})
```
```js
result = {
    utils: require('target-folder/utils'),
    colors: {
        red: require('target-folder/red'),
        green: require('target-folder/green'),
        blue: require('target-folder/blue'),
    }
}
```



### `hooks`
Sometimes you need more control over the requiring details. You can use the `hooks` option for custom requiring certain entries (files or folder). 

`hooks` should be an object that its keys are the names of the entries (files or folders) you would like to customize and values are their hook functions.


#### Hook Function Arguments
* `parent` - the parent folder context object which current entry will be required into.
* `entryMap` - an entry meta data object. Contains its path, type, name, base name & extension (if file) or its entries (if folder).

See [map-folder](https://github.com/taitulism/map-folder/#entry-map-object) docs for more details about the `entryMap` object.

Example:
```
└─ target-folder
   └─ my-file.js
```
```js
requireFolder('./target-folder', {
    hooks: {
        'my-file': (parent, entryMap) => {
            
            // entryMap.path = 'path/to/target-folder/my-file'
            const myFileExport = require(entryMap.path);

            if (condition) {
                parent.foo = myFileExport;
            }
            else {
                parent.bar = myFileExport;
            }
        },
    }
})
```
```js
result = {
    foo: require('target-folder/my-file'),
    // or
    bar: require('target-folder/my-file'),
}
```
