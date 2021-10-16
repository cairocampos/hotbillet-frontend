import { notify } from 'notiwind';
import {DirectiveBinding} from 'vue';

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding):void {
        el.addEventListener('click', function () {
            notify({group:"success", text:"Copiado!"})
        })
    }
}