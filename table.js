var t, a, eff; // indices
var cost1, cost2, cost3, cost4, pc, price, yield1, yield2, yield3, yield4, yield5; // user-set parameters
var cdnb, nr, yield; // outcomes
var yields;

function the_table(cost1, cost2, cost3, cost4, pc, price, yield1, yield2, yield3, yield4, yield5) {
	console.log(cost1, cost2, cost3, cost4, pc, price, yield1, yield2, yield3, yield4, yield5);
	d3.tsv("yield-rates.tsv", function(data) {
		for (i=1; i<data.length; i++) {
			var j = i-1;
		}
		yields = {
			0 : yield1*data[0]['25y03']/100,
			1 : yield1*data[1]['25y03']/100,
			2 : yield2*data[2]['25y03']/100,
			3 : yield3*data[3]['25y03']/100,
			4 : yield4*data[4]['25y03']/100,
			5 : yield5*data[5]['25y03']/100,
			6 : yield5*data[6]['25y03']/100,
			7 : yield5*data[7]['25y03']/100,
			8 : yield5*data[8]['25y03']/100,
			9 : yield5*data[9]['25y03']/100,
			10 : yield5*data[10]['25y03']/100,
			11 : yield5*data[11]['25y03']/100,
			12 : yield5*data[12]['25y03']/100,
			13 : yield5*data[13]['25y03']/100,
			14 : yield5*data[14]['25y03']/100,
			15 : yield5*data[15]['25y03']/100,
			16 : yield5*data[16]['25y03']/100,
			17 : yield5*data[17]['25y03']/100,
			18 : yield5*data[18]['25y03']/100,
			19 : yield5*data[19]['25y03']/100,
			20 : yield5*data[20]['25y03']/100,
			21 : yield5*data[21]['25y03']/100,
			22 : yield5*data[22]['25y03']/100,
			23 : yield5*data[23]['25y03']/100,
			24 : yield5*data[24]['25y03']/100,
			25 : yield5*data[25]['25y03']/100
		};
	console.log(yields);
	});
};