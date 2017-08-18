import {observable, computed} from "mobx";
import  LoginController from '../controllers/login_controller'
/**
 * Created by icepoint1999 on 10/02/2017.
 */

export  default class User extends LoginController {
    @observable username = "";
    @observable phone = "";
    @observable password = "";
    @observable message = "";
    @observable apps = []
    @observable self_sites = []
    @observable cached =false

    @observable user_session_key = '';

    @computed get session_key() {
        return this.user_session_key || JSON.parse(window.sessionStorage.getItem('current_user')).user_session_key
    }


}

