STR_FIELDS = ['COUNTRY', 'BRAND_NAME', 'ADV_NAME', 'CURRENCY', 'LEVEL1 CODE','LEVEL2 CODE','LEVEL3 CODE', 'LEVEL3 NAME','BRAND_CODE','ADV_CODE']

NON_STR_FIELDS = ['DIRECTMAIL FIGURE','DATA MONTH',
'DATA FACTOR','NEWSPAPER FIGURE','OUTDOOR_FIGURE','MAGAZINES FIGURE','CINEMA FIGURE','TV FIGURE',
'INTERNET_FIGURE','RADIO FIGURE'];

MANDITORY_FIELDS = ['COUNTRY', 'BRAND_NAME', 'ADV_NAME', 'CURRENCY','BRAND_CODE']

GLOBAL_FIELDS = $.merge( $.merge([],STR_FIELDS), NON_STR_FIELDS );
OPTIONAL_FIELDS = $(GLOBAL_FIELDS).not(MANDITORY_FIELDS).get();
list_temp = ['#locallistCountry','#locallistBrandCode','#locallistBrandName','#locallistAdvName','#locallistCurrency']
locallistopt = GLOBAL_FIELDS.slice(0);
copy_GLOBAL_FIELDS = OPTIONAL_FIELDS.slice(0);
active = 'globallist';
flag_upload=0;
flag_map=0;
flag_map_div =0;
flag_multiple =0;


function populatedropdown(){
    $('#globallistCountry').append('<option value='+0+'>'+'COUNTRY'+'</option>');
    $.each(locallistopt, function (i1, el1) {
        $('#locallistCountry').append('<option value='+i1+'>'+el1+'</option>');
    });

    $('#globallistBrandCode').append('<option value='+0+'>'+'BRAND_CODE'+'</option>');
    $.each(locallistopt, function (i1, el1) {
        $('#locallistBrandCode').append('<option value='+i1+'>'+el1+'</option>');
    });

    $('#globallistBrandName').append('<option value='+0+'>'+'BRAND_NAME'+'</option>');
    $.each(locallistopt, function (i1, el1) {
        $('#locallistBrandName').append('<option value='+i1+'>'+el1+'</option>');
    });

    $('#globallistAdvName').append('<option value='+0+'>'+'ADV_NAME'+'</option>');
    $.each(locallistopt, function (i1, el1) {
        $('#locallistAdvName').append('<option value='+i1+'>'+el1+'</option>');
    });

    $('#globallistCurrency').append('<option value='+0+'>'+'CURRENCY'+'</option>');
    $.each(locallistopt, function (i1, el1) {
        $('#locallistCurrency').append('<option value='+i1+'>'+el1+'</option>');
    });
    $.each(list_temp, function (i, el) {
       $(el).multiselect({
        includeSelectAllOption: true
    });
    });
    list_temp.splice(0,list_temp.length)
}

function progressfun(){
	$('#result').empty();
	var Files = document.getElementById('choose_file').files[0]
	loaded = 0;
	var fileReader = new FileReader();
	fileReader.readAsBinaryString(Files);
	fileReader.onload = function() {
		loaded++;
	}

	fileReader.onprogress = function(data) {
		if (data.lengthComputable) {
			$('#result').empty();
			var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
			console.log(progress);
			$('#result').append('<div class="well"><div class="progress"><div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:'+progress+'%"></div></div>');
			if(progress == 100){
				$('#success').css("display", "block");
				$('#finish').prop("disabled", false);
				$('#prev').prop("disabled", true);
				populatedropdown();
				flag_upload = 1;
			}
		}
}
}

function getFileData(myFile){
	   var file = myFile.files[0];  
		   document.getElementById('choose_file_val').innerHTML = file.name;
}

$("#choose_file").click(function() {
	$('#success').css("display", "none");
});

$("#finish").click(function(){
	if($('#step1').hasClass('active'))
	{
		$('#step1tag').removeClass('active');
		$('#step1').removeClass('active');
		$('#step1').css("display","none");
		$('#step2tag').addClass('active');
		$('#step2').addClass('active');
		$('#step2').css("display","block");
        $('#finish').prop("disabled", true);
	}
	else{
		$('#step2tag').removeClass('active');
		$('#step2').removeClass('active');
		$('#step2').css("display","none");
		$('#step3tag').addClass('active');
		$('#step3').addClass('active');
		$('#step3').css("display","block");
        $('#contentstep3').css("display","block");

		loadStatus();
	}
});

