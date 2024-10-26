import Swal from 'sweetalert2';
const customSwal = Swal.mixin({
    // background: '#1d232a',
    // color: '#a6adbb',
    customClass: {
        popup: 'bg-base-100 text-base-content rounded-2xl',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-neutral',
    }
})

export default defineNuxtPlugin(() => {
    return {
        provide: {
            Swal: customSwal
        }
    }
});