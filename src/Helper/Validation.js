export const emptyValidation = (param) => {
    const flag = param.trim().length === 0;
    if (flag) {
        return "This field is required"
    }
    return false
}


export const validateEmail = (param) => {
    if (emptyValidation(param)) {
        return emptyValidation(param)
    } else {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(param)) {
            return false
        }
        return ("Invalid email address")
    }
}

export const validateMobileNumber = (param) => {
    if (emptyValidation(param)) {
        return emptyValidation(param)
    } else {
        if (param.trim().length === 10) {
            return false
        }
        return ("Invalid Mobile Number")
    }
}