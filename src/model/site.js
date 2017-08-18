/**
 * Created by icepoint1999 on 08/03/2017.
 */
import  {observable} from 'mobx'
import SiteController from "../controllers/site_controller";

export default class site extends SiteController{

    @observable current_site

}