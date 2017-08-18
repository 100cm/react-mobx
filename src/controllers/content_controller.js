/**
 * Created by icepoint1999 on 09/03/2017.
 */
import  Http from '../helpers/http'
export  default class ContentController {
    create(params={}){
        return Http.Request('/api/atyun_site_contents',params,'post')
    }

    my_content(params= {}){
        return Http.Request('/api/users/contents',params).then((data)=>{
            this.current_contents = data.contents
            this.cached_contents = data.contents
            return data.contents
        })
    }
    delete(params={}){
        return Http.Request('/api/atyun_site_contents/0',params,'delete')
    }

    index(params={}){
        return Http.Request('/api/atyun_site_contents',params)
    }

    update(params={}){
        return Http.Request('/api/atyun_site_contents/0',params,'put')
    }

}