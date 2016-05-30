var t, a, eff, discount; // indices
var cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4; // user-set parameters
var cdnr, dnr, nr, yields = new Array(); // outcomes
var costs, pcFtnOfT, isProfitable = new Array(); // collation arrays

function the_table(age, efficacy, discount, cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4) {
	d3.tsv("yield-rates.tsv", function(data) {

		console.log(efficacy + 'y' + age);
		var selectCol = (efficacy==0) ? 'no_action' : efficacy + 'y' + age;
		console.log(selectCol);
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
			untreatedYields[i] = healthyYields[i]*data[i]['no_action']/100;
		}

		var yields = [];
		for (var i in healthyYields) {
			yields[i] = healthyYields[i]*data[i][selectCol]/100;
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

		console.log(costs);
		console.log(price);
		console.log(yields);

		var pcFtnOfT = [];

		for (var l=0; l<age; l++) {
			pcFtnOfT[l] = 0;
		};
		for (l=age; l<26; l++) {
			pcFtnOfT[l] = pc;
		};

		console.log(pcFtnOfT);

		nr = [
			price*yields[0]-costs[0]-pcFtnOfT[0],
			price*yields[1]-costs[1]-pcFtnOfT[1],
			price*yields[2]-costs[2]-pcFtnOfT[2],
			price*yields[3]-costs[3]-pcFtnOfT[3],
			price*yields[4]-costs[4]-pcFtnOfT[4],
			price*yields[5]-costs[5]-pcFtnOfT[5],
			price*yields[6]-costs[6]-pcFtnOfT[6],
			price*yields[7]-costs[7]-pcFtnOfT[7],
			price*yields[8]-costs[8]-pcFtnOfT[8],
			price*yields[9]-costs[9]-pcFtnOfT[9],
			price*yields[10]-costs[10]-pcFtnOfT[10],
			price*yields[11]-costs[11]-pcFtnOfT[11],
			price*yields[12]-costs[12]-pcFtnOfT[12],
			price*yields[13]-costs[13]-pcFtnOfT[13],
			price*yields[14]-costs[14]-pcFtnOfT[14],
			price*yields[15]-costs[15]-pcFtnOfT[15],
			price*yields[16]-costs[16]-pcFtnOfT[16],
			price*yields[17]-costs[17]-pcFtnOfT[17],
			price*yields[18]-costs[18]-pcFtnOfT[18],
			price*yields[19]-costs[19]-pcFtnOfT[19],
			price*yields[20]-costs[20]-pcFtnOfT[20],
			price*yields[21]-costs[21]-pcFtnOfT[21],
			price*yields[22]-costs[22]-pcFtnOfT[22],
			price*yields[23]-costs[23]-pcFtnOfT[23],
			price*yields[24]-costs[24]-pcFtnOfT[24],
			price*yields[25]-costs[25]-pcFtnOfT[25]
		];

		dnr = [
			nr[0]*(1/(1+discount/100)),
			nr[1]*(1/(1+discount/100)),
			nr[2]*(1/(1+discount/100)),
			nr[3]*(1/(1+discount/100)),
			nr[4]*(1/(1+discount/100)),
			nr[5]*(1/(1+discount/100)),
			nr[6]*(1/(1+discount/100)),
			nr[7]*(1/(1+discount/100)),
			nr[8]*(1/(1+discount/100)),
			nr[9]*(1/(1+discount/100)),
			nr[10]*(1/(1+discount/100)),
			nr[11]*(1/(1+discount/100)),
			nr[12]*(1/(1+discount/100)),
			nr[13]*(1/(1+discount/100)),
			nr[14]*(1/(1+discount/100)),
			nr[15]*(1/(1+discount/100)),
			nr[16]*(1/(1+discount/100)),
			nr[17]*(1/(1+discount/100)),
			nr[18]*(1/(1+discount/100)),
			nr[19]*(1/(1+discount/100)),
			nr[20]*(1/(1+discount/100)),
			nr[21]*(1/(1+discount/100)),
			nr[22]*(1/(1+discount/100)),
			nr[23]*(1/(1+discount/100)),
			nr[24]*(1/(1+discount/100)),
			nr[25]*(1/(1+discount/100))
		];

		cdnr = [ dnr[0] ];
		for (var m=1; m<26; m++) {
			cdnr[m] = dnr[m] + cdnr[m-1];
		};

		/*var acdnb = [];
		for (var i in dnr) {
			acdnb = 
		}*/

		isProfitable = [ null ];
		for (var n=1; n<26; n++) {
			isProfitable[n] = ( dnr[n] > 0 ) ? 1 : 0;
		}; // in what case would the cumDNR slope up but never climb over zero? confused.

		var the_table_html = '<table><thead><th>Age</th>>th>Healthy yield</th><th>Untreated yield</th><th>Treated yield</th><th>Cultural costs</th><th>Practice costs</th><th>NR</th><th>DNR</th><th>CDNR</th></thead><tbody>';

		for (var k=0; k<26; k++) {
			the_table_html += '<tr><td>' + k + '</td><td>' + healthyYields[k] + '</td><td>' + untreatedYields[k] + '</td><td>' + yields[k] + '</td><td>' + costs[k] + '</td><td>' + pcFtnOfT[k] + '</td><td>' + nr[k] + '</td><td>' + dnr[k] + '</td><td>' + cdnr[k] + '</td></tr>';
		}

		the_table_html += '</tbody></table>';
		$('.results').html(the_table_html);
	});
};