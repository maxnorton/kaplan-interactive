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

			// Declare table data
			var tableHeaders = ['Region', 'Practice', 'Efficacy', 'Year of adoption', 'ACDNB', 'Last profitable year', 'Age adoption pays off', 'Breakeven probability'];
			var napaDP25y3 = ['Napa', 'Delayed Pruning', '25.0', '3.0', '$46,720', '18', '3.0', '0.0'];
			var napaDP25y5 = ['Napa', 'Delayed Pruning', '25.0', '5.0', '$37,880', '17', '5.0', '0.0'];
			var napaDP25y10 = ['Napa', 'Delayed Pruning', '25.0', '10.0', '$16,159', '16', '10.0', '0.0'];
			var napaDP50y3 = ['Napa', 'Delayed Pruning', '50.0', '3.0', '$114,680', '25', '3.0', '0.0'];
			var napaDP50y5 = ['Napa', 'Delayed Pruning', '50.0', '5.0', '$96,944', '24', '5.0', '0.0'];
			var napaDP50y10 = ['Napa', 'Delayed Pruning', '50.0', '10.0', '$44,205', '19', '10.0', '0.0'];
			var napaDP75y3 = ['Napa', 'Delayed Pruning', '75.0', '3.0', '$155,303', '25', '3.0', '0.0'];
			var napaDP75y5 = ['Napa', 'Delayed Pruning', '75.0', '5.0', '$147,388', '25', '5.0', '0.0'];
			var napaDP75y10 = ['Napa', 'Delayed Pruning', '75.0', '10.0', '$89,863', '25', '10.0', '0.0'];
			var napaDBP25y3 = ['Napa', 'Double Pruning', '25.0', '3.0', '$46,720', '18', '10', '0.159'];
			var napaDBP25y5 = ['Napa', 'Double Pruning', '25.0', '5.0', '$37,880', '17', '9', '0.173'];
			var napaDBP25y10 = ['Napa', 'Double Pruning', '25.0', '10.0', '$16,159', '15', '11', '0.285'];
			var napaDBP50y3 = ['Napa', 'Double Pruning', '50.0', '3.0', '$114,680', '25', '9', '0.065'];
			var napaDBP50y5 = ['Napa', 'Double Pruning', '50.0', '5.0', '$96,944', '24', '8', '0.068'];
			var napaDBP50y10 = ['Napa', 'Double Pruning', '50.0', '10.0', '$44,205', '19', '10', '0.104'];
			var napaDBP75y3 = ['Napa', 'Double Pruning', '75.0', '3.0', '$155,303', '25', '8', '0.048'];
			var napaDBP75y5 = ['Napa', 'Double Pruning', '75.0', '5.0', '$147,388', '25', '8', '0.044'];
			var napaDBP75y10 = ['Napa', 'Double Pruning', '75.0', '10.0', '$89,863', '25', '10', '0.051'];
			var napaHP25y3 = ['Napa', 'Hand painted Topsin', '25.0', '3.0', '$45,614', '18', '6', '0.024'];
			var napaHP25y5 = ['Napa', 'Hand painted Topsin', '25.0', '5.0', '$36,903', '17', '6', '0.026'];
			var napaHP25y10 = ['Napa', 'Hand painted Topsin', '25.0', '10.0', '$15,472', '15', '10', '0.043'];
			var napaHP50y3 = ['Napa', 'Hand painted Topsin', '50.0', '3.0', '$113,574', '25', '5', '0.01'];
			var napaHP50y5 = ['Napa', 'Hand painted Topsin', '50.0', '5.0', '$95,967', '24', '5', '0.01'];
			var napaHP50y10 = ['Napa', 'Hand painted Topsin', '50.0', '10.0', '$43,517', '19', '10', '0.016'];
			var napaHP75y3 = ['Napa', 'Hand painted Topsin', '75.0', '3.0', '$154,197', '25', '4', '0.007'];
			var napaHP75y5 = ['Napa', 'Hand painted Topsin', '75.0', '5.0', '$146,410', '25', '5', '0.007'];
			var napaHP75y10 = ['Napa', 'Hand painted Topsin', '75.0', '10.0', '$89,175', '25', '10', '0.008'];
			var nsjDP25y3 = ['Northern San Joaquin', 'Delayed Pruning', '25.0', '3.0', '$12,993', '15', '3.0', '0.0'];
			var nsjDP25y5 = ['Northern San Joaquin', 'Delayed Pruning', '25.0', '5.0', '$10,534', '15', '5.0', '0.0'];
			var nsjDP25y10 = ['Northern San Joaquin', 'Delayed Pruning', '25.0', '10.0', '$4,494', '13', '10.0', '0.0'];
			var nsjDP50y3 = ['Northern San Joaquin', 'Delayed Pruning', '50.0', '3.0', '$31,892', '22', '3.0', '0.0'];
			var nsjDP50y5 = ['Northern San Joaquin', 'Delayed Pruning', '50.0', '5.0', '$26,960', '20', '5.0', '0.0'];
			var nsjDP50y10 = ['Northern San Joaquin', 'Delayed Pruning', '50.0', '10.0', '$12,293', '15', '10.0', '0.0'];
			var nsjDP75y3 = ['Northern San Joaquin', 'Delayed Pruning', '75.0', '3.0', '$43,189', '25', '3.0', '0.0'];
			var nsjDP75y5 = ['Northern San Joaquin', 'Delayed Pruning', '75.0', '5.0', '$40,988', '25', '5.0', '0.0'];
			var nsjDP75y10 = ['Northern San Joaquin', 'Delayed Pruning', '75.0', '10.0', '$24,990', '22', '10.0', '0.0'];
			var nsjDBP25y3 = ['Northern San Joaquin', 'Double Pruning', '25.0', '3.0', '$8,761', '15', '11', '0.326'];
			var nsjDBP25y5 = ['Northern San Joaquin', 'Double Pruning', '25.0', '5.0', '$6,795', '14', '11', '0.355'];
			var nsjDBP25y10 = ['Northern San Joaquin', 'Double Pruning', '25.0', '10.0', '$1,866', '13', '12', '0.585'];
			var nsjDBP50y3 = ['Northern San Joaquin', 'Double Pruning', '50.0', '3.0', '$27,660', '22', '10', '0.133'];
			var nsjDBP50y5 = ['Northern San Joaquin', 'Double Pruning', '50.0', '5.0', '$23,221', '20', '10', '0.139'];
			var nsjDBP50y10 = ['Northern San Joaquin', 'Double Pruning', '50.0', '10.0', '$9,665', '15', '11', '0.214'];
			var nsjDBP75y3 = ['Northern San Joaquin', 'Double Pruning', '75.0', '3.0', '$38,957', '25', '10', '0.098'];
			var nsjDBP75y5 = ['Northern San Joaquin', 'Double Pruning', '75.0', '5.0', '$37,249', '25', '10', '0.091'];
			var nsjDBP75y10 = ['Northern San Joaquin', 'Double Pruning', '75.0', '10.0', '$22,362', '21', '10', '0.105'];
			var nsjHP25y3 = ['Northern San Joaquin', 'Hand painted Topsin', '25.0', '3.0', '$11,621', '15', '9', '0.106'];
			var nsjHP25y5 = ['Northern San Joaquin', 'Hand painted Topsin', '25.0', '5.0', '$9,322', '15', '9', '0.115'];
			var nsjHP25y10 = ['Northern San Joaquin', 'Hand painted Topsin', '25.0', '10.0', '$3,642', '13', '10', '0.19'];
			var nsjHP50y3 = ['Northern San Joaquin', 'Hand painted Topsin', '50.0', '3.0', '$30,520', '22', '8', '0.043'];
			var nsjHP50y5 = ['Northern San Joaquin', 'Hand painted Topsin', '50.0', '5.0', '$25,747', '20', '8', '0.045'];
			var nsjHP50y10 = ['Northern San Joaquin', 'Hand painted Topsin', '50.0', '10.0', '$11,441', '15', '10', '0.069'];
			var nsjHP75y3 = ['Northern San Joaquin', 'Hand painted Topsin', '75.0', '3.0', '$41,817', '25', '7', '0.032'];
			var nsjHP75y5 = ['Northern San Joaquin', 'Hand painted Topsin', '75.0', '5.0', '$39,776', '25', '7', '0.03'];
			var nsjHP75y10 = ['Northern San Joaquin', 'Hand painted Topsin', '75.0', '10.0', '$24,138', '22', '10', '0.034'];
			var ccDP25y3 = ['Central Coast', 'Delayed Pruning', '25.0', '3.0', '$18,929', '16', '3.0', '0.0'];
			var ccDP25y5 = ['Central Coast', 'Delayed Pruning', '25.0', '5.0', '$15,349', '15', '5.0', '0.0'];
			var ccDP25y10 = ['Central Coast', 'Delayed Pruning', '25.0', '10.0', '$6,548', '14', '10.0', '0.0'];
			var ccDP50y3 = ['Central Coast', 'Delayed Pruning', '50.0', '3.0', '$46,464', '23', '3.0', '0.0'];
			var ccDP50y5 = ['Central Coast', 'Delayed Pruning', '50.0', '5.0', '$39,281', '21', '5.0', '0.0'];
			var ccDP50y10 = ['Central Coast', 'Delayed Pruning', '50.0', '10.0', '$17,912', '16', '10.0', '0.0'];
			var ccDP75y3 = ['Central Coast', 'Delayed Pruning', '75.0', '3.0', '$62,923', '25', '3.0', '0.0'];
			var ccDP75y5 = ['Central Coast', 'Delayed Pruning', '75.0', '5.0', '$59,721', '25', '5.0', '0.0'];
			var ccDP75y10 = ['Central Coast', 'Delayed Pruning', '75.0', '10.0', '$36,412', '24', '10.0', '0.0'];
			var ccDBP25y3 = ['Central Coast', 'Double Pruning', '25.0', '3.0', '$13,143', '16', '11', '0.306'];
			var ccDBP25y5 = ['Central Coast', 'Double Pruning', '25.0', '5.0', '$10,236', '15', '11', '0.333'];
			var ccDBP25y10 = ['Central Coast', 'Double Pruning', '25.0', '10.0', '$2,954', '13', '12', '0.549'];
			var ccDBP50y3 = ['Central Coast', 'Double Pruning', '50.0', '3.0', '$40,679', '23', '10', '0.125'];
			var ccDBP50y5 = ['Central Coast', 'Double Pruning', '50.0', '5.0', '$34,169', '21', '10', '0.13'];
			var ccDBP50y10 = ['Central Coast', 'Double Pruning', '50.0', '10.0', '$14,318', '16', '11', '0.201'];
			var ccDBP75y3 = ['Central Coast', 'Double Pruning', '75.0', '3.0', '$57,137', '25', '10', '0.092'];
			var ccDBP75y5 = ['Central Coast', 'Double Pruning', '75.0', '5.0', '$54,608', '25', '9', '0.086'];
			var ccDBP75y10 = ['Central Coast', 'Double Pruning', '75.0', '10.0', '$32,818', '23', '10', '0.099'];
			var ccHP25y3 = ['Central Coast', 'Hand painted Topsin', '25.0', '3.0', '$16,401', '16', '9', '0.134'];
			var ccHP25y5 = ['Central Coast', 'Hand painted Topsin', '25.0', '5.0', '$13,116', '15', '9', '0.146'];
			var ccHP25y10 = ['Central Coast', 'Hand painted Topsin', '25.0', '10.0', '$4,978', '13', '10', '0.24'];
			var ccHP50y3 = ['Central Coast', 'Hand painted Topsin', '50.0', '3.0', '$43,937', '23', '8', '0.054'];
			var ccHP50y5 = ['Central Coast', 'Hand painted Topsin', '50.0', '5.0', '$37,048', '21', '8', '0.057'];
			var ccHP50y10 = ['Central Coast', 'Hand painted Topsin', '50.0', '10.0', '$16,342', '16', '10', '0.088'];
			var ccHP75y3 = ['Central Coast', 'Hand painted Topsin', '75.0', '3.0', '$60,396', '25', '8', '0.04'];
			var ccHP75y5 = ['Central Coast', 'Hand painted Topsin', '75.0', '5.0', '$57,487', '25', '8', '0.037'];
			var ccHP75y10 = ['Central Coast', 'Hand painted Topsin', '75.0', '10.0', '$34,842', '23', '10', '0.043'];
			var lakeDP25y3 = ['Lake', 'Delayed Pruning', '25.0', '3.0', '$12,993', '17', '3.0', '0.0'];
			var lakeDP25y5 = ['Lake', 'Delayed Pruning', '25.0', '5.0', '$10,534', '16', '5.0', '0.0'];
			var lakeDP25y10 = ['Lake', 'Delayed Pruning', '25.0', '10.0', '$4,494', '14', '10.0', '0.0'];
			var lakeDP50y3 = ['Lake', 'Delayed Pruning', '50.0', '3.0', '$31,892', '24', '3.0', '0.0'];
			var lakeDP50y5 = ['Lake', 'Delayed Pruning', '50.0', '5.0', '$26,960', '22', '5.0', '0.0'];
			var lakeDP50y10 = ['Lake', 'Delayed Pruning', '50.0', '10.0', '$12,293', '17', '10.0', '0.0'];
			var lakeDP75y3 = ['Lake', 'Delayed Pruning', '75.0', '3.0', '$43,189', '25', '3.0', '0.0'];
			var lakeDP75y5 = ['Lake', 'Delayed Pruning', '75.0', '5.0', '$40,988', '25', '5.0', '0.0'];
			var lakeDP75y10 = ['Lake', 'Delayed Pruning', '75.0', '10.0', '$24,990', '25', '10.0', '0.0'];
			var lakeDBP25y3 = ['Lake', 'Double Pruning', '25.0', '3.0', '$8,761', '16', '10', '0.234'];
			var lakeDBP25y5 = ['Lake', 'Double Pruning', '25.0', '5.0', '$6,795', '16', '10', '0.255'];
			var lakeDBP25y10 = ['Lake', 'Double Pruning', '25.0', '10.0', '$1,866', '14', '11', '0.421'];
			var lakeDBP50y3 = ['Lake', 'Double Pruning', '50.0', '3.0', '$27,660', '24', '10', '0.095'];
			var lakeDBP50y5 = ['Lake', 'Double Pruning', '50.0', '5.0', '$23,221', '22', '9', '0.1'];
			var lakeDBP50y10 = ['Lake', 'Double Pruning', '50.0', '10.0', '$9,665', '17', '10', '0.154'];
			var lakeDBP75y3 = ['Lake', 'Double Pruning', '75.0', '3.0', '$38,957', '25', '9', '0.071'];
			var lakeDBP75y5 = ['Lake', 'Double Pruning', '75.0', '5.0', '$37,249', '25', '9', '0.066'];
			var lakeDBP75y10 = ['Lake', 'Double Pruning', '75.0', '10.0', '$22,362', '25', '10', '0.076'];
			var lakeHP25y3 = ['Lake', 'Hand painted Topsin', '25.0', '3.0', '$11,621', '17', '7', '0.047'];
			var lakeHP25y5 = ['Lake', 'Hand painted Topsin', '25.0', '5.0', '$9,322', '16', '7', '0.051'];
			var lakeHP25y10 = ['Lake', 'Hand painted Topsin', '25.0', '10.0', '$3,642', '14', '10', '0.084'];
			var lakeHP50y3 = ['Lake', 'Hand painted Topsin', '50.0', '3.0', '$30,520', '24', '6', '0.019'];
			var lakeHP50y5 = ['Lake', 'Hand painted Topsin', '50.0', '5.0', '$25,747', '22', '6', '0.02'];
			var lakeHP50y10 = ['Lake', 'Hand painted Topsin', '50.0', '10.0', '$11,441', '17', '10', '0.031'];
			var lakeHP75y3 = ['Lake', 'Hand painted Topsin', '75.0', '3.0', '$41,817', '25', '6', '0.014'];
			var lakeHP75y5 = ['Lake', 'Hand painted Topsin', '75.0', '5.0', '$39,776', '25', '6', '0.013'];
			var lakeHP75y10 = ['Lake', 'Hand painted Topsin', '75.0', '10.0', '$24,138', '25', '10', '0.015'];
			var sonomaDP25y3 = ['Sonoma', 'Delayed Pruning', '25.0', '3.0', '$23,539', '16', '3.0', '0.0'];
			var sonomaDP25y5 = ['Sonoma', 'Delayed Pruning', '25.0', '5.0', '$19,087', '15', '5.0', '0.0'];
			var sonomaDP25y10 = ['Sonoma', 'Delayed Pruning', '25.0', '10.0', '$8,142', '13', '10.0', '0.0'];
			var sonomaDP50y3 = ['Sonoma', 'Delayed Pruning', '50.0', '3.0', '$57,781', '22', '3.0', '0.0'];
			var sonomaDP50y5 = ['Sonoma', 'Delayed Pruning', '50.0', '5.0', '$48,848', '21', '5.0', '0.0'];
			var sonomaDP50y10 = ['Sonoma', 'Delayed Pruning', '50.0', '10.0', '$22,274', '16', '10.0', '0.0'];
			var sonomaDP75y3 = ['Sonoma', 'Delayed Pruning', '75.0', '3.0', '$78,248', '25', '3.0', '0.0'];
			var sonomaDP75y5 = ['Sonoma', 'Delayed Pruning', '75.0', '5.0', '$74,265', '25', '5.0', '0.0'];
			var sonomaDP75y10 = ['Sonoma', 'Delayed Pruning', '75.0', '10.0', '$45,280', '23', '10.0', '0.0'];
			var sonomaDBP25y3 = ['Sonoma', 'Double Pruning', '25.0', '3.0', '$18,347', '15', '10', '0.221'];
			var sonomaDBP25y5 = ['Sonoma', 'Double Pruning', '25.0', '5.0', '$14,499', '15', '10', '0.24'];
			var sonomaDBP25y10 = ['Sonoma', 'Double Pruning', '25.0', '10.0', '$4,917', '13', '11', '0.396'];
			var sonomaDBP50y3 = ['Sonoma', 'Double Pruning', '50.0', '3.0', '$52,588', '22', '9', '0.09'];
			var sonomaDBP50y5 = ['Sonoma', 'Double Pruning', '50.0', '5.0', '$44,260', '20', '9', '0.094'];
			var sonomaDBP50y10 = ['Sonoma', 'Double Pruning', '50.0', '10.0', '$19,049', '15', '10', '0.145'];
			var sonomaDBP75y3 = ['Sonoma', 'Double Pruning', '75.0', '3.0', '$73,056', '25', '9', '0.066'];
			var sonomaDBP75y5 = ['Sonoma', 'Double Pruning', '75.0', '5.0', '$69,677', '25', '9', '0.062'];
			var sonomaDBP75y10 = ['Sonoma', 'Double Pruning', '75.0', '10.0', '$42,055', '22', '10', '0.071'];
			var sonomaHP25y3 = ['Sonoma', 'Hand painted Topsin', '25.0', '3.0', '$22,388', '15', '7', '0.049'];
			var sonomaHP25y5 = ['Sonoma', 'Hand painted Topsin', '25.0', '5.0', '$18,070', '15', '7', '0.053'];
			var sonomaHP25y10 = ['Sonoma', 'Hand painted Topsin', '25.0', '10.0', '$7,427', '13', '10', '0.088'];
			var sonomaHP50y3 = ['Sonoma', 'Hand painted Topsin', '50.0', '3.0', '$56,630', '22', '6', '0.02'];
			var sonomaHP50y5 = ['Sonoma', 'Hand painted Topsin', '50.0', '5.0', '$47,831', '20', '6', '0.021'];
			var sonomaHP50y10 = ['Sonoma', 'Hand painted Topsin', '50.0', '10.0', '$21,559', '15', '10', '0.032'];
			var sonomaHP75y3 = ['Sonoma', 'Hand painted Topsin', '75.0', '3.0', '$77,097', '25', '6', '0.015'];
			var sonomaHP75y5 = ['Sonoma', 'Hand painted Topsin', '75.0', '5.0', '$73,248', '25', '6', '0.014'];
			var sonomaHP75y10 = ['Sonoma', 'Hand painted Topsin', '75.0', '10.0', '$44,565', '22', '10', '0.016'];
																										
			var ccDP25 = [ccDP25y3, ccDP25y5, ccDP25y10];									
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
			// /table data declaration

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

			$('input[name=practicetable]:checked').each(function() {
				var thisPractice = $(this).val().toUpperCase();
				$('input[name=efficacytable]:checked').each(function() {
					var thisEfficacy = $(this).val();
					$('input[name=adoptiontable]:checked').each(function() {
						var thisYear = 'y' + $(this).val();
						var theFormDrivenOutputVarName = $('select[name=region]').val() + thisPractice + thisEfficacy + thisYear;
						theFormDrivenOutputVarsArray[a] = eval(theFormDrivenOutputVarName);
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
}