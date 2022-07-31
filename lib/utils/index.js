const collapseMenu = (triggerEl, targetEl) => {
    // optional options with default values and callback functions
    const options = {
        triggerEl: triggerEl,
        onCollapse: () => {
            console.log("element has been collapsed")
        },
        onExpand: () => {
            console.log("element has been expanded")
        },
        onToggle: () => {
            console.log("element has been toggled")
        },
    }

    const collapse = new Collapse(targetEl, options)
    return collapse
}

const toSlug = (string) => {
    // Chuyển hết sang chữ thường
    string = string.toLowerCase()

    // xóa dấu
    string = string.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a")
    string = string.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e")
    string = string.replace(/(ì|í|ị|ỉ|ĩ)/g, "i")
    string = string.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o")
    string = string.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u")
    string = string.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y")
    string = string.replace(/(đ)/g, "d")

    // Xóa ký tự đặc biệt
    string = string.replace(/([^0-9a-z-\s])/g, "")

    // Xóa khoảng trắng thay bằng ký tự -
    string = string.replace(/(\s+)/g, "-")

    // xóa phần dự - ở đầu
    string = string.replace(/^-+/g, "")

    // xóa phần dư - ở cuối
    string = string.replace(/-+$/g, "")

    // return
    return string
}

const toLowerCaseTrim = (string) => {
    // Chuyển hết sang chữ thường
    string = string.toLowerCase()

    // xóa dấu
    string = string.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a")
    string = string.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e")
    string = string.replace(/(ì|í|ị|ỉ|ĩ)/g, "i")
    string = string.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o")
    string = string.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u")
    string = string.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y")
    string = string.replace(/(đ)/g, "d")

    // Xóa ký tự đặc biệt
    string = string.replace(/([^0-9a-z-\s])/g, "")

    // Xóa khoảng trắng thay bằng ký tự
    string = string.replace(/(\s+)/g, "")

    // xóa phần dự - ở đầu
    string = string.replace(/^-+/g, "")

    // xóa phần dư - ở cuối
    string = string.replace(/-+$/g, "")

    // return
    return string
}

const pagination = (c, m) => {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || (i >= left && i < right)) {
            range.push(i)
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1)
            } else if (i - l !== 1) {
                rangeWithDots.push("...")
            }
        }
        rangeWithDots.push(i)
        l = i
    }

    return rangeWithDots
}

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

export { collapseMenu, pagination, toSlug, getBase64 }
