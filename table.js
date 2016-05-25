var t, a, eff; // indices
var cost1, cost2, cost3, cost4, pc, price, yield1, yield2, yield3, yield4, yield5; // user-set parameters
var cdnb, nr, yield; // outcomes

function the_table(cost1, cost2, cost3, cost4, pc, price, yield1, yield2, yield3, yield4, yield5) {
	console.log(cost1, cost2, cost3, cost4, pc, price, yield1, yield2, yield3, yield4, yield5);
	d3.tsv("yield-rates.tsv", function(data) {
		for (i=0; i<data.length; i++) {
			console.log(data[i]);
		}
	});
}