var t, a, eff; // indices
var cost1, cost2, cost3, cost4, pc, price, yield1, yield2, yield3, yield4, yield5; // user-set parameters
var cdnb, nr, yield; // outcomes

function the_table() {
	d3.csv("/yield-rates.tsv", function(data) {
		console.log(data[0]);
	});
}