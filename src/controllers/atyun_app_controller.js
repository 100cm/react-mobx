/**
 * Created by icepoint1999 on 21/02/2017.
 */
import  HttpHelper from '../helpers/http'
export class AtyunAppController {

    create(params={}){
        return HttpHelper.Request("/api/atyun_apps",params,"post")
    }

    all(params={}){
        return HttpHelper.Request('/api/atyun_apps',params)
    }

    themes(params={}){
        return HttpHelper.Request('/api/atyun_apps/themes',params)
    }

}