
$( document ).ready( function() {

} );

//CKEDITOR INIT
CKEDITOR.replace(
	'jobContent', //textArea Id
   {
	   height: 500,
	   toolbarCanCollapse : true,
	   filebrowserUploadUrl :'/new-post/imageUpload'
   }
);

function setValue() {

    var value = CKEDITOR.instances['jobContent'].getData()

    console.log(value);

    //  $( '#p_content' ).val( $( '' ).val() );
}

