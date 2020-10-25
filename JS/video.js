// console.log(nowList,wantList,oldList)

var form1 = '<div class="video-container">#0#</div>'
var form2='<div class="video-warp"><p class="video-info"><a href="#1#"><img src="#2#"></a></p><p class="video-title"><a href="#1#">#3#</a></p></div>'
function getHTML(videoList) {
	let videoStr='';
	for(i=0;i<videoList.length;i+=3){
		videoStrform2=form2;
		videoStr+=videoStrform2.replace(/#1#/g,videoList[i+1]).replace(/#2#/,videoList[i+2]).replace(/#3#/,videoList[i]);
	}
	return videoStr;
}

function insert(videoStr,videoId){
	videoStrform1=form1;
	videoStr=videoStrform1.replace('#0#',videoStr);
	buttonStr=document.getElementsByClassName('tab-to-top')[0].outerHTML;
	document.getElementById(videoId).innerHTML=videoStr+buttonStr;
}

function mainVideo(videoList,videoId){
	videoStr=getHTML(videoList);
	insert(videoStr,videoId);
}

mainVideo(nowList,'-1')
mainVideo(wantList,'-2')
mainVideo(oldList,'-3')
