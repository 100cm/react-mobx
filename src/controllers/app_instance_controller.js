/**
 * Created by icepoint1999 on 21/02/2017.
 */
import  HttpHelper from '../helpers/http'
export class AppInstanceController {

    create(params={}){
        return HttpHelper.Request("/api/users/app_instance",params,"post")
    }

    all(params={}){
        return HttpHelper.Request('/api/app_instances',params, "post")
    }

    mine(params={}){
        return HttpHelper.Request('/api/users/app_instances',params)
    }

    update_theme(params={}){
        return HttpHelper.Request('/api/app_instances/theme',params,'put')
    }

    layout_instances(params={}){
        return HttpHelper.Request('/api/app_instances/layout_instances',params)
    }

    update_layout(params=this.layout_param){
        return HttpHelper.Request('/api/app_instances/update_layout',params,'put')
    }

    site(params={}){
        return HttpHelper.Request('/api/app_instances/site',params).then((data)=>{
            this.current_site = data.site
            return data.site
        })
    }

}