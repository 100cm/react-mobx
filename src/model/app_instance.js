/**
 * Created by icepoint1999 on 21/02/2017.
 */
import  {observable, computed} from 'mobx'
import {AppInstanceController} from "../controllers/app_instance_controller";
import  AtyunApp from './atyun_app'
export default class AppInstance extends AppInstanceController {
    @observable name = "";
    @observable layouts = []
    @observable preview_token =''
    @observable current_app_instance = {}
    @observable current_site = {}
    @computed get layout_param() {
        let la = {}
        let la_params = this.layouts.map((la) => {
            return {id: la.i, x: la.x, y: la.y, width: la.w, height: la.h}
        })
        la["layouts"] = la_params
        return la
    }
}