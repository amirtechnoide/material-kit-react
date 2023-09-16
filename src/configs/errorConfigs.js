import { toast } from 'react-toastify'; 
 
// Capture les différentes erreur possible lors de la requete et retourne le message d'erreur correspondant 
const errorHandler = (error, returnMessage=false, toToast=true) => { 
 console.log('ERROR', error) 
 
    // Liste des erreurs d'appel API avec les messages de retour appropriés 
 const axiosErrorHandler = { 
        ERR_NETWORK: 'Network error, please check your internet', 
        ERR_BAD_REQUEST: 'An error occured. Please check your informations and try again', 
        ERR_BAD_RESPONSE: 'Request failed: Server error. please try again', 
        ECONNABORTED: 'Error due to request timeout. Please check your internet and try again', 
        ENOTFOUND: 'Request failed: Server not found. Please try again', 
        ECONNREFUSED: 'Request failed: Access denied to the server', 
        ETIMEDOUT: 'Error due to request timeout. Please check your internet and try again', 
        EHOSTUNREACH: 'Request failed: Server unreachable. Please try again', 
        EPIPE: 'Request failed: Your internet is too slow or not working', 
        EAI_AGAIN: 'Request failed: DNS problem. Please try again.', 
        EPROTO: 'Request failed: Protocol error. Please try again', 
        ENETUNREACH: 'Request failed: Network is unreachable. Please check your internet', 
        ERR_CONNECTION_TIMED_OUT: 'Request failed: The server took too long to respond. Please try again', 
        ERR_CONNECTION_REFUSED: 'Request failed: The server refused to connect. Please try again', 
        ERR_ADDRESS_UNREACHABLE: 'Request failed: Server address unreachable.', 
        ERR_INTERNET_DISCONNECTED: 'Request failed: Internet connection was lost while processing. Please try again', 
        ERR_PROXY_CONNECTION_FAILED: 'Request failed: The connection to the proxy server failed. Please try again', 
        ERR_NAME_RESOLUTION_FAILED: 'Request failed: Domain name error.', 
 } 
 
    // le message à retourner est celui retourné par la liste... sinon celui dans la reponse... sinon un message par defaut 
    const message = returnMessage ?? axiosErrorHandler[error?.code] ?? (error?.response?.data?.message ?? 'An error occured. please try again') 
  
    if (toToast) toast.error(message) 
 
    return message 
} 
 
export { errorHandler }
