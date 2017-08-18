import WelcomePage from "../views/welcome/index";
import Dashboard from '../views/dashboard/index'
import  AtyunNewApp from '../views/app_instances/new'
import  SingUpPage from '../views/users/new'
import {notification} from 'antd'
import MyAppInstances from "../views/app_instances/mine/index";
import AppInstanceConfig from "../views/app_instances/config/index";
import AtyunSiteContent from "../views/atyun_site/contents";
import AtyunSiteContentCategory from "../views/atyun_site/content_category/index";
import AtyunSiteContentNew from "../views/atyun_site/contents/new";
import ContentCategoryNew from "../views/atyun_site/content_category/new";
import ContentEdit from "../views/atyun_site/contents/edit";
import ContentCategoryEdit from "../views/atyun_site/content_category/edit";
export const routes = {
    childRoutes: [
        {
            path: '/',
            component: WelcomePage,
            // onEnter: (params, replace) => {
            //     let user = sessionStorage.getItem('current_user')
            //     if (user && new Date(user["expire_in"] > new Date())) {
            //         replace({pathname: '/dashboard'});
            //         notification.success({
            //             message: "",
            //             description: "您已经登陆"
            //         })
            //         return false
            //     }
            // },
        },
        {
            path: 'users/new',
            component: SingUpPage,
        },
        {
            path: '/dashboard',
            component: Dashboard,
            // onEnter: (params, replace) => {
            //     let user = sessionStorage.getItem('current_user')
            //     user = JSON.parse(user)
            //     if ((!sessionStorage.getItem('current_user') || new Date(user["expire_in"] < new Date())) == true) {
            //         replace({pathname: ''});
            //         sessionStorage.removeItem("current_user")
            //         notification.error({
            //             message: "",
            //             description: "登陆信息已过期，请重新登陆"
            //         })
            //         return false
            //     }
            // },
            childRoutes: [
                {
                    path: 'new_app',
                    component: AtyunNewApp

                },
                {
                    path: 'app_instances',
                    component: MyAppInstances
                },
                {
                    path: 'app_instances/:id/config',
                    component: AppInstanceConfig
                },

                {
                    path: 'atyun_site',
                    childRoutes: [
                        {
                            path: 'content_category',
                            component: AtyunSiteContentCategory

                        }, {
                            path: 'content',
                            component: AtyunSiteContent
                        },
                        {
                            path: "content/:id/edit",
                            component: ContentEdit
                        },
                        {
                            path: 'content/new',
                            component: AtyunSiteContentNew
                        }, {
                            path: 'content_category/new',
                            component: ContentCategoryNew
                        }, {
                            path: 'content_category/:id/edit',
                            component: ContentCategoryEdit
                        }
                    ]

                },


            ]
        }, {
            path: '/users/new',
            component: SingUpPage,
        }]

}