import useNotifications from './useNotifications';

export default function useClipboard() {

    const { notifications } = useNotifications();

    const copyText = (text:string) => {
        navigator.clipboard.writeText(text)
        .then(() => {
            notifications.success('Copiado!');
        })
    }


    return  {
        copyText
    }
}