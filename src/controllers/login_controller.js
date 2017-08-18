/**
 * Created by icepoint1999 on 17/02/2017.
 */
import HttpHelper from '../helpers/http'
export default class LoginController {

    sign_in(username = this.username, password = this.password) {
        return HttpHelper.Request("/api/users/sign_in", {username: username, password: password}, 'post').then((data) => {
            if (data && data.status == '20000') {
                let date = Date.parse(new Date()) / 1000
                let expire_in = (date + 7200) * 1000
                data.user["expire_in"] = expire_in
                window.sessionStorage.setItem("current_user", JSON.stringify(data.user))
                this.user_session_key = data.user.user_session_key
            }
            return data

        })
    }

    sign_up(username = this.username, phone = this.phone, password = this.password) {
        return HttpHelper.Request("/api/users", {username: username, phone: phone, password: password}, 'post')
    }

    sites(params = {}){
        return HttpHelper.Request("/api/users/sites", params).then((data)=>{
            this.self_sites = data.sites
            this.cached = true
            return data.sites
        })
    }

}