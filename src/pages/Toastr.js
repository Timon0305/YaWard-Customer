import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export const successToastr = (msg) => {
    toastr.options = {
        positionClass : 'toast-top-right',
        hideDuration: 1000,
        timeOut: 3000,
        showEasing   : 'swing',
        closeButton: true
    };
    toastr.clear();
    setTimeout(() => toastr.success(msg), 300)
};

export const warningToastr = () => {
    toastr.options = {
        positionClass : 'toast-top-right',
        hideDuration: 1000,
        timeOut: 3000,
        showEasing   : 'swing',
        closeButton: true
    };
    toastr.clear();
    setTimeout(() => toastr.warning('You have to login'), 300)
};

export const infoToastr = (msg) => {
    toastr.options = {
        positionClass : 'toast-top-right',
        hideDuration: 1000,
        timeOut: 3000,
        showEasing   : 'swing',
        closeButton: true
    };
    toastr.clear();
    setTimeout(() => toastr.info(msg), 300)
};

export const errorToastr = (msg) => {
    toastr.options = {
        positionClass : 'toast-top-right',
        hideDuration: 1000,
        timeOut: 3000,
        showEasing   : 'swing',
        closeButton: true
    };
    toastr.clear();
    setTimeout(() => toastr.error(msg), 300)
};

