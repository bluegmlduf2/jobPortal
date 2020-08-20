$(function () {
    console.log(jobCommentList);
    createComment();
});


function createComment() {
    $('#commentAdd').empty();

    var listHtml = "";
    //게시물 값 초기화 
    $.each(jobCommentList, function (index, value) {
        for (var i = 0; i < value.JOB_GRP_DEN; i++) {
            listHtml += "&emsp;&emsp;&emsp;&emsp;&emsp;";
        }

        listHtml += "<div style='display: inline-block;'>" +
            "<img src='" + value.IMAGE + "' alt='Image placeholder' width='50px' height='50px'>" +
            "<h3 style='display: inline-block; margin:auto 10px'>" + value.NM + "</h3>" +
            "<div class='meta'>October 03, 2018 at 2:21pm</div>" +
            "<p>" + value.JOB_COMMENT + "</p>" +
            "<p><a href='#' class='reply'>Reply</a></p>" +
            "</div></br>";
    });

    console.log(listHtml);
    $('#commentAdd').append(listHtml);

}