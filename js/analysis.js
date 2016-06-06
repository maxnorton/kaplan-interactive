function applySubmitFunction(genstates) {
	/***** FORM SUBMIT FUNCTION
	------------------------------------ */
	$('#theform').submit(function(e) {
		e.preventDefault();

		/***** Generate figure(s)
		------------------------------------ */
		var fullfig = '';
		var efficacyOrYearlength;
		efficacyOrYearchoice = $('input[name=efficacyOrYearfig]').val() + 'fig';
		switch (efficacyOrYearchoice) {
			case 'efficacyfig':
				efficacyOrYearlength=$('input[name=efficacyfig]:checked').length;
				break;
			default:
				efficacyOrYearlength=$('input[name=yearfig]:checked').length;
				break;			
		};

		if (efficacyOrYearlength==0 || (efficacyOrYearchoice==0 && $('input[name=practicefig]:checked').length==0) ) {
			fullfig = '<p class="alert">The <em>Generate figure</em> option is selected, but insufficient parameters were selected to produce a figure. To generate a figure, please return to the <a href="#" onclick="$(\'body,html\').stop(true,true).animate({scrollTop: $(\'#figureparameters\').offset().top - $(\'header\').height()}, \'500\', \'swing\'); return false;">figure parameters form</a> and select an efficacy level or a year of adoption, and for a net returns figure, at least one management practice.</p>';

		} else {

			switch ( $('input[name=figuredisplay]:checked').val() ) {
				case 'yield':
					var efficacyOrYearfig = [];
					var fig = [];
					for (var j=0; j<efficacyOrYearlength; j++) {
						efficacyOrYearfig[j] = $('input[name=' + efficacyOrYearchoice + ']:checked:eq('+j+')').val();
						fig[j] =  '<a href="img/figures/' + $('select[name=region]').val().toUpperCase() + '-' + 'Yield' + efficacyOrYearfig[j] + '.png" class="swipebox"><img src="img/figures/' + $('select[name=region]').val().toUpperCase() + '-' + 'Yield' + efficacyOrYearfig[j] + '.png" style="width: 910px;" alt="Graphical result" /></a>'
						fullfig += fig[j];
					}
					break;
				case 'netreturns':
					var efficacyOrYearfig = [];
					var practicefig = [];
					var fig = [];
					for (var i=0; i<$('input[name=practicefig]:checked').length; i++) {
						practicefig[i] = $('input[name=practicefig]:checked:eq('+i+')').val();
						for (var j=0; j<efficacyOrYearlength; j++) {
							efficacyOrYearfig[j] = $('input[name=' + efficacyOrYearchoice + ']:checked:eq('+j+')').val();
							fig[i*$('input[name=practicefig]:checked').length+j] =  '<a href="img/figures/' + $('select[name=region]').val().toUpperCase() + '-' + practicefig[i].toUpperCase() + efficacyOrYearfig[j] + '.png" class="swipebox"><img src="img/figures/' + $('select[name=region]').val().toUpperCase() + '-' + practicefig[i].toUpperCase() + efficacyOrYearfig[j] + '.png" style="width: 910px;" alt="Graphical result" /></a>'
							fullfig += fig[i*$('input[name=practicefig]:checked').length+j];
						}
					}
					break;
			};

			fullfig += '</p>';

		};

		/***** Generate table
		------------------------------------ */
		d3.tsv("scenario-presets.tsv", function(data) {
																										
			/*var ccDP25 = [ccDP25y3, ccDP25y5, ccDP25y10];									
			var ccDP50 = [ccDP50y3, ccDP50y5, ccDP50y10];									
			var ccDP75 = [ccDP75y3, ccDP75y5, ccDP75y10];									
			var ccHP25 = [ccHP25y3, ccHP25y5, ccHP25y10];									
			var ccHP50 = [ccHP50y3, ccHP50y5, ccHP50y10];					
			var ccHP75 = [ccHP75y3, ccHP75y5, ccHP75y10];					
			var ccDBP25 = [ccDBP25y3, ccDBP25y5, ccDBP25y10];					
			var ccDBP50 = [ccDBP50y3, ccDBP50y5, ccDBP50y10];				
			var ccDBP75 = [ccDBP75y3, ccDBP75y5, ccDBP75y10];				
			var ccDP = [ccDP25, ccDP50, ccDP75];
			var ccHP = [ccHP25, ccHP50, ccHP75];
			var ccDBP = [ccDBP25, ccDBP50, ccDBP75];
			var cc = [ccDP, ccHP, ccDBP];
			
			var sonomaDP25 = [sonomaDP25y3, sonomaDP25y5, sonomaDP25y10];
			var sonomaDP50 = [sonomaDP50y3, sonomaDP50y5, sonomaDP50y10];
			var sonomaDP75 = [sonomaDP75y3, sonomaDP75y5, sonomaDP75y10];
			var sonomaHP25 = [sonomaHP25y3, sonomaHP25y5, sonomaHP25y10];
			var sonomaHP50 = [sonomaHP50y3, sonomaHP50y5, sonomaHP50y10];
			var sonomaHP75 = [sonomaHP75y3, sonomaHP75y5, sonomaHP75y10];
			var sonomaDBP25 = [sonomaDBP25y3, sonomaDBP25y5, sonomaDBP25y10];
			var sonomaDBP50 = [sonomaDBP50y3, sonomaDBP50y5, sonomaDBP50y10];
			var sonomaDBP75 = [sonomaDBP75y3, sonomaDBP75y5, sonomaDBP75y10];
			var sonomaDP = [sonomaDP25, sonomaDP50, sonomaDP75];
			var sonomaHP = [sonomaHP25, sonomaHP50, sonomaHP75];
			var sonomaDBP = [sonomaDBP25, sonomaDBP50, sonomaDBP75];
			var sonoma = [sonomaDP, sonomaHP, sonomaDBP];
			
			var lakeDP25 = [lakeDP25y3, lakeDP25y5, lakeDP25y10];
			var lakeDP50 = [lakeDP50y3, lakeDP50y5, lakeDP50y10];
			var lakeDP75 = [lakeDP75y3, lakeDP75y5, lakeDP75y10];
			var lakeHP25 = [lakeHP25y3, lakeHP25y5, lakeHP25y10];
			var lakeHP50 = [lakeHP50y3, lakeHP50y5, lakeHP50y10];
			var lakeHP75 = [lakeHP75y3, lakeHP75y5, lakeHP75y10];
			var lakeDBP25 = [lakeDBP25y3, lakeDBP25y5, lakeDBP25y10];
			var lakeDBP50 = [lakeDBP50y3, lakeDBP50y5, lakeDBP50y10];
			var lakeDBP75 = [lakeDBP75y3, lakeDBP75y5, lakeDBP75y10];
			var lakeDP = [lakeDP25, lakeDP50, lakeDP75];
			var lakeHP = [lakeHP25, lakeHP50, lakeHP75];
			var lakeDBP = [lakeDBP25, lakeDBP50, lakeDBP75];
			var lake = [lakeDP, lakeHP, lakeDBP];
			
			var nsjDP25 = [nsjDP25y3, nsjDP25y5, nsjDP25y10];
			var nsjDP50 = [nsjDP50y3, nsjDP50y5, nsjDP50y10];
			var nsjDP75 = [nsjDP75y3, nsjDP75y5, nsjDP75y10];
			var nsjHP25 = [nsjHP25y3, nsjHP25y5, nsjHP25y10];
			var nsjHP50 = [nsjHP50y3, nsjHP50y5, nsjHP50y10];
			var nsjHP75 = [nsjHP75y3, nsjHP75y5, nsjHP75y10];
			var nsjDBP25 = [nsjDBP25y3, nsjDBP25y5, nsjDBP25y10];
			var nsjDBP50 = [nsjDBP50y3, nsjDBP50y5, nsjDBP50y10];
			var nsjDBP75 = [nsjDBP75y3, nsjDBP75y5, nsjDBP75y10];
			var nsjDP = [nsjDP25, nsjDP50, nsjDP75];
			var nsjHP = [nsjHP25, nsjHP50, nsjHP75];
			var nsjDBP = [nsjDBP25, nsjDBP50, nsjDBP75];
			var nsj = [nsjDP, nsjHP, nsjDBP];
			
			var napaDP25 = [napaDP25y3, napaDP25y5, napaDP25y10];
			var napaDP50 = [napaDP50y3, napaDP50y5, napaDP50y10];
			var napaDP75 = [napaDP75y3, napaDP75y5, napaDP75y10];
			var napaHP25 = [napaHP25y3, napaHP25y5, napaHP25y10];
			var napaHP50 = [napaHP50y3, napaHP50y5, napaHP50y10];
			var napaHP75 = [napaHP75y3, napaHP75y5, napaHP75y10];
			var napaDBP25 = [napaDBP25y3, napaDBP25y5, napaDBP25y10];
			var napaDBP50 = [napaDBP50y3, napaDBP50y5, napaDBP50y10];
			var napaDBP75 = [napaDBP75y3, napaDBP75y5, napaDBP75y10];
			var napaDP = [napaDP25, napaDP50, napaDP75];
			var napaHP = [napaHP25, napaHP50, napaHP75];
			var napaDBP = [napaDBP25, napaDBP50, napaDBP75];
			var napa = [napaDP, napaHP, napaDBP];
			
			var regions = [cc, sonoma, lake, nsj, napa];
			// /table data declaration*/

			var tableparams = [];
			var inputs = [];
			var outputs = [];
			var inputkeys = [];
			inputkeys = ['dbp', 'hp', 'dp', '25', '50', '75', '3', '5', '10'];
			for (var inputindex in inputkeys) {
				inputs[inputkeys[inputindex]] = false;
			};
			var outputkeys = [];
			outputkeys = ['acdnb', 'lpy', 'aapo', 'bep'];
			for (var outputindex in outputkeys) {
				outputs[outputkeys[outputindex]] = false;
			};

			var theFormDrivenOutputVarsArray = [];
			var a=0;

			console.log(data[0]);

			var tableHeaders = Object.keys(data[0]).slice(1);

			$('input[name=practicetable]:checked').each(function() {
				var thisPractice = $(this).val().toUpperCase();
				$('input[name=efficacytable]:checked').each(function() {
					var thisEfficacy = $(this).val();
					$('input[name=adoptiontable]:checked').each(function() {
						var thisYear = 'y' + $(this).val();
						console.log( $(this).val() );
						var theFormDrivenOutputVarName = $('select[name=region]').val() + thisPractice + thisEfficacy + thisYear;
						var thisIndex;
						console.log(theFormDrivenOutputVarName); 
						for (var i in data) {
							if (data[i]['index']==theFormDrivenOutputVarName)
								thisIndex = i;							
						}
						theFormDrivenOutputVarsArray[a] = $.map(data[thisIndex], function(val, key) { return val; }).slice(1);
						/*for (var i in data[thisIndex]) {
							theFormDrivenOutputVarsArray[a][i] = data[thisIndex][i][1];
						}*/
						a++;
					});
				});
			});

			var table = '';
			if ( theFormDrivenOutputVarsArray.length != 0 && $('input[name=outputtable]:checked').length != 0 ) {
				tableparams['inputs'] = inputs;
				tableparams['outputs'] = outputs;
				$('input[name$=table]:checked').each(function() {
					var element = $(this).attr('value');
					if ( $(this).attr('name') == 'outputtable' )
						tableparams.outputs[element] = true;
					else
						tableparams.inputs[element] = true;
				});

				var tablelabels = '';
				var tablerows = [];

				var the_input_keys = Object.keys(tableparams.inputs);
				var the_output_keys = Object.keys(tableparams.outputs);
				for (var j=0; j<theFormDrivenOutputVarsArray.length; j++) {
					tablerows[j] = '<tr><td>' + theFormDrivenOutputVarsArray[j][0] + '</td><td>' + theFormDrivenOutputVarsArray[j][1] + '</td><td>' + theFormDrivenOutputVarsArray[j][2] + '</td><td>' + theFormDrivenOutputVarsArray[j][3] + '</td>';
				}
				var i=0;
				for ( var param in tableparams.outputs ) {
					var the_key = the_output_keys[i];
					if ( tableparams.outputs[the_key] == true ) {
						tablelabels += '<td>' + tableHeaders[4+i] + '</td>';
						for (var j=0; j<theFormDrivenOutputVarsArray.length; j++) {
							tablerows[j] += '<td>' + theFormDrivenOutputVarsArray[j][4+i] + '</td>';
						}				
					}
					i++;
				};
				for (var j=0; j<theFormDrivenOutputVarsArray.length; j++) {
					tablerows[j] += '</tr>';
				}

				tablelabels = '<tr><td>' + tableHeaders[0] + '</td><td>' + tableHeaders[1] + '</td><td>' + tableHeaders[2] + '</td><td>' + tableHeaders[3] + '</td>' + tablelabels + '</tr>';

				table = '<section class="table-wrap"><h3>Output table</h3><table>' + tablelabels;
				for (var row=0; row<tablerows.length; row++) {
					table += tablerows[row];
				}
				table += '</table></section>';
			} else {
				table = '<p class="alert">The <em>Generate table</em> option is selected, but insufficient parameters were selected to produce an output table. To generate a table, please return to the <a href="#" onclick="$(\'body,html\').stop(true,true).animate({scrollTop: $(\'#tableparameters\').offset().top - $(\'header\').height()}, \'500\', \'swing\'); return false;">table parameters form</a> and select at least one management practice, efficacy level, year of adoption, and output parameter.</p>';
			};

			/***** Generate assumptions table
			------------------------------------ */

			var assumptionsHeaders = ['Region', 'Price', 'Discount Rate', 'Cultivar', 'Additional Cost from Double Pruning per acre', 'Additional Cost from Handpainting TopsinM per acre', 'Cultural Cost &#8211; Year 0 &#8211; Establishing Vineyard', 'Cultural Cost &#8211; Year 1 &#8211; Establishing Vineyard', 'Cultural Cost &#8211; Year 2 &#8211; Establishing Vineyard', 'Cultural Cost &#8211; Year 3+ Established Vineyard'];
			var assumptionsNapa = ['Napa', '$5,192', '3%', 'Cabernet Sauvignon', '478', '71', '$32,303', '$5,264', '$5,304', '$7,784'];
			var assumptionsNSJ = ['Northern San Joaquin', '$650', '3%', 'Cabernet Sauvignon', '175', '45', '$12,213', '$3,370', '$1,004', '$3,505'];
			var assumptionsCC = ['Central Coast', '$1,262', '3%', 'Cabernet Sauvignon', '243', '90', '$9,998', '$2,554', '$3,501', '$4,625'];
			var assumptionsLake = ['Lake', '$1,623', '3%', 'Cabernet Sauvignon', '268', '117', '$7,301', '$6,942', '$3,252', '$3,404'];
			var assumptionsSonoma = ['Sonoma', '$2,355', '3%', 'Cabernet Sauvignon', '335', '74', '$26,780', '$4,204', '$5,186', '$6,280'];		
			var assumptionsArray = [{sonoma: assumptionsSonoma, nsj: assumptionsNSJ, cc: assumptionsCC, lake: assumptionsLake, napa: assumptionsNapa}];
			var assumptionstable = '<section class="assumptions-wrap"><h3>Parameter Values Used in Calculations</h3><table class="assumptionstable">';
			for (var i=0; i<assumptionsHeaders.length; i++) {
				assumptionstable += '<tr><td>' + assumptionsHeaders[i] + '</td><td>' + assumptionsArray[0][$('select[name=region]').val()][i] + '</td></tr>';
			};
			assumptionstable += '</table></section>';

			/***** Collate results
			------------------------------------ */

			var results = '<hr /><h2>Results</h2><p class="landscape-alert" style="font-style: italic;">Tap or click figures to view full-screen. On mobile devices, we recommend viewing your results in landscape mode.</p><p class="print-link"><a href="javascript:window.print()"><i class="fa fa-print" aria-hidden="true"></i> Print these results.</a></p><p class="figure-wrap">';
			if (genstates['figurestate'] == true)
				results += fullfig;
			if (genstates['tablestate'] == true)
				results += table;
			results += assumptionstable + '<p class="print-link"><a href="javascript:window.print()"><i class="fa fa-print" aria-hidden="true"></i> Print these results.</a></p><p class="adjust-link"><a href="#page" onclick="$(\'body,html\').stop(true,true).animate({scrollTop: $(\'#theform\').offset().top - $(\'header\').height()}, \'500\', \'swing\');">Adjust parameters</a></p>';
			$('.results').html(results); // Write results to page

			/***** Style figure output width and jump to top of figs
			------------------------------------ */
			var figsAcross=1;
			if ( $('input[name=efficacyfig]:checked').length > 1 ) {
				figsAcross = $('input[name=efficacyfig]:checked').length;
			} else if ( $('input[name=practicefig]:checked').length > 1 && $('input[name=figuredisplay]').val() == 'netreturns' ) {
				figsAcross = $('input[name=practicefig]:checked').length;
			}
			if ( $( window ).width() / figsAcross < 910 ) {
				$('.results img').each(function() {
					$(this).css('width', 100/figsAcross - 1 + '%');
				})
			};
			$('body,html').stop(true,true).animate({scrollTop: $('#results').offset().top - $('header').height()}, '500', 'swing');
		});

	});
}