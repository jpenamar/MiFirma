﻿jQuery.ajaxSetup({
  'beforeSend': function(xhr) { xhr.setRequestHeader("Accept", "text/javascript") }
});

$(document).ready(function() {
  $('a[rel*=facebox]').facebox({
    loadingImage : '/images/loading.gif',
    closeImage   : '/images/closelabel.png'
  }); 

  $("#ilp_signature_province_id,#attestor_signature_province_id").selectbox({
    onChange: function () {
      var id_value_string = $(this).val();
      if (id_value_string == "") {
        // if the id is empty remove all the sub_selection options from being selectable and do not do any ajax
        $("select#ilp_signature_municipality_id option,select#attestor_signature_municipality_id option").remove();
        var row = "<option value=\"" + "" + "\">" + "" + "</option>";
        $(row).appendTo("select#ilp_signature_municipality_id,select#attestor_signature_municipality_id");
      }
      else {
        // Send the request and update sub category dropdown
        $.ajax({
          dataType: 'json',
          cache: false,
		  type: "POST", 
		  headers: { 
			Accept : "application/json",
		  },
		  contentType: "application/json; charset=utf-8", 
          url: '/province/municipalities_for_provinceid/' + id_value_string,
          timeout: 2000,
          error: function(XMLHttpRequest, errorTextStatus, error){
            alert("Failed to submit : "+ errorTextStatus+" ;"+error);
          },
          success: function(data){
            // Disable selectbox functionality in order to be able to enable it again with new values
            $("#ilp_signature_municipality_id,#attestor_signature_municipality_id").selectbox("detach");
            // Clear all options from sub category select
            $("select#ilp_signature_municipality_id option,select#attestor_signature_municipality_id option").remove();
            //put in a empty default line
            var row = "<option value=\"" + "" + "\">" + "" + "</option>";
            $(row).appendTo("select#ilp_signature_municipality_id,select#attestor_signature_municipality_id");                        
            // Fill sub category select
            $.each(data, function(i, j){
              row = "<option value=\"" + j.municipality.id + "\">" + j.municipality.name + "</option>";  
              $(row).appendTo("select#ilp_signature_municipality_id,select#attestor_signature_municipality_id");                    
            });
            $("#ilp_signature_municipality_id,#attestor_signature_municipality_id").selectbox();       
          }
        });
      };
    }
  });
  
  $("#ilp_signature_province_of_birth_id, #attestor_signature_province_of_birth_id").selectbox({
    onChange: function () {
      var id_value_string = $(this).val();
      if (id_value_string == "") {
        // if the id is empty remove all the sub_selection options from being selectable and do not do any ajax
        $("select#ilp_signature_municipality_of_birth_id option, select#attestor_signature_municipality_of_birth_id option").remove();
        var row = "<option value=\"" + "" + "\">" + "" + "</option>";
        $(row).appendTo("select#ilp_signature_municipality_of_birth_id, select#attestor_signature_municipality_of_birth_id");
      }
      else {
        // Send the request and update sub category dropdown
        $.ajax({
          dataType: 'json',
		  headers: { 
			Accept : "application/json",
		  },
          cache: false,
		  type: "POST", 
		  contentType: "application/json; charset=utf-8", 
          url: '/province/municipalities_for_provinceid/' + id_value_string,
          timeout: 2000,
          error: function(XMLHttpRequest, errorTextStatus, error){
            alert("Failed to submit : "+ errorTextStatus+" ;"+error);
          },
          success: function(data){
            // Disable selectbox functionality in order to be able to enable it again with new values
            $("#ilp_signature_municipality_of_birth_id, #attestor_signature_municipality_of_birth_id").selectbox("detach");
            // Clear all options from sub category select
            $("select#ilp_signature_municipality_of_birth_id option, select#attestor_signature_municipality_of_birth_id option").remove();
            //put in a empty default line
            var row = "<option value=\"" + "" + "\">" + "" + "</option>";
            $(row).appendTo("select#ilp_signature_municipality_of_birth_id, select#attestor_signature_municipality_of_birth_id");                        
            // Fill sub category select
            $.each(data, function(i, j){
              row = "<option value=\"" + j.municipality.id + "\">" + j.municipality.name + "</option>";  
              $(row).appendTo("select#ilp_signature_municipality_of_birth_id, select#attestor_signature_municipality_of_birth_id");
            });
            $("#ilp_signature_municipality_of_birth_id, #attestor_signature_municipality_of_birth_id").selectbox();
          }
        });
      };
    }
  });

  $("#attestor_signature_municipality_id").selectbox();
  $("#attestor_signature_municipality_of_birth_id").selectbox();
  
  $("#ilp_signature_municipality_id").selectbox();
  $("#ilp_signature_municipality_of_birth_id").selectbox();

  $("#endorsment_signature_province_id").selectbox();
  $("#feedback_signature_reason_feedback_id").selectbox();
});
