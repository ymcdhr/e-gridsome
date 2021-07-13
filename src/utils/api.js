import axios from 'axios'
import Cookies from 'js-cookie';
import { parse } from 'query-string'

// const baseStrapi = "http://localhost:1337"
const baseStrapi = "https://arsom72h.dongtaiyuming.net/"

export const api = {
    giteeRepos: "https://gitee.com/api/v5/users/${username}/repos",
    giteeRepo: "https://gitee.com/api/v5/repos/${username}/${rep}",
    gitUser: "https://api.github.com/users/${username}",
    githubRepos: "https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}",
    githubRepo: "https://api.github.com/repos/${username}/${rep}",
    githubMd: "https://raw.githubusercontent.com/${username}/${rep}/master/README.md",
    gitFollowings: "https://api.github.com/users/${username}/following?page=${page}&per_page=${perPage}",

    strapi: baseStrapi,
    strapiPage: baseStrapi + "/pages?user.username=${username}",
    strapiLogin: baseStrapi + "/auth/local",
    strapiReps: baseStrapi + "/git-reps?user.username=${username}",
    strapiRep: baseStrapi + "/git-reps/${rep}?user.username=${username}",
    strapiCreateBlog: baseStrapi + "/blogs"
}

export const com = {
    // 使用正则表达式替换图片地址，添加服务器地址
    regImg(text) {
        try{
            const imgs = text.match(/!\[(.*?)\]\((.*?)\)/g)
            imgs.forEach(img=>{
                const url = img.replace(/!\[.*\]\(/g, '').replace(/\)/g,'')
                text = text.replaceAll(url,api.strapi + url)
            })
        }
        catch(e){
            console.log("e:",e)
        }
        

        return text
    },

    mdToHtml(text) {
        var hljs = require('highlight.js'); // https://highlightjs.org/

        var md = require('markdown-it')({
            html: true,
            linkify: true,
            typographer: true,
            highlight: function (str, lang) {
              if (lang && hljs.getLanguage(lang)) {
                try {
                  return hljs.highlight(lang, str).value;
                } catch (__) {}
              }
          
              return ''; // 使用额外的默认转义
            }
        });

        return md.render(this.regImg(text))
    },

    setUrl(url, obj) {
        try{
            Object.keys(obj).forEach(key => {
                url = url.replace('${' + key + '}', obj[key])
            })

            return url
        }
        catch(e){
            console.error("url 可能有问题！", url)
            
            return url
        }
    },
    user() {
        try{
            const user = JSON.parse(Cookies.get("user"))
            return user ? user : {}
        }
        catch(e){
            if(typeof location !== "undefined"){
                return parse(location.search)
            }

            return {}
        }
    }
}

let cache = Object.create(null)

const req = axios.create({
    // baseURL: 'https://api.github.com',
    method: 'GET',
    timeout: 10000,
    // headers: {
    //     'Authorization': `Token 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`,
    //     // 'Content-Type': 'application/x-www-form-urlencoded'
    // }
})


// req.interceptors.response.use(res => {}, err => {
// 	console.log(err);
//     console.log('err.response:', err.response);
//     // console.log(err.response.data);
//     // console.log(err.response.data.error);
// })

// 创建请求对象
export const request = function (params){
    if(params.cache){
        if(cache[params.url]){
            return cache[params.url]
        }
        return req(params).then(res => {
            cache[params.url] = res
            return res
        })
    }
    return req(params)
}

// 请求拦截器
// Add a request interceptor
// 任何请求都要经过请求拦截器
// 我们可以在请求拦截器中做一些公共的业务处理,例如统一设置 token
// request.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     const token = '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'
//     // 请求就会经过这里
//     config.headers.Authorization = `Token ${token}`
//     return config;

// }, function (error) {
//     console.log('error:',error)
//     // 如果请求失败(此时请求还没有发出去)就会进入这里
//     // Do something with request error
//     return Promise.reject(error)
// })
