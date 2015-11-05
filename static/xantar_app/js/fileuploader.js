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
    }
});

