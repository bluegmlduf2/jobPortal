$(document).ready(function () {

});

//CKEDITOR INIT
CKEDITOR.replace(
    'jobContent', //textArea Id
    {
        height: 500,
        toolbarCanCollapse: true,
        filebrowserUploadUrl: '/new-post/imageUpload'
    }
);

function setValue() {
    var value = CKEDITOR.instances['jobContent'].getData()
    console.log(value);
}

$('#btnPost').on('click', function (e) {
    e.preventDefault(); //submit Event 방지

    //PostOption Check
    if (!$("input[name='post-option']").is(':checked')) {
        swal({
            title: "Please Input Value",
            text: "Please Check Post Option",
            icon: "info",
            confirmButtonColor: '#3085d6'
        })
        return;
    } else {
        //not to permmit TwoCheck Box
        var len = $("input:checkbox[name='post-option']:checked").length;
        if (len > 1) {
            swal({
                title: "Please Select One Option",
                text: "Please Select Only one Post Option",
                icon: "info",
                confirmButtonColor: '#3085d6'
            })
            //Post Option Unchecked
            $("input[name='post-option']").prop('checked', false)
            return;
        }
    }

    //JobTime Check
    if (!$("input[name='job-time']").is(':checked')) {
        swal({
            title: "Please Input Value",
            text: "Please Check Job Time",
            icon: "info",
            confirmButtonColor: '#3085d6'
        })
        return;
    }

    //JobTime Check
    if (!$("input[name='job-time']").is(':checked')) {
        swal({
            title: "Please Input Value",
            text: "Please Check Job Time",
            icon: "info",
            confirmButtonColor: '#3085d6'
        })
        return;
    }
    
    var jobTitle = $('#jobTitle').val();
    var subTitle = $('#subTitle').val();
    var jobPath = $('#jobPath').val();
    var jobDesc = $('#jobDesc').val();
    var jobContent =  CKEDITOR.instances['jobContent'].getData()

    //Null Check
    if(jobTitle==''||subTitle==''||jobPath==''||jobDesc==''||jobContent==''){
        swal({
            title: "Please Input Value",
            text: "Please Input All Values",
            icon: "info",
            confirmButtonColor: '#3085d6'
        })
        return;
    }

    var obj = {
    	"COMPANY_IDX": $('#companyEmpIdx').val(),
        "JOB_TITLE": jobTitle,
        "JOB_SUBTITLE": subTitle,
        "JOB_IMAGE": jobPath,
        "JOB_CONTENT": jobContent,
        "JOB_DESC": jobDesc,
        "JOB_OPTION": $("input:checkbox[name='post-option']:checked").val(),
        "JOB_TIME": $("input:radio[name='job-time']:checked").val()
    };

    $.ajax({
    	type: "PUT",
    	url: "/new-post/insertPost",
    	data: {
    		"data": JSON.stringify(obj)
    	},
    	async: false,
    	//dataType: "json",//서버에서 받을 데이터 형식을 지적한다.그러나 반환값이 없으므로 에러가 발생하므로 주석처리
    	success: function (result) {//error에서만 result를 사용하면 error로 넘어간다.. (2시간)
    		swal({
    			title: "Upload Post",
    			text: "Your post is Registered !!",
    			icon: "success"
    		}).then(() => {
    			location.reload();
    		});
    	},
    	error: function (request, status, error) {
    		swal("Error!", "--- Please Contact Administrator ---", "error");
    	}
    });
});