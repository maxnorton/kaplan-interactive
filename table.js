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

		treatedNR = [
			price*treatedYields[0]-costs[0]-pcFtnOfT[0],
			price*treatedYields[1]-costs[1]-pcFtnOfT[1],
			price*treatedYields[2]-costs[2]-pcFtnOfT[2],
			price*treatedYields[3]-costs[3]-pcFtnOfT[3],
			price*treatedYields[4]-costs[4]-pcFtnOfT[4],
			price*treatedYields[5]-costs[5]-pcFtnOfT[5],
			price*treatedYields[6]-costs[6]-pcFtnOfT[6],
			price*treatedYields[7]-costs[7]-pcFtnOfT[7],
			price*treatedYields[8]-costs[8]-pcFtnOfT[8],
			price*treatedYields[9]-costs[9]-pcFtnOfT[9],
			price*treatedYields[10]-costs[10]-pcFtnOfT[10],
			price*treatedYields[11]-costs[11]-pcFtnOfT[11],
			price*treatedYields[12]-costs[12]-pcFtnOfT[12],
			price*treatedYields[13]-costs[13]-pcFtnOfT[13],
			price*treatedYields[14]-costs[14]-pcFtnOfT[14],
			price*treatedYields[15]-costs[15]-pcFtnOfT[15],
			price*treatedYields[16]-costs[16]-pcFtnOfT[16],
			price*treatedYields[17]-costs[17]-pcFtnOfT[17],
			price*treatedYields[18]-costs[18]-pcFtnOfT[18],
			price*treatedYields[19]-costs[19]-pcFtnOfT[19],
			price*treatedYields[20]-costs[20]-pcFtnOfT[20],
			price*treatedYields[21]-costs[21]-pcFtnOfT[21],
			price*treatedYields[22]-costs[22]-pcFtnOfT[22],
			price*treatedYields[23]-costs[23]-pcFtnOfT[23],
			price*treatedYields[24]-costs[24]-pcFtnOfT[24],
			price*treatedYields[25]-costs[25]-pcFtnOfT[25]
		];

		treatedDNR = [
			treatedNR[0]*(1/(1+discount/100)),
			treatedNR[1]*(1/(1+discount/100)),
			treatedNR[2]*(1/(1+discount/100)),
			treatedNR[3]*(1/(1+discount/100)),
			treatedNR[4]*(1/(1+discount/100)),
			treatedNR[5]*(1/(1+discount/100)),
			treatedNR[6]*(1/(1+discount/100)),
			treatedNR[7]*(1/(1+discount/100)),
			treatedNR[8]*(1/(1+discount/100)),
			treatedNR[9]*(1/(1+discount/100)),
			treatedNR[10]*(1/(1+discount/100)),
			treatedNR[11]*(1/(1+discount/100)),
			treatedNR[12]*(1/(1+discount/100)),
			treatedNR[13]*(1/(1+discount/100)),
			treatedNR[14]*(1/(1+discount/100)),
			treatedNR[15]*(1/(1+discount/100)),
			treatedNR[16]*(1/(1+discount/100)),
			treatedNR[17]*(1/(1+discount/100)),
			treatedNR[18]*(1/(1+discount/100)),
			treatedNR[19]*(1/(1+discount/100)),
			treatedNR[20]*(1/(1+discount/100)),
			treatedNR[21]*(1/(1+discount/100)),
			treatedNR[22]*(1/(1+discount/100)),
			treatedNR[23]*(1/(1+discount/100)),
			treatedNR[24]*(1/(1+discount/100)),
			treatedNR[25]*(1/(1+discount/100))
		];

		treatedCDNR = [ treatedDNR[0] ];
		for (var m=1; m<26; m++) {
			treatedCDNR[m] = treatedDNR[m] + treatedCDNR[m-1];
		};

		/*var acdnb = [];
		for (var i in treatedDNR) {
			acdnb = 
		}*/

		isProfitable = [ null ];
		for (var n=1; n<26; n++) {
			isProfitable[n] = ( treatedDNR[n] > 0 ) ? 1 : 0;
		}; // in what case would the cumDNR slope up but never climb over zero? confused.

		var the_table_html = '<table><thead><th>Age</th><th>Healthy yield</th><th>Untreated yield</th><th>Treated yield</th><th>Cultural costs</th><th>Practice costs</th><th>NR</th><th>DNR</th><th>CDNR</th></thead><tbody>';

		for (var k=0; k<26; k++) {
			the_table_html += '<tr><td>' + k + '</td><td>' + healthyYields[k] + '</td><td>' + untreatedYields[k] + '</td><td>' + treatedYields[k] + '</td><td>' + costs[k] + '</td><td>' + pcFtnOfT[k] + '</td><td>' + treatedNR[k] + '</td><td>' + treatedDNR[k] + '</td><td>' + treatedCDNR[k] + '</td></tr>';
		}

		the_table_html += '</tbody></table>';
		$('.results').html(the_table_html);
	});
};