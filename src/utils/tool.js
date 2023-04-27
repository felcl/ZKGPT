export function AddrHandle(addr, start = 4, end = 4) {
    if (!addr) {
      return;
    }
    let r = new RegExp("(.{" + start + "}).*(.{" + end + "})");
    let addrArr = addr.match(r);
    return addrArr[1] + "...." + addrArr[2];
}