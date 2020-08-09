$(function () {

});

//OPEN BTN:function
var openModalFunc = function () {
	//LoginCookieCheck 
	var cookieVal = $.cookie("userID");
	if (cookieVal != undefined || cookieVal != null) {
		$('#chkSaveID').attr('checked', true);
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
	});
}

//OPEN BTN
$('#openModalBtn').on('click', openModalFunc);


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
			var loginId = result.JsonParam.result[0].LOGIN_ID;
			//swal("Welcome!", "Welcome to Login [ " + loginId + " ] !", "success");
			swal({
				title: "Welcome",
				text: "Welcome to Login [ " + loginId + " ] !",
				icon: "success"
			}).then(() => {
				location.reload();
			});
		},
		error: function (request, status, error) {
			var errMsg = request['responseJSON']['error'];
			swal("Error!", errMsg, "error");
		}
	});
});

// LOGOUT BTN
$('#logOutBtn').on('click', function () {
	swal({
		title: "LogOut",
		text: "Would you like to Logout?",
		icon: "info",
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		buttons: true
	}).then((selectYN) => {
		if (selectYN) {
			//세션 제거하는 ajax 들어간 후 reload()
			$.ajax({
				type: "POST",
				url: "/logout",
				async: false,
				success: function () {
					swal({
						title: "Logout",
						text: "Thank you See you next time !!",
						icon: "info"
					}).then(function(){
						location.reload();
					})
				},
				error: function (request, status, error) {
					var errMsg = request['responseJSON']['error'];
					swal("Error!", errMsg, "error");
				}
			});
		}
	});
});