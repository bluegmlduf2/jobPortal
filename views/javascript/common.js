//IMAGE SAVE
$("#job_form_img,#e_form_img,#c_form_img,#com_form_img").submit(function (e) {
	e.preventDefault(); //강제 호출 되는 submit이벤트의 동작을 막아준다

	// alert($(this).attr("id"));
	var id = $(this).attr("id");
	id = id.substring(0, id.indexOf('_'));

	if ($('#' + id + 'ImageFile').val() != '') {
		swal({
			title: "Save image",
			text: "Would you like to save image?",
			icon: "info",
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			buttons: true
		}).then((willDelete) => {
			if (willDelete) {
				//image Save
				var formData = new FormData($('#' + id + "_form_img")[0]);
				$.ajax({
					url: $('#' + id + "_form_img").attr('action'),
					dataType: 'json',
					type: 'POST',
					data: formData,
					contentType: false,
					processData: false,
					success: function (resp) {
						if (resp.uploaded == 1) {
							swal("Thanks!", "Successfully Updated!", "success");
							$('#' + id + 'Path').val(resp.url);
							$('#' + id + 'Image').attr('src', resp.url);
						} else {
							//swal("** Please Check Image **", resp.msg,"error");
							swal("** Please Check Image **", "Check the image", "error");
						}
					},
					error: function (request, status, error) {
						//swal("** Please Check input Value **", output);
						//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
						swal("Error!", "--- Please Contact Administrator ---", "error");
					}
				});
			}
		});
	} else {
		swal("Check!", "Please Select File", "info");
		return;
	}
});