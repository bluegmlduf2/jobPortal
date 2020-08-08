$(function () {

});

//OPEN BTN
$('#openModalBtn').on('click', function () {
	//LoginCookieCheck 
	var cookieVal = $.cookie("userID");
	if (cookieVal != undefined||cookieVal !=null) {
		$('#chkSaveID').attr('checked',true);
		$('#MNG_ID').val(cookieVal);
	}

	$('#modalBox').modal('show').css({
		'margin-top': function () { //vertical centering
			//return -($(this).height() / 2);
			return 250;
		},
		'margin-left': function () { //Horizontal centering
			return 0;
		}
	});;
});

// CANCEL BTN
$('#closeModalBtn').on('click', function () {
	$('#MNG_ID').val('');
	$('#MNG_PW').val('');
	$('#modalBox').modal('hide');
});

// OK (CONFIRM) BTN
$('#confirmBtn').on('click', function () {
	var MNG_ID = $('#MNG_ID').val();
	var MNG_PW = $('#MNG_PW').val();

	if (MNG_ID == null || MNG_PW == null) {
		swal("Please Input Value");
		return;
	}

	var obj = {
		"MNG_ID": MNG_ID,
		"MNG_PW": MNG_PW,
		"CHK": $("#chkSaveID").is(":checked") ? 1 : 0
	};

	$.ajax({
		type: "POST",
		url: "/login",
		data: {
			"data": JSON.stringify(obj)
		},
		dataType: "json",
		async: false,
		//dataType: "json",//서버에서 받을 데이터 형식을 지적한다.그러나 반환값이 없으므로 에러가 발생하므로 주석처리
		success: function (result) {
			console.log(result.JsonParam)

			var loginId = result.JsonParam.result[0].LOGIN_ID;

			$('#modalBox').modal('hide');
			swal("Welcome!", "Welcome to Login [ " + loginId + " ] !", "success");
			location.reload();
			// memName=result["memObj"];
			// location.href = '/pharmaShop/main/managementItem/'+memName;
			// if (result.order_cd[0].CNT == 1) {
			// 	swal("Thanks!", "Successfully Checked!", "success");
			// 	var rUrl = "/pharmaShop/main/orderList/" + value;
			// 	location.href = rUrl;
			// } else {
			// 	swal("Sorry Check the OrderNumber!", result.message, "error");
			// }                       
		},
		error: function (request, status, error) {
			// if(result==null){
			//     swal("Check!", "Please Check ID / PASSWORD", "info");
			//     return;
			// }

			var errMsg = request['responseJSON']['error'];
			//$('#modalBox').modal('hide');
			//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
			swal("Error!", errMsg, "error");

		}
	});
});