# 时间日期

关于时间、日期相关的方法

## 毫秒转时、分、秒
```js
// 有多少个小时
let h = parseInt(times / 1000 / 60 / 60 % 24);
h = h < 10 ? '0' + h : h;
// 多少小时后 有多少分
let m = parseInt(times / 1000 / 60 % 60);
m = m < 10 ? '0' + m : m;
// 多少小时多少分后 有多少秒
let s = parseInt(times / 1000 % 60)
s = s < 10 ? '0' + s : s;
```

## 年-月-日
```js
/**
 * @description 年-月-日
 * @param time   时间戳
 * @return {string}
 */
export const getDate = time => {
  var result;
  var d = new Date(time);
  var year = d.getFullYear();
  var mouth;
  var day;
  if (d.getMonth() + 1 < 10) {
    mouth = "0" + (d.getMonth() + 1);
  } else {
    mouth = d.getMonth() + 1;
  }
  if (d.getDate() < 10) {
    day = "0" + d.getDate();
  } else {
    day = d.getDate();
  }
  result = year + "-" + mouth + "-" + day;
  return result;
};
```

## 时-分-秒
### 方案1
```js
/**
 * @description 时间格式化,获取时分秒  这种写法是根据传入的时间戳 转为 年月日时分秒，然后获取它的是时分秒
 * @param time
 * @return {string|*}
 */
export const getBranch = time => {
  if (time == "") {
    return time;
  }
  var result;
  var d = new Date(time);
  var hour = d.getHours();
  var minutes = d.getMinutes();
  var second = d.getSeconds();
  result = hour + ":" + minutes + ":" + second;
  return result;
};
```
### 方案2
```js
/**
 * @description 传入一个毫秒数，不是时间戳。 就仅仅是毫秒转时分秒有多少，xx小时xx分xx秒   这种写法是传入毫秒 转为 时分秒
 * @param 单纯的一个毫秒
 * @return {string}
 */
function getTime(ms) {    // 后端可能会返回负数 -_-|||
  if(ms>0) {
    let hour, minute, second
    let d = ms / 1000
    second = Math.floor(d % 60)
    minute = Math.floor((d / 60) % 60)
    hour = Math.floor(d / 60 / 60)
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    const time = {
      hour,
      minute,
      second
    }
    return (time.hour ? `${time.hour}小时` : '') + (time.minute ? `${time.minute}分钟` : '') + `${time.second}秒`;
  } else {
    return ''
  }
}
```

## 年-月-日-时-分-秒
```js
/**
 * @description 年-月-日-时-分-秒
 * @param now    时间戳
 * @return {string}
 */
export const getDateTime = function(now) {
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let arr = [month, date, hour, minute, second];
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  return (
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
  );
};
```

## 时间戳转标准格式时间
```js
/**
 * @description 时间戳 转为 标准格式时间
 * @param date
 * @return {Date}
 */
export const parserDate = date => {
  var t = Date.parse(date);
  if (!isNaN(t)) {
    return new Date(Date.parse(date.replace(/-/g, "/")));
  } else {
    return new Date();
  }
};
```

## moment相关
```js
moment().format('YYYY-MM-DD HH:mm:ss')
// 时分秒
moment().format('HH:mm:ss')

// 星期几
moment().day()
moment(val).day()

// 今天
moment().format('YYYY/MM/DD')
moment(new Date())
// 今天00:00:00 和 今天24:00:00即第二天的开始
const startDate = moment().startOf('day')
const endDate = startDate.clone().add(1, 'days');

// 前天
moment().subtract(1, 'days').format('YYYY/MM/DD')
moment(new Date()).add(-1, 'days')

// 明天
moment(new Date()).add(1,'days')

// 当前月
moment().format('MM')
// 上个月
moment().subtract(1,'months').format('YYYY-MM-DD HH:mm:ss')

// 月度开始结束时间
moment().startOf('month')
moment().endOf('month')

// 获取指定月份的第一天
moment(日期).startOf("month").format("YYYY-MM-DD");
// 获取指定月份的最后一天
moment(日期).endOf('month').format("YYYY-MM-DD");
//获取指定月份的上月份的第一天
moment(日期).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
// 获取指定月份的下月份的第一天
moment(日期).subtract(-1, 'months').startOf('month').format('YYYY-MM-DD');
// 获取指定月份的上月份的最后一天
moment(日期).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');

// 当前日期往后加多少天
moment().add(30, "days").format('YYYY-MM-DD HH:mm:ss')

// 当前年
moment().format('YYYY')
moment().year(); // Number

// 当年开始和当年结束 
moment().startOf('year')
moment().endOf('year')

// 上一年/下一年  上几年和下几年同理，做momment日期加减，月季度亦同理
moment().add(-1, 'y').format("YYYY")   // 上一年
moment().add(1, 'y').format("YYYY")    // 下一年
// 获取指定年份的第一天
moment(日期).startOf('year').format('YYYY-MM-DD');

// 当前季度
moment().quarter()
// 判断当前时间是哪个季节
moment(new Date()).quarter();//1

// 上一季度/下一季度
moment().add(-1, 'Q').quarter()
moment().add(1, 'Q').quarter()
```

1.计算俩日期相差多少天
```js
//获取当前时间
let m1 = moment();
//获取需要对比的时间
let m2 = moment(time);
//计算相差多少天 day可以是second minute
day = m2.diff(m1, 'day');
```

## 日期转为星期几

配合 `momentjs` 或 `dayjs` 库更方便
```js
function getWeek(val) {
  switch (val) {
    case 1:
      return '周一'
    case 2:
      return '周二'
    case 3:
      return '周三'
    case 4:
      return '周四'
    case 5:
      return '周五'
    case 6:
      return '周六'
    case 0:
      return '周日'
    default:
      return ''
  }
}
// getWeek(dayjs().day())
// getWeek(dayjs(时间戳).day())
// getWeek(moment().day())
// getWeek(moment(时间戳).day())
```

## 前天、昨天、今天、明天、后天、星期几

比如将 将 2021-04-21 和今天对比，返回 前天、昨天、今天、明天、后天、其他diff显示星期几
```js
function dateDay(val='') {
  if(val === '') return ''
  const nowDay = dayjs().format('YYYY-MM-DD');
  const nextDay = dayjs(val).format('YYYY-MM-DD')
  const diff = dayjs(nowDay).diff(nextDay, 'day');
  switch (diff) {
    case 2:
      return '前天'
    case 1:
      return '昨天'
    case 0:
      return '今天'
    case -1:
      return '明天'
    case -2:
      return '后天'
    default:
      return getWeek(dayjs(nextDay).day())
  }
}
```