var nowDate = getNowDate();  // 获取当前时间
    datePadding(nowDate[0], 0);  // 填充获取到的时间
    getNum();  // 获取动态总数并填充
    getlastDT(nowDate); // 获取最后更新时间并填充
    function getlastDT(nowDate) {
        const query = new AV.Query('shuoshuo');
        query.equalTo('imgurl', 'https://cdn.jsdelivr.net/gh/xingjiahui/CDN@latest/touxiang.jpg');
        query.descending('createdAt')
        query.find().then((num) => {
            // console.log(num[0].createdAt.toString().split(' '))
            var lastDate = num[0].createdAt.toLocaleDateString().replace(/\//g, '-');  // 日期
            var lastTime = num[0].createdAt.getHours();
            var day = datedifference(nowDate[0], lastDate), text;
            // console.log(day)
            if (day >= 365) {
                text = parseInt(day / 365).toString() + ' 年'
            } else if (day >= 30) {
                text = parseInt(day / 30).toString() + ' 月'
            } else if (day >= 7) {
                text = parseInt(day / 7).toString() + ' 周'
            } else if (day >= 1) {
                text = day.toString() + ' 天'
            } else {
                // console.log(lastTime, nowDate[1])
                var hours = (nowDate[1] - lastTime).toString()
                text = hours.toString() + ' 小时'
            }
            datePadding(text, 2);  // 调用函数填充获取到的动态总数目
            // console.log(text)
            // nowDate[1]
        });
    }
    // var lastUpdateFormat = document.getElementsByClassName('shuoshuo_time')[0].innerText.split(' ')[2]; // 获取最后更新时间并格式化
    // var result = datedifference(nowDateFormat, lastUpdateFormat);
    // document.getElementById('snote guide').innerHTML = '最后发表于：&nbsp;<span class="inline-tag red">' + result[0] + '</span>&nbsp天前！';
    function getNowDate() {  // 获取当前时间
        var newDate = new Date();
        return [newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate(), newDate.getHours()];  // 获取当前时间并格式化
    }
    function getNum() {  // 获取说说总数目
        const query = new AV.Query('shuoshuo');
        query.equalTo('imgurl', 'https://cdn.jsdelivr.net/gh/xingjiahui/CDN@latest/touxiang.jpg');
        query.find().then((num) => {
            datePadding(num.length, 1);  // 调用函数填充获取到的动态总数目
        });
    }
    function datePadding(date, number) {  // 填充内容，number = 0：当前时间 1：动态总数目 2：最后发布时间
        document.getElementsByClassName('inline-tag log')[number].innerHTML = date;
    }
    function datedifference(sDate1, sDate2) {  // 计算天数差，任一参数格式：2006-12-18
        var dateSpan, iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays;
    }
