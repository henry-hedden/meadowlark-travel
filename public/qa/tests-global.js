/* tests-global.js
 * Henry Hedden
 * 2018-02-16
 */

suite('Global Tests', function() {
	test('page has a valid title', function() {
		assert(document.title && document.title.match(/\S/) &&
		       document.title.toUpperCase() !== 'TODO');
	});
});

