import { notify } from 'notiwind';
import {DirectiveBinding} from 'vue';

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding):void {
        el.addEventListener('click', function () {
            navigator.clipboard.writeText(binding.value)
            .then(() => {
                notify({group:"success", text:"Copiado!"})
            })
            .catch(() => {
                notify({group:"error", text: "Ocorreu um erro ao copiar!"})
            })
        })
    }
}