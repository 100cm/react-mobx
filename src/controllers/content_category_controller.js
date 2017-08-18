/**
 * Created by icepoint1999 on 09/03/2017.
 */
import  HttpHelper from '../helpers/http'
export  default  class ContentCategoryController {
    index(params = {}) {
       return HttpHelper.Request('/api/atyun_site_content_categories', params).then((data) => {
            this.current_content_categories = data.atyun_site_content_categories
            return data.atyun_site_content_categories
        })
    }

    my_content_categories(params= {}){
        return HttpHelper.Request('/api/users/content_categories',params).then((data)=>{
            this.current_content_categories = data.content_categories
            this.cached_content_categories = data.content_categories
            return data.content_categories
        })
    }
    create(params={}){
        return HttpHelper.Request('/api/atyun_site_content_categories',params,'post')
    }

    update(params={}){
        return HttpHelper.Request('/api/atyun_site_content_categories/0',params,'put')
    }

    delete(params={}){
        return HttpHelper.Request('/api/atyun_site_content_categories/0',params,'delete')
    }
}