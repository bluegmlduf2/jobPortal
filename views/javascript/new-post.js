
$( document ).ready( function() {
     CKEDITOR.replace(
         'p_content', 
        {
            height: 500,
            toolbarCanCollapse : true,
            filebrowserUploadUrl :'/new-post/upload'
        }
     );
} );

function setValue() {
    var value = CKEDITOR.instances['p_content'].getData()

    console.log(value);
    //  $( '#p_content' ).val( $( '' ).val() );
}