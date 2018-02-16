/* tests-about.js
 * Henry Hedden
 * 2018-02-16
 */

suite('"About" Page Tests', function() {
	test('page should contain link to contact page', function() {
		assert($('a[href="/contact"]').length);
	});
});

