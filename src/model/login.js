/**
 * Created by icepoint1999 on 10/02/2017.
 */
import {observable, computed} from "mobx";
import  LoginController from '../controllers/login_controller'
/**
 * Created by icepoint1999 on 10/02/2017.
 */

export  default class login extends LoginController {
    @observable username = "";
    @observable password = "";
    @observable message = "";

}