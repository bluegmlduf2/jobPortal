var idChk=false;
var mailChk=false;

$(function () {
	//DatePicker
	$('input[name=datePicker]').datepicker({
		format: "yyyy-mm-dd", //데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
		autoclose: true //사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
	}).val(new Date().toISOString().slice(0, 10)); //datepicker end

	//IMAGE SAVE
	$("#c_form_img,#e_form_img,#com_form_img").submit(function(e){
		e.preventDefault();//강제 호출 되는 submit이벤트의 동작을 막아준다
		
		// alert($(this).attr("id"));
		var id=$(this).attr("id");
			id=id.substring(0,id.indexOf('_'));

		if($('#'+id+'ImageFile').val()!=''){
			swal({
				title: "Save image",
				text: "Would you like to save image?",
				icon: "info",
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				buttons: true
			}).then((willDelete) => {
				if(willDelete){
					//image Save
					var formData = new FormData($('#'+id+"_form_img")[0]);
					$.ajax({
						url : $('#'+id+"_form_img").attr('action'),
						dataType : 'json',
						type : 'POST',
						data : formData,
						contentType : false,
						processData : false,
						success: function(resp) {
							if(resp.uploaded==1){
								swal("Thanks!", "Successfully Updated!", "success");
								$('#'+id+'Path').val(resp.url);
								$('#'+id+'Image').attr('src',resp.url);	
							}else{
								//swal("** Please Check Image **", resp.msg,"error");
								swal("** Please Check Image **", "Check the image","error");
							}
						},error: function (request, status, error) {
							//swal("** Please Check input Value **", output);
							//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
							swal("Error!", "--- Please Contact Administrator ---", "error");
						}
					});
				}
			});
		}else{
			swal("Check!", "Please Select File", "info");
			return;
		}
	});
});

//jobTypeDetail init
$('#cJobType').on('change', function () {
	$.ajax({
		type: "POST",
		url: "/signup/jobTypeDetail",
		data: {
			"jobType": $("#cJobType option:selected").val()
		},
		async: false,
		dataType: "json",
		success: function (result) {
			//kind
			$('#cJobTypeDetail').empty();
			var listHtml

			if (result['JsonParam'].jobTypeDetail.length != 0) {
				$.each(result['JsonParam'].jobTypeDetail, function (index, value) {
					listHtml += '<option value="' + value.CODE_IDX + '">' + value.CODE_NAME + '</option>';
				});
			} else {
				listHtml += '<option value="0">Please Select</option>';
			}

			$('#cJobTypeDetail').append(listHtml);
			//console.log(result['post'][0].ITEM_CD);//JS에서 객체의 멤버변수를 접근할때는 .을 사용
		},
		error: function (request, status, error) {
			//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
			swal("Error!", "--- Please Contact Administrator ---", "error");
		}
	});
});

//ID CHECK
$('#btnIdCheck1,#btnIdCheck2').on('click', function () {
	var id=$(this).attr('data-memo');
	$.ajax({
		type: "POST",
		url: "/signup/idCheck",
		data: {
			"id": $("#"+id).val()
		},
		async: false,
		dataType: "json",
		success: function (result) {
			var loginChk=result['JsonParam'].loginChk;

			if(loginChk!=1){
				swal("Thanks!", "Successfully Checked!\n ID input field would be disabled", "success");
				//$('#'+id).css('background-color', '#e2e2e2');
				$('#'+id).attr("disabled",true);
				$('#'+id).attr("readonly",true);
				idChk=true; 
			}else{
				swal("Check!", "The ID that already exists.", "info");
				//$('#'+id).css('background-color', '#e2e2e2');
				$('#'+id).attr("disabled",false);
				$('#'+id).attr("readonly",false);
				idChk=false; 
			}
		},
		error: function (request, status, error) {
			//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
			swal("Error!", "--- Please Contact Administrator ---", "error");
		}
	});
})

