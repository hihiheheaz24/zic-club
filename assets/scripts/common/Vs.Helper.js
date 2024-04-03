var Helper = {
    formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ".") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    },
    formatMoney2(value) {
        var newValue = value;
        if (value >= 1000) {
            var suffixes = ["", "K", "M", "B","T"];
            var suffixNum = Math.floor( (""+value).length/3.5 );
            var shortValue = '';
            for (var precision = 3; precision >= 1; precision--) {
                shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                if (dotLessShortValue.length <= 3) { break; }
            }
            if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
            newValue = shortValue+suffixes[suffixNum];
        }
        return newValue;
    },
    getRandom(min, max, isInteger = true) {
      return isInteger ? Math.floor(Math.random() * (max - min + 1)) + min : Math.random() * (max - min) + min;
    },
    getRandomString(length, caps = false) {
        var value = '1234567890qwertyuiopasdfghjklzxcvbnm'
        if(caps)
            value += 'QWERTYUIOPASDFGHJKLZXCVBNM'
        var string_arr = value.split('')
        var string = ''
        for (var i = 0; i < length; i++) {
            string += string_arr[this.getRandom(0, string_arr.length - 1)]
        }
        return string
    },
    formatDate(date) {
        var date = new Date(date)
        var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
        ];

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear() + '';
        var hour = date.getHours();
        var minute = date.getMinutes();
        var seconds = date.getSeconds();

        return hour +':' + minute + ':' + seconds + ' ' +day + '/' + month + '/' + year.slice(2, 4);
    },
    formatDate2(date) {
        var date = new Date(date)
        var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
        ];

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear() + '';
        var hour = date.getHours();
        var minute = date.getMinutes();
        var seconds = date.getSeconds();

        return day + '/' + month + '/' + year.slice(2, 4);
    },
    formatTime(inputTime) {
        var secNumb = parseInt(inputTime);
        var hours = Math.floor((secNumb) / 3600);
        var minutes = Math.floor((secNumb - hours * 3600) / 60);
        var seconds = secNumb - (minutes * 60);

        if (hours < 10)
            hours = "0" + hours;

        if (minutes < 10)
            minutes = "0" + minutes;

        if (seconds < 10)
            seconds = "0" + seconds;
        return minutes + ':' + seconds;
    },
    countUpNumber(node, value, time = 1, format = '<outline color=#ff0000><b><color=#FFE558>{0}</color></b></outline>', oldValue = 0) {//richtext
        if(oldValue == undefined || oldValue == null)
            oldValue = 0
        
        var info = {gold: oldValue}
        cc.tween(info)
        .to(time, {gold: value}, {
          progress: (start, end, current, ratio) => {
            try{
                node.string = format.replace('{0}', helper.formatMoney(Math.floor(ratio == 1 ? end : current)))
                return start + (end - start) * ratio;
            } catch(e) {}
          }
        })
        .start()
 
        
    },
    parseURL(url) {
        // console.log('parseURL', url)
        var newUrl = url.replace('/?', '')
        var datas = newUrl.split('&')
        var newData = {}


        for (var i = 0; i < datas.length; i++) {
            var data = datas[i]
            var data_arr = data.split('=')
            if(data_arr[1]) {
                var value = data_arr[1].replace('xxxx', '=')
                value = value.replace('cccc', '&')
                newData[data_arr[0]] = value
            } else {
                newData[data_arr[0]] = ''
            }
            
        }
        return newData
        // return querystring.parse(newUrl)
        // return urls.parse(url,true).query
    },
    setSession(key, value) {
        cc.sys.localStorage.setItem(key, value)
    },
    removeSession(key) {
        cc.sys.localStorage.removeItem(key)
    },
    getSession(key) {
        return cc.sys.localStorage.getItem(key)
    },
    regDrag(node, callback = null, moveNode = null) {
        var positionStart;
        let target = moveNode || node
        node.on(cc.Node.EventType.TOUCH_START, (event) => {
            positionStart = event.getLocation()
            if(callback)
                callback(event)
        }, this);
        node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            
            var location = event.getLocation()
            target.x += location.x - positionStart.x
            target.y += location.y - positionStart.y

            positionStart = location
            if(callback)
                callback(event)
            // if(node.getComponent(cc.Button))
                // node.getComponent(cc.Button).interactable = false
        }, this);
        node.on(cc.Node.EventType.TOUCH_END, (event) => {
            
            // if(node.getComponent(cc.Button))
            //     node.getComponent(cc.Button).interactable = true
            if(callback)
                callback(event)
        }, this);
    },
}
module.exports = Helper