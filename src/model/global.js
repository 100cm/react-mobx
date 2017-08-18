import {observable, computed} from "mobx";
/**
 * Created by icepoint1999 on 20/02/2017.
 */
export  default  class global {
    @observable breadCrumb = [{title: "首页", url: "/"}]
    @observable loading = false

    @computed get preview_host() {
        switch (process.env.NODE_ENV) {
            case 'prod':
            case 'production':
                return ''
                break;
            case 'test':
            case 'testing':
                break;
            case 'dev':
                return 'http://localhost:3000/'
            default:
                return 'http://localhost:3000/'
        }
    }
}