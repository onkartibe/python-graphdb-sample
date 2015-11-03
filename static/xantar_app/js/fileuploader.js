function progressfun(){
    $('#result').empty();
    var Files = document.getElementById('fil').files[0]
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
            $('#result').append('<div class="progress"><div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:'+progress+'%"></div>'); 
            if(progress == 100){
                $('#result').fadeOut(3000);
                $('#success').append('<div class="alert alert-success"><strong></strong>Successfully Uploaded</div>');
                $('#success').fadeOut(5000);
            }
        }
}
}