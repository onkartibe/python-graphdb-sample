var report_count = 0;
$(document).ready(function() {
    $("#marketingactivityreportbtn").popover({
        trigger: "toggle",
        placement: "top"
    });
    $("#globalreportbtn").popover({
        trigger: "toggle",
        placement: "top"
    });
    $("#product_report").popover({
        trigger: "toggle",
        placement: "right"
    });
});
$('#marketingactivityreportbtn').popover();
$('#globalreportbtn').popover();
$('#product_report').popover();

$('[data-toggle="popover"]').click(function () {
        setTimeout(function () {
            $('.popover').fadeOut('slow');
        }, 3000);

    });

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');
function get_globalmarketing_activity_report(selectedinput){
  $('#globalreportbtn').append('&nbsp;<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate" id="globalloadericon"></span>');
  $(selectedinput).prop('checked', true);
    request_data = {
          report_type: 'global',
          file_type: $('input[name="filetype"]:checked').val(),
      }
      $('#globalreportbtn').prop("disabled", true);
      $.ajax({
          url: "/get/marketing/activity/report/",
          type: "POST",
          async: true,
          data: JSON.stringify(request_data),
          contentType: "application/json; charset=utf-8",
          beforeSend: function(xhr, settings, jqxhr) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          },
          success: function(response,xhr) {
              $('#globalreportbtn').prop("disabled", false);
              if($('input[name="filetype"]:checked').val() === "CSV"){
                $('#globalloadericon').remove();
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                message = 'GlobalMarketing-Activity Report is successfully generated.<a href="'+uri+'"download="globalmarketingactivityreport.csv">Click here</a> download the report.'
                notification_template = '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: CSV</span>' +
                '<a href="{3}" target="{4}" download="globalmarketingactivityreport.csv" data-notify="url"></a>' +
              '</div>';
                notifyuser(uri,notification_template,message);
              }
              if($('input[name="filetype"]:checked').val() === "EXCEL"){
                $('#globalloadericon').remove();
                var uri = 'data:application/vnd.ms-excel;charset=UTF-8,' + encodeURIComponent(response);
                message = 'GlobalMarketing-Activity Report is successfully generated.<a href="'+uri+'"download="globalmarketingactivityreport.xlsx">Click here</a> download the report.'
                notification_template =  '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: EXCEL</span>' +
                '<a href="{3}" target="{4}" download="globalmarketingactivityreport.xlsx" data-notify="url"></a>' +
              '</div>';
                notifyuser(uri,notification_template,message);
              }
              if($('input[name="filetype"]:checked').val() === "PDF"){
                $('#globalloadericon').remove();
                var uri = 'data:application/pdf;charset=UTF-8,' + encodeURIComponent(response);
                message = 'GlobalMarketing-Activity Report is successfully generated.<a href='+uri+'download="globalmarketingactivityreport.pdf">Click here</a> open the report.';
                notification_template ='<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: PDF</span>' +
                '<a href="{3}" target="{4}" download="globalmarketingactivityreport.pdf" data-notify="url"></a>' +
              '</div>';
                notifyuser(uri,notification_template,message);
              }
          },
          error: function(response,xhr) {
            $('#globalloadericon').remove();
            $('#globalreportbtn').prop("disabled", false);
            message = "Error in GlobalMarketing-Activity Report generation.Try Again !!!"
            notification_template = '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-danger" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
              '</div>';
            notifyuser(uri='',notification_template,message);
          },
      });
}
function get_marketing_activity_report(selectedinput) {
      $('#marketingactivityreportbtn').append('&nbsp;<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate" id="loadericon"></span>');
      $(selectedinput).prop('checked', true);
      request_data = {
          file_type: $('input[name="filetype"]:checked').val(),
          country_id: $('#select_country_list option:selected').val(),
          report_type: 'current_country'
      }
      $('#marketingactivityreportbtn').prop("disabled", true);
      $.ajax({
          url: "/get/marketing/activity/report/",
          type: "POST",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(request_data),
          beforeSend: function(xhr, settings) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          },
          success: function(response,xhr) {
              $('#marketingactivityreportbtn').prop("disabled", false);
              if($('input[name="filetype"]:checked').val() === "CSV"){
                $('#loadericon').remove();
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                message = 'Marketing-Activity Report is successfully generated.<a href='+uri+' download="marketingactivityreport.csv">Click here</a> download the report.'
                notification_template = '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: CSV</span>' +
                '<a href="{3}" target="{4}" download="marketingactivityreport.csv" data-notify="url"></a>' +
              '</div>';
                notifyuser(uri,notification_template,message);
              }
              if($('input[name="filetype"]:checked').val() === "EXCEL"){
                $('#loadericon').remove();
                var uri = 'data:application/vnd.ms-excel;charset=UTF-8,' + encodeURIComponent(response);
                message = 'Marketing-Activity Report is successfully generated.<a href='+uri+' download="marketingactivityreport.xlsx">Click here</a> download the report.'
                notification_template =  '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: EXCEL</span>' +
                '<a href="{3}" target="{4}" download="marketingactivityreport.xlsx" data-notify="url"></a>' +
              '</div>';
                notifyuser(uri,notification_template,message);
              }
              if($('input[name="filetype"]:checked').val() === "PDF"){
                $('#loadericon').remove();
                var uri = 'data:application/pdf;charset=UTF-8,' + encodeURIComponent(response);
                message = 'Marketing-Activity Report is successfully generated.<a href='+uri+' download="marketingactivityreport.pdf">Click here</a> open the report.';
                notification_template ='<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: PDF</span>' +
                '<a href="{3}" target="{4}" download="marketingactivityreport.pdf" data-notify="url"></a>' +
              '</div>';
                notifyuser(uri,notification_template,message);
              }
          },
          error: function(response,xhr) {
              $('#loadericon').remove();
              $('#marketingactivityreportbtn').prop("disabled", false);
              message = "Error in Marketing-Activity Report generation.Try Again !!!"
              notification_template = '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-danger" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
              '</div>';
              notifyuser(uri='',notification_template,message);
          },
  });
}

