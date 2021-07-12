<template>
    <div class="article">
        <div class="markdown-title">
            <div class="title">
                {{ article.title }}
            </div>
            <el-divider></el-divider>
            <div class="time">
                <div class="updated">更新时间：{{ date(article.updated_at) }}</div>
                <div class="published">发布时间：{{ date(article.published_at) }}</div>
            </div>
        </div>
        <div class="markdown-cnt" :class="isFullScreeen?'full':''">
            <div class="btns" v-if="isEdit">
                <!-- <input v-model="scrollTop" /> -->
                <el-button class="full-btn" @click="onFullScreen" title="全屏" icon="el-icon-full-screen">全屏预览</el-button>
            </div>
            <div class="cnt">
                <el-input
                    v-if="isEdit"
                    ref="textnode"
                    class="markdown-input"
                    type="textarea"
                    :rows="16"
                    placeholder="请在此输入文章内容..."
                    v-model="article.content">
                </el-input>

                <div v-if="!isEdit || isFullScreeen" ref="mdnode" class="markdown-here-wrapper" v-html="mdToHtml(article.content)"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { api, com, request } from "@/utils/api.js"
import Cookie from "js-cookie"

export default {
    props: {
        article: {
            type: Object,
            require: true,
            default: {
                updated_at:"",
                published_at:"",
                content:""
            }
        },
        isEdit: false
    },
    data(){
        return {
            isFullScreeen: false,
        }
    },
    watch: {
        isFullScreeen: function (isFullScreeen) {
            if(this.isEdit && isFullScreeen){
                this.$nextTick(() => {
                    // console.log("$refs:", this.$refs)
                    // console.log("$textnode:", this.$refs['textnode'])
                    const textnode = this.$refs['textnode']
                    if(textnode){
                        const { textarea = undefined } =  textnode.$refs
                        if(textarea){
                            const mdnode = this.$refs['mdnode']
                            this.addScrollListen(textarea, mdnode)
                        }
                    }
                });
            }
        },

        isEdit: function (isEdit){
            if(!isEdit){
                this.onPublish()
            }
        }
    },
    computed: {
    },
    methods: {
        date(time) {
            return new Date(time).toLocaleDateString()
        },
        mdToHtml(text) {
            return com.mdToHtml(text)
        },
        onFullScreen() {
            this.isFullScreeen = !this.isFullScreeen
        },

        async onPublish() {
            const url = api.strapiCreateBlog + '/' + this.article.id
            const login = Cookie.get("login")
            const { id, username, token } = JSON.parse(login)

            const data = {
                user: {
                    id,
                    username
                },
                ...this.article
            }

            console.log("publish Data:", data)

            try{
                const res = await request({
                    method: "PUT",
                    url,
                    data,
                    // headers: {
                    //     token: "Token " + token
                    // }
                })

                if(res && res.data && res.data.id && res.data.content){
                    this.$message({
                        message: '更新成功~',
                        type: 'info'
                    });
                }
            }
            catch(e){
                this.$message({
                    message: '可能是网络问题，导致更新文章失败；请稍后再试~~',
                    type: 'error'
                });
            }
        },

        addScrollListen(sourceElement, tagetElement) {
            sourceElement.addEventListener("scroll", (e)=>{
                // 按照比例同步 scrollTop
                const sourceTop = e.target.scrollTop
                const sourceTotal = e.target.scrollHeight
                const targetTotal = tagetElement.scrollHeight
                
                tagetElement.scrollTop = sourceTop/sourceTotal * targetTotal
            })
        }
    },
    mounted(){

    }

}
</script>

<style>
</style>