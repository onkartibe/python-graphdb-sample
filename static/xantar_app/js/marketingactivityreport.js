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
  $(selectedinput).prop('checked', true);
    request_data = {
          report_type: 'global',
          filetype: $('input[name="filetype"]:checked').val(),
      }
      message = 'GlobalMarketing-Activity Report is successfully generated.Click here download the report.'
      $.ajax({
          url: "/get/marketing/activity/report/",
          type: "POST",
          async: true,
          data: JSON.stringify(request_data),
          contentType: "application/json; charset=utf-8",
          beforeSend: function(xhr, settings, jqxhr) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          },
          success: function(response) {
              if($('input[name="filetype"]:checked').val() === "CSV"){
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                notification_template = '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: CSV</span>' +
                '<a href="{3}" target="{4}" download="globalmarketingactivityreport.csv" data-notify="url"></a>' +
              '</div>' 
                notifyuser(uri,notification_template);
              }
              if($('input[name="filetype"]:checked').val() === "EXCEL"){
                var uri = 'data:application/vnd.ms-excel;charset=UTF-8,' + encodeURIComponent(response);
                notification_template =  '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: EXCEL</span>' +
                '<a href="{3}" target="{4}" download="globalmarketingactivityreport.xlsx" data-notify="url"></a>' +
              '</div>' 
                notifyuser(uri,notification_template);
              }
          },
          error: function(response) {},
      });
}
function get_marketing_activity_report(selectedinput) {
      $(selectedinput).prop('checked', true);
      request_data = {
          filetype: $('input[name="filetype"]:checked').val(),
          country_id: $('#select_country_list option:selected').val(),
          report_type: 'current_country'
      }
      message = 'Marketing-Activity Report is successfully generated.Click here download the report.'
      $.ajax({
          url: "/get/marketing/activity/report/",
          type: "POST",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(request_data),
          beforeSend: function(xhr, settings) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          },
          success: function(response) {
              if($('input[name="filetype"]:checked').val() === "CSV"){
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                var link = "<a id='downloadlink' download='marketingactivityreport.csv' href=" + uri + ">Marketing-Activity Report</a>"
                notification_template = '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: CSV</span>' +
                '<a href="{3}" target="{4}" download="marketingactivityreport.csv" data-notify="url"></a>' +
              '</div>' 
                notifyuser(uri,notification_template,message);
              }
              if($('input[name="filetype"]:checked').val() === "EXCEL"){
                var uri = 'data:application/vnd.ms-excel;charset=UTF-8,' + encodeURIComponent(response);
                notification_template =  '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: EXCEL</span>' +
                '<a href="{3}" target="{4}" download="marketingactivityreport.xlsx" data-notify="url"></a>' +
              '</div>' 
                notifyuser(uri,notification_template,message);
              }
          },
          error: function(response) {},
      // });
  });
}

function get_productmarketing_activity_report(brand_code){
    request_data = {
          report_type: 'product_report',
          brand_code:brand_code,
          advertisor : $('#advertisor_list option:selected').val(),
          filetype: $('input[name="filetype_product"]:checked').val(),

      }
      message = 'GlobalMarketing-Activity Report is successfully generated.Click here download the report.'
      $.ajax({
          url: "/get/marketing/activity/report/",
          type: "POST",
          async: true,
          data: JSON.stringify(request_data),
          contentType: "application/json; charset=utf-8",
          beforeSend: function(xhr, settings, jqxhr) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          },
          success: function(response) {
              if($('input[name="filetype"]:checked').val() === "CSV"){
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                notification_template = '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: CSV</span>' +
                '<a href="{3}" target="{4}" download="globalmarketingactivityreport.csv" data-notify="url"></a>' +
              '</div>' 
                notifyuser(uri,notification_template);
              }
              if($('input[name="filetype"]:checked').val() === "EXCEL"){
                var uri = 'data:application/vnd.ms-excel;charset=UTF-8,' + encodeURIComponent(response);
                notification_template =  '<div data-notify="container" class="col-xs-8 col-sm-5 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<br>&nbsp;<span>File Format: EXCEL</span>' +
                '<a href="{3}" target="{4}" download="globalmarketingactivityreport.xlsx" data-notify="url"></a>' +
              '</div>' 
                notifyuser(uri,notification_template);
              }
          },
          error: function(response) {},
      });
}

function notifyuser (link,notification_template,message) {
    $.notify({
  // options
  icon: 'glyphicon glyphicon-ok',
  title: '',
  message: message,
  url: link,
  target: '_blank'
},{
  // settings
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
  timer: 100000,
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

