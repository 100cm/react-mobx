import ContentController from "../../controllers/content_controller";
/**
 * Created by icepoint1999 on 09/03/2017.
 */
import  {observable, computed} from 'mobx'
export  default  class Content extends ContentController {
    @observable current_contents = []
    @observable cached_contents = []
    @observable updated = false
    @observable edit_content = {site_content_category: []}
    @observable category_name  = ""

    @computed get edit_title(){
        return this.edit_content.title
    }

}