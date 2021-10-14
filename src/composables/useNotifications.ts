import {notify} from 'notiwind';
export default function useNotifications() {

    function createNotify(title:string, text:string, type:'info'|'success'|'error'|'warning') {
        notify({
            group: type,
            title,
            text,
            type
        }, 5000) // 4s
    }

    const notifications = {
        success(message:string) {
            return createNotify("Sucesso", message, 'success');
        },

        error(message:string) {
            return createNotify("Error", message, 'error');
        },

        info(message:string) {
            return createNotify("Atenção", message, 'info');
        },

        warning(message:string) {
            return createNotify("Atenção", message, 'warning');
        }
    }


    return {
        notifications
    }
}