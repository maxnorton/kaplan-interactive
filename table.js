var t, a, eff, discount; // indices
var cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4; // user-set parameters
var treatedCDNR, treatedDNR, treatedNR, treatedYields = new Array(); // outcomes
var costs, pcFtnOfT, isProfitable = new Array(); // collation arrays

function the_table(age, efficacy, discount, cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4) {
	d3.tsv("yield-rates.tsv", function(data) {

		var selectCol = (efficacy==0) ? 'noAction' : efficacy + 'y' + age;
		healthyYields = [
			yield0,
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
		for (l=age; l<26; l++) {
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

		var treatedDNR = [];
		for (var i in treatedNR) {
			treatedDNR[i] = treatedNR*(1/(1+discount/100));
		};

		var healthyDNR = [];
		for (var i in healthyNR) {
			healthyDNR[i] = healthyNR*(1/(1+discount/100));
		};

		var treatedCDNR = [ treatedDNR[0] ];
		for (var i in treatedDNR) {
			treatedCDNR[i] = treatedDNR[i] + treatedCDNR[i-1];
		};

		var healthyCDNR = [ healthyDNR[0] ];
		for (var i in healthyDNR) {
			healthyCDNR[i] = healthyDNR[i] + healthyCDNR[i-1];
		};

		var ccthv = [];
		for (var i in healthyDNR) {
			ccthv[i] = treatedCDNR[i] - healthyCDNR[i];
		};

		/*var acdnb = [];
		for (var i in treatedDNR) {
			acdnb = 
		}*/

		isProfitable = [ null ];
		for (var n=1; n<26; n++) {
			isProfitable[n] = ( treatedDNR[n] > 0 ) ? 1 : 0;
		}; // in what case would the cumDNR slope up but never climb over zero? confused.

		var the_table_html = '<table><thead><th>Age</th><th>Healthy yield</th><th>Untreated yield</th><th>Treated yield</th><th>Cultural costs</th><th>Practice costs</th><th>NR</th><th>DNR</th><th>CDNR</th><th>Cum cost of treating healthy vineyard</thead><tbody>';

		for (var k=0; k<26; k++) {
			the_table_html += '<tr><td>' + k + '</td><td>' + healthyYields[k] + '</td><td>' + untreatedYields[k] + '</td><td>' + treatedYields[k] + '</td><td>' + costs[k] + '</td><td>' + pcFtnOfT[k] + '</td><td>' + treatedNR[k] + '</td><td>' + treatedDNR[k] + '</td><td>' + treatedCDNR[k] + '</td><td>' + ccthv[k] + '<td></tr>';
		}

		the_table_html += '</tbody></table>';
		$('.results').html(the_table_html);
	});
};