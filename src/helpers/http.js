/**
 * Created by icepoint1999 on 17/02/2017.
 */

/**
 * Created by accidie on 16/10/31.
 */
import axios from 'axios'
import ApiConfig from '../constants/api'
import  {notification} from  'antd'
// import MD5 from 'blueimp-md5'

class HttpHelper {

    getToken() {
        const url = `/oauth/token.json?`
        const params = {
            client_id: ApiConfig.api_uid,
            client_secret: ApiConfig.api_secret,
            grant_type: 'client_credentials'
        }
        return axios.post(url, params)
    }

    current_token() {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token === null || token.created_at + token.expires_in < new Date().getTime() / 1000 || token === {}) {
            return this.getToken().then(data=>{return data.data})
        } else {
            return new Promise(function (resolve, reject) {
                resolve(token);
            });
        }
    }

    /**
     * 自定义封装请求
     * @param url
     * @param params
     * @param type
     * @returns {*}
     * @constructor
     */
    REQUEST(url, params, type = 'get') {
        const instance = axios.create({
            baseURL: ApiConfig.api_url
        })
        const token = JSON.parse(localStorage.getItem('token'))
        if (token === null || token.created_at + token.expires_in < new Date().getTime() / 1000 || token === {}) {
            return this.getToken().then((response) => {
                const data = response.data
                const tokenObj = {
                    created_at: data.created_at,
                    expires_in: data.expires_in,
                    access_token: data.access_token
                }

                localStorage.setItem('token', JSON.stringify(tokenObj))
                // let timestamp = (Math.floor(new Date().getTime() / 1000)).toString()
                // let salt = "+" + timestamp + tokenObj.access_token + "+";
                // params['salt'] = MD5(salt)
                params['access_token'] = data.access_token

                switch (type) {
                    case 'get':
                        return instance.get(url, {params})
                    case 'post':
                        return instance.post(url, params)
                    case 'put':
                        return instance.put(url, params)
                    case 'delete':
                        return instance.delete(url, {params})
                    case 'patch':
                        return instance.patch(url, params)
                }
            }).catch((res) => {
                console.log(res)
            })
        } else {
            params['access_token'] = token.access_token

            switch (type) {
                case 'get':
                    return instance.get(url, {params})
                case 'post':
                    return instance.post(url, params)
                case 'put':
                    return instance.put(url, params)
                case 'delete':
                    return instance.delete(url, {params})
                case 'patch':
                    return instance.patch(url, params)
            }
        }
    }

    urls = ["/api/users/sign_in.json"]

    //剔除不需要user_session_key的接口
    user_urls = ["/api/users/sign_in.json", "/api/users.json"]

    Request(url, params, type = 'get') {
        url = url + ".json"

        window.sessionStorage.getItem("current_user")

        if (this.user_urls.includes(url) != true) {
            params["user_session_key"] = JSON.parse(window.sessionStorage.getItem("current_user"))["user_session_key"]
        }
        return this.REQUEST(url, params, type).then((data) => {

            return {...data.data.data, status: data.data.status.code, message: data.data.status.message[0] || ""}
        }).then(data => {
            //剔除部分api
            if (this.urls.includes(url) != true && data.status != "20000") {
                if(data.status == '50001'){
                    window.sessionStorage.clear('current_user')
                    window.location.reload()
                }
                notification.open({
                    message: "服务端错误",
                    description: data.message,
                });
            }
            return data

        }).catch((e) => {
            notification.open({
                message: "服务端错误",
                description: "服务器出故障啦",
            })
        })
    }

    /**
     * 上传文件请求
     * @param url   请求地址(string)
     * @param params  请求参数（obj）
     * @param type   请求类型(string)
     * @param callback   回调函数（function）
     */
    uploadFile(url, params, type, callback) {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token === null || token.created_at + token.expires_in < new Date().getTime() / 1000 || token === {}) {
            return this.getToken().then((response) => {
                const data = response.data
                const tokenObj = {
                    created_at: data.created_at,
                    expires_in: data.expires_in,
                    access_token: data.access_token
                }

                localStorage.setItem('token', JSON.stringify(tokenObj))
                const formData = new FormData()
                const xhr = new XMLHttpRequest()

                formData.append('access_token', data.access_token)

                for (const key in params) {
                    if (params.hasOwnProperty(key)) {
                        formData.append(key, params[key])
                    }
                }

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        callback(JSON.parse(xhr.response))
                    }
                }

                xhr.open(type, url, true)
                xhr.setRequestHeader('Content-Type', 'multipart/form-data')
                xhr.send(formData)
            }).catch((res) => {
                console.log(res)
            })
        } else {
            const formData = new FormData()
            const xhr = new XMLHttpRequest()

            formData.append('access_token', token.access_token)

            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    formData.append(key, params[key])
                }
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    callback(JSON.parse(xhr.response))
                }
            }

            xhr.open(type, url, true)
            xhr.send(formData)
        }
    }

    // 因为要获得token,所以写在这里
    downloadFile(url, params) {
        const token = JSON.parse(localStorage.getItem('token'))
        let str = ''

        for (const item in params) {
            str += `${item}=${params[item]}&`
        }

        if (token === null || token.created_at + token.expires_in < new Date().getTime() / 1000 || token === {}) {
            return this.getToken().then((response) => {
                const data = response.data
                const tokenObj = {
                    created_at: data.created_at,
                    expires_in: data.expires_in,
                    access_token: data.access_token
                }

                localStorage.setItem('token', JSON.stringify(tokenObj))
                str += `access_token=${data.access_token}`
            }).catch((res) => {
                console.log(res)
            })
        } else {
            str += `access_token=${token.access_token}`
        }

        window.open(`${location.origin}${url}?${str}`)
    }

    // 接收转换二进制文件流
    XhrDownloadFile(url, paramsReceive, type) {
        const params = paramsReceive
        const token = JSON.parse(localStorage.getItem('token'))
        if (token === null || token.created_at + token.expires_in < new Date().getTime() / 1000 || token === {}) {
            this.getToken().then((response) => {
                const data = response.data
                const tokenObj = {
                    created_at: data.created_at,
                    expires_in: data.expires_in,
                    access_token: data.access_token
                }

                localStorage.setItem('token', JSON.stringify(tokenObj))
                params['access_token'] = data.access_token
                const file_url = url
                let params_string = ''
                for (const index in params) {
                    params_string += `${index}=${params[index]}&`
                }

                console.log(send_params)
                const xhr = new XMLHttpRequest()

                xhr.responseType = 'arraybuffer'
                xhr.onreadystatechange = (e) => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const blob = new Blob([this.response], {type: 'application/pdf'})
                        const link = document.createElement('a')
                        link.href = window.URL.createObjectURL(blob)
                        link.download = 'test'
                        link.click()
                    }
                }
                xhr.open(type, file_url, true)
                xhr.send(params_string.replace(/&$/, ''))
            }).catch((res) => {
                console.log(res)
            })
        } else {
            params['access_token'] = token.access_token
            const file_url = url
            let params_string = ''
            for (const index in params) {
                params_string += `${index}=${params[index]}&`
            }
            const xhr = new XMLHttpRequest()

            xhr.responseType = 'arraybuffer'
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const blob = new Blob([this.response], {type: 'application/pdf'})
                    const link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = 'test'
                    link.click()
                }
            }
            xhr.open(type, file_url, true)
            xhr.send(params_string.replace(/&$/, ''))
        }
    }
}

module.exports = new HttpHelper()
