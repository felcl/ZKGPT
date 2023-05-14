import { slice } from "lodash";

export function AddrHandle(addr, start = 4, end = 4) {
    if (!addr) {
      return;
    }
    let r = new RegExp("(.{" + start + "}).*(.{" + end + "})");
    let addrArr = addr.match(r);
    return addrArr[1] + "...." + addrArr[2];
}
export function GetQueryString(name,href){
  let search 
  if(href){
    search = href.split("?")
  }else{
    search = window.location.href.split("?")
  }
  let parameterArr
  if(search[1]){
    parameterArr = search[1].split('&')
    parameterArr = parameterArr.map(item=>{
      return item.split("=")
    })
    return Object.fromEntries(parameterArr)[name]
  }else{
    return null
  }
}
export function NumSplic(val, len,supplement) {
  var f = parseFloat(val);
  if (isNaN(f)) {
    f = 0;
  }
  var s = f.toString();
  if (s.indexOf(".") > 0) {
    let f = s.split(".")[1].substring(0, len);
    s = s.split(".")[0] + "." + f;
  }
  if(supplement){
    var rs = s.indexOf(".");
    if (rs < 0) {
      rs = s.length;
      s += ".";
    }
    while (s.length <= rs + len) {
      s += "0";
    }
  }
  return s;
}
export function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}