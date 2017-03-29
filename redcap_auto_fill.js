/**
 * This is intended to be included via a scriptlet and helps auto-complete forms in REDCap for testing
 *
 * To use, open your browser's boorkmarks and create one that looks like the below.  You can replace the location of hte script
 * with your own location.  Or, if you push updates to the github repository at:
 *   https://github.com/123andy/redcap-autofill-bookmarklet
 * I will periodically update the location below with the new version
 *
 * javascript: (function () { 
 *	var jsCode = document.createElement('script'); 
 *	jsCode.setAttribute('src', 'https://med.stanford.edu/webtools/redcap/redcap_auto_fill.js');
 *	document.body.appendChild(jsCode); 
 * }());
 * 
 * Andrew Martin / Stanford University
*/


// Autocomplete a single REDCap TR
function getRandomWord() {
	var random_words = ['Rock', 'Paper', 'Scissors'];
	return random_words[Math.floor(Math.random()*random_words.length)];
}

function fillRow(tr) {
	
	var date_types = Array('date_ymd', 'date_mdy', 'datetime_ymd', 'datetime_mdy', 'datetime_seconds_ymd', 'datetime_seconds_mdy');

	// Check a random radio button (skip checked radios)
	var radios = $(tr).find("input[type=radio]").filter(":visible");
	var radios_checked = $(tr).find("input[type=radio]:checked");
	if ((radios.length > 0) && (radios_checked.length == 0)) {
		var randomnumber = Math.floor(Math.random() * radios.length);
		radios[randomnumber].checked = true;
		$(radios[randomnumber]).trigger('click').trigger('blur');
		return;
	}
	
	// Check for enhanced radios
	var enhancedchoice = $(tr).find("div.enhancedchoice").filter(":visible");
	if (enhancedchoice.length > 0 && radios_checked.length == 0) {
		// Get parent input field for these enhanced radios
		var randomnumber = Math.floor(Math.random() * enhancedchoice.length);
		$('label', enhancedchoice[randomnumber]).trigger('click');
		return;		
	}
	
	// Handle text inputs
	var inputs = $(tr).find("input[type=text]").each(function(i,e){
		//console.log('Input: ' + $(e).attr('name'));

        // Skip ones with existing values
        if ($(e).val() !== "") return;

        // Check for field-validation attribute
		var fv = $(e).attr('fv');
		
		if (fv == 'email') {
			$(e).val('test@noreply.com');
		} else if (fv == 'integer') {
			b = $(e).attr('onblur');
			parts = b.replace(/'/g,'').split(',');
			//console.log(parts);
			p1 = parseInt(parts[1]);
			p2 = parseInt(parts[2]);
			//console.log(b + ": " + p1 + " - " + p2);
			//redcap_validate(this,'1','111','soft_typed','integer',1)
			$(e).val('1');
		} else if ((date_types.indexOf(fv) != -1)) {
			if (($(e).parent().find("button[onclick^='set']").length > 0)) {
				$(e).parent().find("button").trigger('click');
			} else {
				switch(fv) {
					case "date_ymd":
						$(e).val('2016-10-25');
						break;
					case "date_mdy":
						$(e).val('10-25-2016');
						break;
					case "date_dmy":
						$(e).val('25-10-2016');
						break;					
				}
			}
		} else if (fv == 'number') {
			$(e).val('2');
		} else if (fv == 'zip' ) {
			$(e).val('55112');
		} else if (fv == 'zipcode' ) {
			$(e).val('55112');
		} else if (fv == 'phone') {
            $(e).val('(555) 867-5309');
        } else if (fv == 'time') {
			$(e).val('12:34');
		} else {
			//console.log("fv: " + fv);
			// Get a random word
			$(e).val(getRandomWord());
		}
		return;
	});
	
	// Select a dropdown value
	var options = $(tr).find('option:not([value=""])');
	if (options.length > 0) {
		var randomnumber = Math.floor(Math.random() * options.length);
		$(options[randomnumber]).prop('selected', true);
		return;
	}
	
	// Set sliders
	var sliders = $(tr).find("div.slider:first").trigger('onmousedown').find('input').val(50);
	
	// Set textarea
	var textarea = $(tr).find('textarea');
	if (textarea && textarea.val() == '') textarea.val(getRandomWord());
	
	// Check checkboxes
	var checkboxes = $(tr).find("input[type=checkbox]").filter(":visible").filter(":not([id='__LOCKRECORD__'])");
	var checkboxes_checked = $('input:checked',tr);
	if (checkboxes.length > 0 && checkboxes_checked.length == 0) {
		var randomnumber = Math.floor(Math.random() * checkboxes.length);
		$(checkboxes[randomnumber]).trigger('click');
		return;
	}
}

// Loop through all rows
var row = $("tr[sq_id]:visible:first");
if (row) {
	do {
		//console.log ("Processing row: " + $(row).attr('id'));
		if ( $(row).is(':visible') ) {
			$('html, body').animate({scrollTop: $(row).offset().top},1);
			fillRow(row);
		} else {
			//console.log ("Row is not visible");
		}
		doBranching();
		row= $(row).next();
	} while (row.length > 0);
}