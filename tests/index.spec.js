const {resolve} = require('path');
const {expect} = require('chai');

const requireFolder = require('../');

describe('requireFolder', () => {
	it('is a function', () => {
		expect(requireFolder).to.be.a('function');
	});

	it('shallow', () => {
		expect(requireFolder('./tests/dummy-folders/shallow')).to.deep.equal({
			a: 'aaa',
			b: 'bbb',
		});
	});

	it('prefers the file on duplicates', () => {
		expect(requireFolder('./tests/dummy-folders/duplicates')).to.deep.equal({
			a: 'aaa',
			b: 'bbb',
		});
	});

	it('skips a lonely `index` property', () => {
		expect(requireFolder('./tests/dummy-folders/skip-index-prop')).to.deep.equal({
			a: 'a',
			bb: 'bb',
			ccc: {
				index: 'ccc-index',
				ccc: 'ccc',
			}
		});
	});

	it('deep', () => {
		expect(requireFolder('./tests/dummy-folders/deep')).to.deep.equal({
			a: 'aaa',
			b: 'bbb',
			folder: {
				a: 'folder-a',
				b: 'folder-b',
			},
			'level-1': {
				a: 'level-1-a',
				b: 'level-1-b',
				'level-2': {
					a: 'level-2-a',
					b: 'level-2-b',
				},
			},
		});
	});

	describe('options', () => {
		it('aliases', () => {
			expect(requireFolder('./tests/dummy-folders/aliases', {
				alias: {
					a: 'aa',
					b: ['bbb'],
					c: ['skip', 'cccc'],
				},
			})).to.deep.equal({
				a: 'aa',
				b: 'bbb',
				c: 'cccc',
				d: 'd',
			});
		});

		it('indexFlagFile', () => {
			expect(requireFolder('./tests/dummy-folders/index-flag-file', {
				indexFlagFile: '.index'
			})).to.deep.equal({
				a: 'aaa',
				b: 'bbb',
				'regular-folder': {
					index: 'regular-index',
					a: 'regular-a',
					b: 'regular-b',
				},
				'method-folder': {
					a: 'file-a',
					b: 'file-b',
				},
			});
		});

		it('mapKey', () => {
			expect(requireFolder('./tests/dummy-folders/map-key', {
				mapKey (rawKey) {
					return rawKey.toUpperCase();
				},
			})).to.deep.equal({
				A: 'value-a',
				B: 'value-b',
				C: 'value-c',
			});
		});

		it('include', () => {
			expect(requireFolder('./tests/dummy-folders/include', {
				include: ['public'],
			})).to.deep.equal({
				a: 'aaa',
				public: {
					path: resolve(__dirname, 'dummy-folders/include/public'),
					isFile: false,
					name: 'public',
					entries: {
						'style.css': {
							base: 'style',
							ext: 'css',
							name: 'style.css',
							path: resolve(__dirname, 'dummy-folders/include/public/style.css'),
							isFile: true,
						}
					}
				},
			});
		});

		it('groups', () => {
			expect(requireFolder('./tests/dummy-folders/groups', {
				groups: {
					letters: ['a', 'b', 'c'],
				},
			})).to.deep.equal({
				x: 'xx',
				letters: {
					a: 'aaa',
					b: 'bbb',
					c: 'ccc',
				},
			});
		});

		it('hooks', () => {
			expect(requireFolder('./tests/dummy-folders/hooks', {
				hooks: {
					aaa: (ctxObj, entryMap) => {
						expect(ctxObj).to.be.an('object');
						expect(entryMap.name).to.equal('aaa.js');
						ctxObj.myKey = require(entryMap.path);
					},
				},
			})).to.deep.equal({myKey: 'my-value'});
		});

		it('hooks & alias', () => {
			expect(requireFolder('./tests/dummy-folders/hook-and-alias', {
				alias: {ccc: 'bbb'},
				hooks: {
					ccc: (ctxObj, entryMap) => {
						expect(ctxObj).to.be.an('object');
						expect(entryMap.name).to.equal('bbb.js');
						ctxObj.myKey = require(entryMap.path);
					},
				},
			})).to.deep.equal({myKey: 'my-value'});
		});
	});
});
