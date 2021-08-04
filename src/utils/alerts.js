import Swal from "sweetalert2"

export const alertWithSuccess = (options) => {
    return Swal.fire({
        title: "Success",
        icon: 'success',
        confirmButtonText: 'موافق',
        cancelButtonText: 'لا',
        ...options,
    })
}

export const alertWithError = (options) => {
    return Swal.fire({
        title: "Error",
        icon: 'error',
        confirmButtonText: 'موافق',
        cancelButtonText: 'لا',
        ...options,
    })
}

export const alertWithWarning = (options) => {
    return Swal.fire({
        title: "Warning",
        icon: 'warning',
        confirmButtonText: 'موافق',
        cancelButtonText: 'لا',
        ...options,
    })
}

export const alertWithInfo = (options) => {
    return Swal.fire({
        title: "Info",
        icon: 'info',
        confirmButtonText: 'موافق',
        cancelButtonText: 'لا',
        ...options,
    })
}

export const toastAlert = (options) => {
    return Swal.fire({
        toast: true,
        confirmButtonText: 'موافق',
        cancelButtonText: 'لا',
        ...options
    })
}