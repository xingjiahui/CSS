var page_headers=document.getElementById('page-header');
var page_header_img=page_headers.style.backgroundImage;
if(page_headers.className=='post-bg'){
	console.log(page_header_img);
	page_headers.style.backgroundImage='url()';
	document.getElementById('web_bg').style.backgroundImage=page_header_img;
}
