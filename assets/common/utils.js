// 把JS对象 - 转成key=value&key=value字符串
const objToArg = obj => {
    let arr = []
    for (const key in obj) {
        arr.push(`${key}=${obj[key]}`);
    }
    return arr.join('&')
}