function getDropDownList(name, id, optionList) {
	var select_list = $('<select class="btn btn-default" onchange="updateselectonchange(this)"></select> ').attr("id", name);
    if ($.inArray(optionList[0], STR_FIELDS)< 0){
       var option_select_list = $('<select class="btn btn-default scroll" size="10" multiple="multiple" ></select>').attr("id", "op"+name);
       flag_multiple = 1;
    }
    else{
       var option_select_list = $('<select class="btn btn-default scroll" size="10"></select>').attr("id", "op"+name);
    }


	$.each(optionList, function (i, el) {
		select_list.append('<option value='+i+'>'+el+'</option>');
        flag_multiple = 1;
	});
	$.each(locallistopt, function (i, el) {
		option_select_list.append('<option value='+i+'>'+el+'</option>');
	});
	len = $('#firsttablecol tbody tr').length;
	if (len === 10  && flag_map_div === 0){
		clone_table = $('#maptable').clone();
		$('#secondtablecol').append(clone_table);
		flag_map_div = 1;
		$('div#secondtablecol #maptable tbody').empty();
	}
	if(flag_map_div === 0){
		$('div#firsttablecol #maptable tbody').append('<tr id="tr'+ name+'"></tr>');
	}
	else{
		$('div#secondtablecol #maptable tbody').append('<tr id="tr'+ name+'"></tr>');
	}
	var row_name = "#tr"+name
	$(row_name).append('<td id="td'+ name+'"></td>');
	$(row_name).append('<td id="tdoption'+ name+'"></td>');
	var col_name = "#td"+name;
	var col_option = "#tdoption"+name;
	$(col_name).append(select_list);
	$(col_option).append(option_select_list);
    if (flag_multiple === 1){
        $('#op'+name).multiselect({
          includeSelectAllOption: true,
        });
    }
	$("#add_icon").detach().appendTo(col_option);
}

$('#add_select').click(function(){
	param = "#"+active+" option:selected";
	var selected = $(param).val();
	$("#"+active).attr('disabled', 'disabled');
	var name = 'globallist'+  + Date.now();
	active = name;
    if(selected >= 0){
	   var new_append_list = copy_GLOBAL_FIELDS.splice(selected,1);
    }
	if (copy_GLOBAL_FIELDS.length > 0){
		getDropDownList(name,selected,copy_GLOBAL_FIELDS);
	}
	else
	{
		flag_map = 1;
		$("#add_icon").detach();
		$("#mapping_success").append('<i class="fa fa-check-circle fa-2x" id="mapping_success_icon">');
	}
});

function get_manditory_field_status(){
    if ($('#locallistCountry').val() != null  && $('#locallistBrandCode').val() != null && $('#locallistBrandName').val() != null && $('#locallistAdvName').val() != null && $('#locallistCurrency').val()!= null)
    {
        $('#finish').prop("disabled", false);
    }
    else
    {
        $('#finish').prop("disabled", true);
    }
}


function loadStatus() {
	if (flag_upload == 1){
		$('#contentstep3').empty().append('<h2>Your file is being mapped</h2>');
		$('#contentstep3').append('<h5 class="status_title">File Uploaded</h5><i class="fa fa-check-circle fa-2x" id="status_icon"></i>');
	}
	else{
		$('#contentstep3').append('<h2>Your file is yet to be mapped</h2>');
		$('#contentstep3').append('<h5 class="status_title">File Uploading</h5><i class="fa fa-spinner fa-2x" id="status_icon"></i>');
	}
	if (flag_map == 1){
		$('#contentstep3').append('<h5 class="status_title">Cleaning Data</h5><i class="fa fa-check-circle fa-2x" id="status_icon"></i>');
	}
	else{
		$('#contentstep3').append('<h5 class="status_title">Cleaning Data</h5><i class="fa fa-spinner fa-2x" id="status_icon"></i>');
	}
}

function updateselectonchange(select){
    var id= select.id;
    $("#op"+id).multiselect('destroy');
    active = "globallist"+id;
    var get_selected = "#"+id+" option:selected";
    var new_append_list = copy_GLOBAL_FIELDS.splice($(get_selected).val(),1);
    if ($.inArray($(get_selected).text(), STR_FIELDS)< 0){
        $("#op"+id).attr('multiple','multiple');
        flag_multiple = 1;
    }
    else{
        $("#op"+id).removeAttr('multiple');
    }
    $.each(locallistopt, function (i, el) {
         $("#op"+id).append('<option value='+i+'>'+el+'</option>');
    });
    if (flag_multiple === 1){
        $('#op'+id).multiselect({
          includeSelectAllOption: true,
        });
    }
}