function get_productmarketing_activity_report(brand_code){
    $('#product_report').prop("disabled", true);
    if(!document.getElementById('current_report_status')){
      report_count = 1;
      $('#report_progress').append('<p id="current_report_status">('+report_count+')Product-Marketing-Activity Report :In Progress &nbsp;<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate" id="productloadericon"></span></p>')
    }
    else{
      report_count +=1;
      $('#report_progress').empty();
      $('#report_progress').append('<p id="current_report_status">('+report_count+')Product-Marketing-Activity Report :In Progress &nbsp;<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate" id="ploadericon"></span></p>')
    }
    request_data = {
          report_type: 'product_report',
          brand_code:brand_code,
          advertisor : $('#advertisor_list option:selected').val(),
          file_type: $('input[name="filetype_product"]:checked').val(),
      }
      $.ajax({
          url: "/get/marketing/activity/report/",
          type: "POST",
          data: JSON.stringify(request_data),
          contentType: "application/json; charset=utf-8",
          beforeSend: function(xhr, settings, jqxhr) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          },
          success: function(response,xhr) {
              if(report_count > 0)
              {
                report_count -=1;
                $('#report_progress').empty();
                $('#report_progress').append('<p id="current_report_status">('+report_count+')Product-Marketing-Activity Report :In Progress &nbsp;<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate" id="ploadericon"></span></p>')
              }
              if(report_count == 0){
                report_count = 0;
                $('#report_progress').empty();
                $('#product_report').prop("disabled", false);
              }
              if($('input[name="filetype_product"]:checked').val() === "CSV" || $('input[name="filetype_product"]:checked').val() === undefined){
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                message = 'Product-Marketing-Activity Report is successfully generated.<a href='+uri+' download="product_marketingactivityreport.csv">Click here</a> download the report.'
                notification_template = '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: CSV</span>' +
                '<a href="{3}" target="{4}" download="product_marketingactivityreport.csv" data-notify="url"></a>' +
              '</div>';
                notifyuser(uri,notification_template,message);
              }
              if($('input[name="filetype_product"]:checked').val() === "EXCEL"){
                var uri = 'data:application/vnd.ms-excel;charset=UTF-8,' + encodeURIComponent(response);
                message = 'Product-Marketing-Activity Report is successfully generated.<a href='+uri+' download="product_marketingactivityreport.xlsx">Click here</a> download the report.'
                notification_template =  '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: EXCEL</span>' +
                '<a href="{3}" target="{4}" download="product_marketingactivityreport.xlsx" data-notify="url"></a>' +
              '</div>';
                notifyuser(uri,notification_template,message);
            }
            if($('input[name="filetype"]:checked').val() === "PDF"){
                var uri = 'data:application/pdf;charset=UTF-8,' + encodeURIComponent(response);
                message = 'Marketing-Activity Report is successfully generated.<a href='+uri+'download="product_marketingactivityreport.pdf">Click here</a> open the report.';
                notification_template ='<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: PDF</span>' +
                '<a href="{3}" target="{4}" download="product_marketingactivityreport.pdf" data-notify="url"></a>' +
              '</div>';
                notifyuser(uri,notification_template,message);
              }
          },
          error: function(response,xhr) {
              if(report_count > 0)
              {
                report_count -=1;
                $('#report_progress').empty();
                $('#report_progress').append('<p id="current_report_status">('+report_count+')Product-Marketing-Activity Report :In Progress &nbsp;<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate" id="ploadericon"></span></p>')
              }
              if(report_count == 0)
              {
                report_count = 0;
                $('#report_progress').empty();
              }
              $('#product_report').prop("disabled", false);
              $('#productloadericon').remove();
               message = "Error in Product-Marketing-Activity Report generation.Try Again !!!"
               notification_template = '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-danger" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
              '</div>';
               notifyuser(uri='',notification_template,message);
          },
      });
}

function notifyuser (link,notification_template,message) {
    $.notify({
  icon: 'glyphicon glyphicon-ok',
  title: '',
  message: message,
  target: '_blank'
},{
  element: 'body',
  position: null,
  type: "success",
  allow_dismiss: true,
  newest_on_top: false,
  showProgressbar: false,
  placement: {
    from: "top",
    align: "right"
  },
  offset: 20,
  spacing: 10,
  opacity: .7,
  delay: 5000,
  timer: 10000,
  url_target: '_blank',
  mouse_over: null,
  animate: {
    enter: 'animated fadeInDown',
    exit: 'animated fadeOutUp'
  },
  onShow: null,
  onShown: null,
  onClose: null,
  onClosed: null,
  icon_type: 'class',
  template: notification_template
});
}
