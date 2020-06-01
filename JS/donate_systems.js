//console.log("下面是数据填充");
//jquery获取字符串
$.get("https://donate.xingjiahui.top/getJsonData.php", function getData(data) {
    //将获取到的字符串转化为json类型
    var donationInfo = JSON.parse(data);
    //console.log(donationInfo);
    // dom选择器选择要添加donate信息的标签
    var donate_tbody = $("table")[0];
    //遍历json数据，按格式加入到页面中
    //格式模板
    var temp = '<tr><td align="center"><a href="{url}" target="_blank" rel="noopener">{name}</a></td><td align="center">{pay_way}</td><td align="center">{userdonate}</td><td align="center">{donate_out}</td></tr>';
    // console.log(temp);
    // 处理打赏数据
    //console.log(donate_tbody.innerHTML+"**");
    var STR = "<tbody>";
    for (var i = 0; i < donationInfo.length; i++) {
        var str = temp.replace("{url}", donationInfo[i].user_url).replace("{name}", donationInfo[i].user_name).replace("{pay_way}", donationInfo[i].pay_way).replace("{userdonate}", donationInfo[i].user_donate);
        // console.log(typeof str);
        //根据
        if (donationInfo[i].donate_confirm == "NO") {
            str = str.replace("{donate_out}", "等待管理员审核...");
        } else {
            str = str.replace("{donate_out}", donationInfo[i].donate_out);
        }
        STR += str;
    }
    STR += "</tbody>";
    donate_tbody.innerHTML += STR;
    //console.log(donate_tbody.innerHTML);
});
//console.log("下面是美化内容...");
window.onload = function () {
    //Dom选择器选择标签
    var arrayList = document.getElementsByTagName("tr");
    //console.log(arrayList);
    var pageText = document.getElementsByTagName("p")[0].innerHTML;
    //填充“时间”、“打赏用户数”、“总金额”
    var personNum = arrayList.length - 1, sumDonate = 0;
    var nowDate = new Date;
    for (var i = 1; i < arrayList.length; i++) {
        sumDonate += Number(arrayList[i].getElementsByTagName("td")[2].innerHTML);
        //根据“打赏方式”修改对应文字颜色
        var payWay = arrayList[i].getElementsByTagName("td")[1].innerHTML;
        var outWay = arrayList[i].getElementsByTagName("td")[3].innerHTML;
        var outWayArray = outWay.split("、");
        if (payWay == "微信") {
            document.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].style.color = "rgb(60,176,53)";
        } else {
            document.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].style.color = "rgb(2,161,226)";
        }
        document.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML = "";
        //美化“赏金去向”
        for (var j = 0; j < outWayArray.length; j++) {
            document.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML += "<span class='inline-tag yellow'>" + outWayArray[j] + "</span>&nbsp;";
        }
        var donatMoney = arrayList[i].getElementsByTagName("td")[2].innerHTML;
        document.getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML = donatMoney + "￥";
    }
    // console.log(sumDonate);
    nowDate = (nowDate.getMonth() + 1) + "/" + nowDate.getDate() + "/" + nowDate.getFullYear();
    document.getElementsByTagName("p")[0].innerHTML = pageText.replace(/nowDate/, nowDate).replace(/personNum/, personNum).replace(/sumDonate/, sumDonate.toFixed(2));
}
