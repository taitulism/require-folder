const {expect} = require('chai');

const TPL = require('../');

describe('TPL', () => {
	it('is a function', () => {
		expect(TPL).to.be.a('function');
	});

	it('shallow', () => {
		expect(TPL('./tests/dummy-folders/shallow')).to.deep.equal({
			a: 'aaa',
			b: 'bbb',
		});
	});

	it('require js files only', () => {
		expect(TPL('./tests/dummy-folders/duplicates')).to.deep.equal({
			a: 'aaa',
			b: 'bbb',
		});
	});

	it('deep', () => {
		expect(TPL('./tests/dummy-folders/deep')).to.deep.equal({
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

	it('can require index.js only', () => {
		expect(TPL('./tests/dummy-folders/only-index')).to.deep.equal({
			a: 'aaa',
			b: 'bbb',
			'regular-folder': {
				index: 'regular-index',
				a: 'regular-a',
				b: 'regular-b',
			},
			'method-folder': 'method-folder-index',
		});
	});




});
