var t, a, eff; // indices
var cost1, cost2, cost3, cost4, pc, price, yield1, yield2, yield3, yield4, yield5; // user-set parameters
var cdnb, nr, yield; // outcomes
var yieldRates = new Array();

function the_table(cost1, cost2, cost3, cost4, pc, price, yield1, yield2, yield3, yield4, yield5) {
	console.log(cost1, cost2, cost3, cost4, pc, price, yield1, yield2, yield3, yield4, yield5);
	d3.tsv("yield-rates.tsv", function(data) {
		for (i=1; i<data.length; i++) {
			console.log(data[i]);
			yieldRates[i-1] = data[i][3];
		}
	});
	var yields = {
		0 : yield1*yieldRates[0],
		1 : yield1*yieldRates[1],
		2 : yield1*yieldRates[2],
		3 : yield1*yieldRates[3],
		4 : yield1*yieldRates[4],
		5 : yield1*yieldRates[5],
		6 : yield1*yieldRates[6],
		7 : yield1*yieldRates[7],
		8 : yield1*yieldRates[8],
		9 : yield1*yieldRates[9],
		10 : yield1*yieldRates[10],
		11 : yield1*yieldRates[11],
		12 : yield1*yieldRates[12],
		13 : yield1*yieldRates[13],
		14 : yield1*yieldRates[14],
		15 : yield1*yieldRates[15],
		16 : yield1*yieldRates[16],
		17 : yield1*yieldRates[17],
		18 : yield1*yieldRates[18],
		19 : yield1*yieldRates[19],
		20 : yield1*yieldRates[20],
		21 : yield1*yieldRates[21],
		22 : yield1*yieldRates[22],
		23 : yield1*yieldRates[23],
		24 : yield1*yieldRates[24],
		25 : yield1*yieldRates[25]
	};
	console.log(yields);
};