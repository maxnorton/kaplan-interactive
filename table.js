var t, a, eff, discount; // indices
var cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4; // user-set parameters
var treatedCDNR, treatedDNR, treatedNR, treatedYields = new Array(); // outcomes
var costs, pcFtnOfT, isProfitable = new Array(); // collation arrays

function the_table(age, efficacy, discount, cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4) {
	d3.tsv("yield-rates.tsv", function(data) {

		var treatedYields, treatedNR, treatedDNR, treatedCDNR, ccthv, acdnb = new Array();
		var bea, lpy, bep;

		var scenarios = {
			'healthy' : 'Healthy, untreated',
			'untreated' : 'Infected, untreated',
			'25y3' : '25% DCE treatment adopted year 3',
			'50y3' : '50% DCE treatment adopted year 3',
			'75y3' : '75% DCE treatment adopted year 3',
			'25y5' : '25% DCE treatment adopted year 5',
			'50y5' : '50% DCE treatment adopted year 5',
			'75y5' : '75% DCE treatment adopted year 5',
			'25y10' : '25% DCE treatment adopted year 10',
			'50y10' : '50% DCE treatment adopted year 10',
			'75y10' : '75% DCE treatment adopted year 10'
		};

		var scenarioKeys = Object.keys(scenarios);

		var discountFactor = 1/(1+discount/100);

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

		var healthyNR = [];
		for (var i in healthyYields) {
			healthyNR[i] = price*healthyYields[i]-costs[i]-pcFtnOfT[i];
		};

		var untreatedNR = [];
		for (var i in untreatedYields) {
			untreatedNR[i] = price*untreatedYields[i]-costs[i];
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

		var healthyCDNR = [ healthyDNR[0] ];
		for (var i=1; i<healthyDNR.length; i++) {
			healthyCDNR[i] = healthyDNR[i] + healthyCDNR[i-1];
		};

		var untreatedCDNR = [ untreatedDNR[0] ];
		for (var i=1; i<untreatedDNR.length; i++) {
			untreatedCDNR[i] = untreatedDNR[i] + untreatedCDNR[i-1];
		};

 		var healthyCDNRna = [ price*healthyYields[0] - costs[0] ];
 		for (var i=1; i<healthyYields.length; i++) {
 			var compoundDiscount = Math.pow(discountFactor, i);
 			healthyCDNRna[i] = (price*healthyYields[i] - costs[i])*compoundDiscount + healthyCDNR[i-1];
 		};

 		for (var a=2; a<scenarioKeys.length; a++) {

			var selectCol = scenarioKeys[a];
			console.log(selectCol);

			treatedYields = [];
			for (var i in healthyYields) {
				treatedYields[i] = healthyYields[i]*data[i][selectCol]/100;
			};

			treatedNR = [];
			for (var i in treatedYields) {
				treatedNR[i] = price*treatedYields[i]-costs[i]-pcFtnOfT[i];
			};

		treatedDNR = [];
			for (var i in treatedNR) {
				var compoundDiscount = Math.pow(discountFactor, i);
				treatedDNR[i] = treatedNR[i]*compoundDiscount;
			};

			treatedCDNR = [ treatedDNR[0] ];
			for (var i=1; i<treatedDNR.length; i++) {
				treatedCDNR[i] = treatedDNR[i] + treatedCDNR[i-1];
			};

			ccthv = [ parseInt(pcFtnOfT[0]) ];
			for (var i=1; i<healthyDNR.length; i++) {
				ccthv[i] = parseInt(pcFtnOfT[i]) + parseInt(ccthv[i-1]);
			};

			acdnb = [];
			for (var i in treatedCDNR) {
				acdnb[i] = treatedCDNR[i] - untreatedCDNR[i];
	 		};

	 		for (var i in treatedCDNR) {
	 			if (treatedCDNR[i] > untreatedCDNR[i]) {
	 				bea = i;
	 				break;
	 			};
	 		};

	 		lpy=0;
	 		while (treatedNR[lpy+1] < 0 && lpy<25) {
	 			lpy++;
	 		}
	 		if (lpy==25) {
	 			lpy = 'Never profitable';
	 		} else {
		 		while (treatedNR[lpy+1] > 0 && lpy<25) {
		 			lpy++;
		 		}
		 	}

	 		bep = (healthyCDNRna[25] - healthyCDNR[25]) / ( (treatedCDNR[25] - healthyCDNR[25]) - (untreatedCDNR[25] - healthyCDNRna[25]) );
	 		if (bep > 1)
	 			bep = 1;

	 	};

				var the_table_html = '<table><thead><th>Age</th><th>Healthy yield</th><th>Untreated yield</th><th>Treated yield</th><th>Cultural costs</th><th>Practice costs</th><th>NR</th><th>DNR</th><th>CDNR</th><th>Cum cost of treating healthy vineyard</th><th>ACDNB</th><th>Breakeven age</th><th>Last profitable year</th><th>Breakeven probability</th></thead><tbody>';

				for (var k=0; k<26; k++) {
					the_table_html += '<tr><td>' + k + '</td><td>' + healthyYields[k] + '</td><td>' + untreatedYields[k] + '</td><td>' + treatedYields[k] + '</td><td>' + costs[k] + '</td><td>' + pcFtnOfT[k] + '</td><td>' + treatedNR[k] + '</td><td>' + treatedDNR[k] + '</td><td>' + treatedCDNR[k] + '</td><td>' + ccthv[k] + '</td><td>' + acdnb[k] + '</td><td>' + bea + '</td><td>' + lpy + '</td><td>' + bep + '</td></tr>';
				}

				the_table_html += '</tbody></table>';
				$('.results').html(the_table_html);
	});
};