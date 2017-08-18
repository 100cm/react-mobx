/**
 * Created by icepoint1999 on 09/03/2017.
 */
import {observable,computed} from 'mobx'
import ContentCategoryController from "../../controllers/content_category_controller";
export  default  class ContentCategory extends ContentCategoryController{
    @observable current_content_categories = []
    @observable cached_content_categories = []
    @observable editing = {}
    @observable  default_option = new Array()

}