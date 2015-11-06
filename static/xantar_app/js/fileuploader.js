var globalfields = ['Country','BRAND_CODE','BRAND_NAME','ADV_CODE','ADV_NAME','DIRECTMAIL FIGURE','DATA MONTH',
'CURRENCY','DATA FACTOR','NEWSPAPER FIGURE','OUTDOOR_FIGURE','MAGAZINES FIGURE','CINEMA FIGURE','TV FIGURE',
'INTERNET_FIGURE','RADIO FIGURE','LEVEL1 CODE','LEVEL2 CODE','LEVEL3 CODE','LEVEL3 NAME'];
var active = 'globallist';
var flag_upload,flag_map =0;
function populatedropdown(){
$.each( globalfields, function( index, value ){
    $('#globallist').append($('<option/>', { 
        value: index,
        text : value 
    }));
});
}

function progressfun(){
    $('#result').empty();
    var Files = document.getElementById('choose_file').files[0]
    console.log(Files)
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
    }
    else{
        $('#step2tag').removeClass('active');
        $('#step2').removeClass('active');
        $('#step2').css("display","none");
        $('#step3tag').addClass('active');
        $('#step3').addClass('active');
        $('#step3').css("display","block");
        loadStatus();
    }
});

function getDropDownList(name, id, optionList) {
    var select_list = $('<select class="selectpicker btn btn-default"></select>').attr("id", name);

    $.each(optionList, function (i, el) {
        select_list.append( new Option(el,i) );
    });
    $('#maptable tbody').append('<tr id="tr'+ name+'"></tr>');
    var row_name = "#tr"+name
    $(row_name).append('<td id="td'+ name+'"></td>');
    var col_name = "#td"+name
    $(col_name).append(select_list);
    flag_map = 1;
}

$('#add_select').click(function(){
    param = "#"+active+" option:selected";
    var selected = $(param).val();
    alert(selected);
    var name = 'globallist'+selected;
    active = name;
    var copy_globalfields = globalfields
    var new_append_list = copy_globalfields.splice(selected,1);
    var select_list = getDropDownList(name,selected,copy_globalfields)
})


function loadStatus() {
    if (flag_upload == 1){
        $('#contentstep3').empty().append('<h2>Your file is being mapped</h2>');
        $('#contentstep3').append('<li><h5>File Uploaded</h5><i class="fa fa-check-circle fa-2x" id="status_icon"></i></li>');
    }
    else{
        $('#contentstep3').append('<h2>Your file is yet to be mapped</h2>');
        $('#contentstep3').append('<ul>');
        $('#contentstep3').append('<li><h5>File Uploading</h5><i class="fa fa-spinner fa-2x" id="status_icon"></i></li>');
    }
    if (flag_map == 1){
        $('#contentstep3').append('<li><h5>Cleaning Data</h5><i class="fa fa-check-circle fa-2x" id="status_icon"></i></li>');
    }
    else{
        $('#contentstep3').append('<li><h5>Cleaning Data</h5><i class="fa fa-spinner fa-2x" id="status_icon"></i></li>');
    }
}