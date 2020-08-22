var commentObj = {
    JOB_IDX: jobSingleList[0].JOB_IDX,
    JOB_GRP_IDX: null,
    JOB_COMMENT: null,
    JOB_WRITER: LOGIN_GB
}; //init when click the comment

//AFTER ONLOAD Document 
//아래의 메서드는 $(document).onload(),$(function{})과 같다. 
//window.onload=function () {};보다 빠르게 호출됨
window.addEventListener('DOMContentLoaded', function(){ 
    createComment();
    newComment();
    postComment();
    console.log(jobSingleList);
});

function postComment() {
    if (LOGIN_GB != null) {
        commentObj.JOB_COMMENT=document.getElementById('message').value;//init message for sending
        document.getElementById('postComment').addEventListener(
            'click',
            function (e) {
                console.log(commentObj);
                //document.getElementById('')
                // e.preventDefault();

                // //vanilla JS Ajax  
                // // XMLHttpRequest 객체의 생성
                // var xhr = new XMLHttpRequest();

                // // 비동기 방식으로 Request를 오픈한다
                // xhr.open('PUT', '/job-single/insertComment');

                // // Request를 전송한다
                // // 클라이언트가 서버로 전송할 데이터의 MIME-type 지정: json
                // xhr.setRequestHeader('Content-type', 'application/json');

                // const data = {
                //     id: 3,
                //     title: 'JavaScript',
                //     author: 'Park',
                //     price: 5000
                // };

                // xhr.send(JSON.stringify(data));

                // xhr.onreadystatechange = function () {
                //     // 서버 응답 완료 && 정상 응답
                //     if (xhr.readyState !== XMLHttpRequest.DONE) return;

                //     if (xhr.status === 200) {
                //         console.log(xhr.responseText);

                //         // Deserializing (String → Object)
                //         responseObject = JSON.parse(xhr.responseText);

                //         // JSON → HTML String
                //         let newContent = '<div id="tours"><h1>Guided Tours</h1><ul>';

                //         responseObject.tours.forEach(tour => {
                //             newContent += `<li class="${tour.region} tour">
                //         <h2>${tour.location}</h2>
                //         <span class="details">${tour.details}</span>
                //         <button class="book">Book Now</button>
                //       </li>`;
                //         });

                //         newContent += '</ul></div>';

                //         document.getElementById('content').innerHTML = newContent;
                //     } else {
                //         console.log(`[${xhr.status}] : ${xhr.statusText}`);
                //     }
                // };
            }
        );
    }
}

function newComment() {
    if (LOGIN_GB != null) {
        document.getElementById('newComment').addEventListener('click', function (e) {
            swal({
                title: "Init New Comment",
                text: "Would you like to Init Comment",
                icon: "info",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                buttons: true
                //dataType: "json",전달받을 데이터양식, 보낼때는 생략
            }).then((willDelete) => {
                if (willDelete) {
                    commentObj.JOB_GRP_IDX = null;
                    commentObj.JOB_COMMENT = null;

                    var commentElement = document.getElementById('leaveComment');
                    var commentElementHead = document.getElementById('leaveCommentHead');
                    commentElement.innerText = "Leave a New Comment";

                    window.scrollTo({
                        top: commentElementHead.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        })
    }
}

function createComment() {
    if (LOGIN_GB != null) {
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
                "<p>" + value.JOB_COMMENT + "</p>"
            if (LOGIN_GB != null) {
                listHtml += "<p><a onclick='javascript:clickReply(this)' class='reply' href='javascript:void(0);' data-memo='" + JSON.stringify(value) + "'>Reply</a></p>"
            }
            listHtml += "</div></br>";
        });

        $('#commentAdd').append(listHtml);
    }
}

function clickReply(param) {
    var pramObj = JSON.parse(param.getAttribute('data-memo'));
    commentObj.JOB_GRP_IDX = pramObj.JOB_GRP_IDX;

    swal({
        title: "Leave Comment",
        text: "Would you like to Leave Comment to [ " + pramObj.NM + " ]?\n  Contents:::" + pramObj.JOB_COMMENT + "",
        icon: "info",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        buttons: true
        //dataType: "json",전달받을 데이터양식, 보낼때는 생략
    }).then((willDelete) => {
        if (willDelete) {
            var commentElement = document.getElementById('leaveComment');
            var commentElementHead = document.getElementById('leaveCommentHead');
            commentElement.innerText = "Leave a comment to [ " + pramObj.NM + " ]";

            window.scrollTo({
                top: commentElementHead.offsetTop,
                behavior: 'smooth'
            });
        }
    });
}