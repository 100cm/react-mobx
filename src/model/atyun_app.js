/**
 * Created by icepoint1999 on 21/02/2017.
 */
import  {observable} from 'mobx'
import {AtyunAppController} from "../controllers/atyun_app_controller";
export default class AtyunApp extends AtyunAppController{
    @observable name = ""
}