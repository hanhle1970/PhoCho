import axios from 'axios'
import Constants from '../contants'

export default class AxiosEx {
    http = null;
    authen = null;

    constructor(authen) {
        console.log('create axios');
        this.authen = authen;

        this.http = axios.create({
            baseURL: Constants.API_SERVICE,
            headers: { 'Content-Type': 'application/json' }
        })

        this.http.interceptors.request.use(function (config) {
            if (authen.jwt != null) {
                //console.log(authen.jwt);

                Object.assign(config.headers, {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + authen.jwt,
                });

                //config.headers.Authorization =  "Bearer " + authen.jwt;
            }

            return config;
        }, 
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    }

    get(url, callback) {
        this.http.get(url)
        .then(res => {
            var data = res.data;

            if (data.hasError) {
                console.log(url);
                console.log(data.errMessage);
            }
            else {
                callback(data.result);
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    post(url, data, callback, failback) {
        this.http.post(url, data)
        .then(res => {
            var data = res.data;

            if (data.hasError) {
                console.log(data.errMessage);
                failback(data.errMessage);
            }
            else {
                callback(data);
            }
        })
        .catch((error) => {
            console.log(error);
            failback(error);
        })
    }

    upload(url, data, callback, failback) {
        this.http.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + this.authen.jwt,
            }
        })
        .then(res => {
            var data = res.data;

            if (data.hasError) {
                console.log(data.errMessage);
                failback(data.errMessage);
            }
            else {
                callback(data);
            }
        })
        .catch((error) => {
            console.log(error);
            failback(error);
        })
    }

    login(userName, pwd, remember, callback, failback) {
        var form = new FormData();
        form.append('userName', userName);
        form.append('pwd', pwd);

        this.post('api/Authen/Login', form, (res) => {
            console.log(res.result);

            this.authen.set(res.result);
            //this.http.defaults.headers.common['Authorization'] = "Bearer " + this.authen.jwt;

            if (remember) {
                localStorage.setItem('phocho-user', userName);
                localStorage.setItem('phocho-pwd', pwd);
            }

            callback(true);
        },
        (err) => {
            if (failback != null) {
                failback(err);
            }
        });
    }

    relogin(callback, failback) {
        let userName = localStorage.getItem('phocho-user');
        let pwd = localStorage.getItem('phocho-pwd');

        if (userName != null && pwd != null) {
            this.login(userName, pwd, false, (res) => {
                callback(res);
            }, 
            failback);
        }
        else {
            failback();
        }
    }

    logout() {
        this.authen.reset();

        localStorage.removeItem('phocho-user');
        localStorage.removeItem('phocho-pwd');
    }
}

//export default new AxiosEx();
