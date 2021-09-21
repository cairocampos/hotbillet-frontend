import 'mosha-vue-toastify/dist/style.css';
import {createToast} from 'mosha-vue-toastify';
export default function useToaster() {
    const toast = (description:string, type: 'danger' | 'warning' | 'success') => {
        let title = "";

        const msgTitle = {
            danger() {
                return 'Ocorreu um erro'
            },
            warning() {
                return 'Atenção'
            },
            success() {
                return 'Tudo certo!'
            },
            info() {
                return 'Informação';
            }
        }

        title = msgTitle[type]();

        createToast({
            title, 
            description
        }, {
            type
        });
    }

    return toast
}