//EMAIL CHECK
$('#btnMailCheck1,#btnMailCheck2').on('click', function () {
	var mail=$(this).attr('data-memo');

	$.ajax({
		type: "POST",
		url: "/signup/mailCheck",
		data: {
			"mail": $("#"+mail).val()
		},
		async: false,
		dataType: "json",
		success: function (result) {
			var loginChk=result['JsonParam'].loginChk;

			if(loginChk!=1){
				swal("Thanks!", "Successfully Checked!\n EMAIL input field would be disabled", "success");
				//$('#'+id).css('background-color', '#e2e2e2');
				$('#'+mail).attr("disabled",true);
				$('#'+mail).attr("readonly",true);
				mailChk=true; 
			}else{
				swal("Check!", "The EMAIL that already exists.", "info");
				//$('#'+id).css('background-color', '#e2e2e2');
				$('#'+mail).attr("disabled",false);
				$('#'+mail).attr("readonly",false);
				mailChk=false; 
			}
		},
		error: function (request, status, error) {
			//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
			swal("Error!", "--- Please Contact Administrator ---", "error");
		}
	});
})

//validation Check
function validationChk(obj) {
    var chk = true;
    var output = "";
    var arrCol=[
        '[ Cd ]\n',
        '[ item Name ]\n',
        '[ Kind ]\n',
        '[ Sale ]\n',//option
        '[ Price ]\n',
        '[ Take ]\n',//option
        '[ imagePath ]\n',
		'[ Content ]\n',
		'[ ItemDetailList ]'
    ];

    var contact = JSON.parse(obj);//json문자열 ->js객체
    var i=0;
		
    //국가선택체크
    if(contact.itemKind==0){
        output+="[ Kind ]\n";
        chk = false;
	}
	
	//상세약품체크
	if($('#itemListTbl>tbody>tr').children().length==0){
		output+="[ ItemDetailList ]\n";
		chk = false;
	}

    //공백확인
    $.each(contact, function (index, item) {

        if(index!="itemSale"
        &&index!="itemTake"
        &&index!="itemContent"
        &&index!="itemCd"){
            if (item == "") {
                //$("#idNm").focus(); 
                output += arrCol[i];
                chk = false;
            }     
        }
        i++
    });

    //에러메세지 출력
    if (output != "") {
        swal("** Please Check input Value **", output);
    }

    return chk;
}

	//Save
	$('#btnSave').click(function(){
		var msg='Item Code : '+$('#itemcd').val();

		if($('#itemcd').val()==''){
			msg='New Item';
		}
		
		var main=new Array();		
		var cnt=0;
		var sub;

		//htmlTable->json
		//json형태 --> 객체{배열[객체{}{}..]}
		$('#itemListTbl>tbody>tr').children().each(function(i,e){
			//$(this) 와 e (태그객체)는 같다
			
			if($(this).attr('class')=='medicine-cd'){
				sub=new Object();
				sub['MEDICINE_CD']=$(this).children('#mCD').text();
			}
			if($(this).attr('class')=='medicine-name'){
				sub['MEDICINE_NAME']=$(this).children('#mNameMedi').text();
			}
			if($(this).attr('class')=='medicine-effect'){
				sub['MEDICINE_EFF']=$(this).children('#mEff').text();
			}
			if($(this).attr('class')=='medicine-remove'){
				main[cnt] = sub;
				cnt++
			}
		});
		var jsonTblObj={list:main};

		//jsonTblObj=JSON.stringify(jsonTblObj);

		var obj = {
			"itemCd":$('#itemcd').val(),
			"itemName":$('#itemName').val(),
			"itemKind":$('#itemKind').val(),
			"itemSale":$('#itemSale').val(),
			"itemPrice":$('#itemPrice').val(),
			"itemTake":$('#itemTake').val(),
			"itemPath":$('#itemPath').val(),
			"itemContent":$('#itemContent').val(),
			"ItemDetailList":jsonTblObj
		};
		
		obj = JSON.stringify(obj);

		if(validationChk(obj)){
			swal({
				title: "Save Item",
				text: "Would you like to save "+msg+"?",
				icon: "info",
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				buttons: true
			}).then((willDelete) => {
				if(willDelete){
					$.ajax({
						type: "POST",
						url: "/pharmaShop/main/saveItemList",
						data: {
							"data": obj
						},
						async: false,
						success: function (result) {
							swal("Thanks!", "Successfully Updated!", "success");
							location.reload();
						},
						error: function (request, status, error) {
							//console.log("code:"+request.status+ ", message: "+request.responseText+", error:"+error);
							swal("Error!", "--- Please Contact Administrator ---", "error");
						}
					});
				}
			});
		}
	});