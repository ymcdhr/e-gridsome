(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"0xua":function(t,e,a){"use strict";var i=a("fBUP"),s={props:{article:{type:Object,require:!0}},methods:{mdToHtml:function(t){return i.b.mdToHtml(t)}}},l=a("KHd+"),c=Object(l.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"article"},[a("div",{staticClass:"page-cnt"},[a("div",{staticClass:"title"},[t._v("\n            "+t._s(t.article.title)+"\n        ")]),a("el-divider"),a("div",{staticClass:"time"},[a("div",{staticClass:"updated"},[t._v("更新时间："+t._s(t.article.updated_at))]),a("div",{staticClass:"published"},[t._v("发布时间："+t._s(t.article.published_at))])])],1),a("div",{staticClass:"markdown-cnt"},[a("div",{directives:[{name:"g-image",rawName:"v-g-image"}],staticClass:"markdown-here-wrapper",domProps:{innerHTML:t._s(t.mdToHtml(t.article.content))}})])])}),[],!1,null,null,null);e.a=c.exports},ejch:function(t,e,a){"use strict";a.r(e);var i={components:{Article:a("0xua").a},computed:{article:function(){return this.$page.data}}},s=a("KHd+"),l=null,c=Object(s.a)(i,(function(){var t=this.$createElement;return(this._self._c||t)("Article",{attrs:{article:this.article}})}),[],!1,null,null,null);"function"==typeof l&&l(c);e.default=c.exports}}]);