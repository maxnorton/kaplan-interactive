var t, a, eff, discount; // indices
var cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4; // user-set parameters
var treatedCDNR, treatedDNR, treatedNR, treatedYields = new Array(); // outcomes
var costs, pcFtnOfT, isProfitable = new Array(); // collation arrays

function the_table(age, efficacy, discount, cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4) {
	d3.tsv("yield-rates.tsv", function(data) {

		var selectCol = (efficacy==0) ? 'noAction' : efficacy + 'y' + age;
		console.log(selectCol);
		healthyYields = [
			yield0,
			yield1,
			yield2,
			yield3,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,		
			yield4		
		];

		untreatedYields = [];
		for (var i in healthyYields) {
			untreatedYields[i] = healthyYields[i]*data[i]['noAction']/100;
		}

		var treatedYields = [];
		for (var i in healthyYields) {
			treatedYields[i] = healthyYields[i]*data[i][selectCol]/100;
		};

		costs = [
			cost0,
			cost1,
			cost2,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3			
		];

		var pcFtnOfT = [];
		for (var l=0; l<age; l++) {
			pcFtnOfT[l] = 0;
		};
		for (var l=age; l<26; l++) {
			pcFtnOfT[l] = pc;
		};

		var treatedNR = [];
		for (var i in treatedYields) {
			treatedNR[i] = price*treatedYields[i]-costs[i]-pcFtnOfT[i];
		};

		var healthyNR = [];
		for (var i in healthyYields) {
			healthyNR[i] = price*healthyYields[i]-costs[i]-pcFtnOfT[i];
		};

		var untreatedNR = [];
		for (var i in untreatedYields) {
			untreatedNR[i] = price*untreatedYields[i]-costs[i];
		};

		var treatedDNR = [];
		var discountFactor = 1/(1+discount/100);
		for (var i in treatedNR) {
			var compoundDiscount = Math.pow(discountFactor, i);
			treatedDNR[i] = treatedNR[i]*compoundDiscount;
		};

		var healthyDNR = [];
		for (var i in healthyNR) {
			var compoundDiscount = Math.pow(discountFactor, i);
			healthyDNR[i] = healthyNR[i]*compoundDiscount;
		};

		var untreatedDNR = [];
		for (var i in untreatedNR) {
			var compoundDiscount = Math.pow(discountFactor, i);
			untreatedDNR[i] = untreatedNR[i]*compoundDiscount;
		};

		var treatedCDNR = [ treatedDNR[0] ];
		for (var i=1; i<treatedDNR.length; i++) {
			treatedCDNR[i] = treatedDNR[i] + treatedCDNR[i-1];
		};

		var healthyCDNR = [ healthyDNR[0] ];
		for (var i=1; i<healthyDNR.length; i++) {
			healthyCDNR[i] = healthyDNR[i] + healthyCDNR[i-1];
		};

		var untreatedCDNR = [ untreatedDNR[0] ];
		for (var i=1; i<untreatedDNR.length; i++) {
			untreatedCDNR[i] = untreatedDNR[i] + untreatedCDNR[i-1];
		};

		var ccthv = [ parseInt(pcFtnOfT[0]) ];
		for (var i=1; i<healthyDNR.length; i++) {
			ccthv[i] = parseInt(pcFtnOfT[i]) + parseInt(ccthv[i-1]);
		};

		var acdnb = [];
		for (var i in treatedCDNR) {
			acdnb[i] = treatedCDNR[i] - untreatedCDNR[i];
 		};

 		var bea;
 		for (var i in treatedCDNR) {
 			if (treatedCDNR[i] > untreatedCDNR[i]) {
 				bea = i;
 				break;
 			};
 		};

 		//BEP
 		var healthyCDNRna = 0;
 		for (var i in healthyYields) {
 			healthyCDNRna += price*healthyYields[i] - costs[i];
 		};
 		console.log(healthyCDNRna);
 		var bep = (healthyCDNRna - healthyCDNR[25]) / ( (treatedCDNR[25] - healthyCDNR[25]) - (untreatedCDNR[25] - healthyCDNRna) );

		var the_table_html = '<table><thead><th>Age</th><th>Healthy yield</th><th>Untreated yield</th><th>Treated yield</th><th>Cultural costs</th><th>Practice costs</th><th>NR</th><th>DNR</th><th>CDNR</th><th>Cum cost of treating healthy vineyard</th><th>ACDNB</th><th>Breakeven age</th><th>Breakeven probability</th></thead><tbody>';

		for (var k=0; k<26; k++) {
			the_table_html += '<tr><td>' + k + '</td><td>' + healthyYields[k] + '</td><td>' + untreatedYields[k] + '</td><td>' + treatedYields[k] + '</td><td>' + costs[k] + '</td><td>' + pcFtnOfT[k] + '</td><td>' + treatedNR[k] + '</td><td>' + treatedDNR[k] + '</td><td>' + treatedCDNR[k] + '</td><td>' + ccthv[k] + '</td><td>' + acdnb[k] + '</td><td>' + bea + '</td><td>' + bep + '</td></tr>';
		}

		the_table_html += '</tbody></table>';
		$('.results').html(the_table_html);
	});
};