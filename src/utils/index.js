var dayjs = require('dayjs');

export function formatDay(date) {
    return dayjs(date).format('YYYY年MM月DD日')
}
export function formatTime(time) {
    return dayjs(time).format('YYYY年MM月DD日 HH:mm:ss')
}
export function formatTimeToM(time) {
    return dayjs(time).format('YYYY年MM月DD日 HH:mm')
}
export function isTrue(data) {
    if (data === 'true') {
        return true
    } else {
        return false
    }
}
export function createInputFile(id, url) {
    const file = document.createElement('input')
    file.name = 'fileName'
    file.type = 'file'
        // file.accept =
        //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' //xlsx文件，可改
    file.click()
    file.addEventListener('change', submitFile(id, url))
}
export function submitFile(id, url) {
    return (event) => {
        console.log(id, url)
        let formdata = new FormData()
        formdata.append('file', event.target.files[0])
        console.log(event.target.files[0])
            // console.log(formdata.get('file'))
    }
}