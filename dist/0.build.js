webpackJsonp([0],{33:function(t,a,e){"use strict";function i(t){e(45)}Object.defineProperty(a,"__esModule",{value:!0});var n=e(37),o=e(48),p=e(3),s=i,c=p(n.a,o.a,!1,s,"data-v-f92e02c8",null);a.default=c.exports},37:function(t,a,e){"use strict";a.a={name:"popup",props:["data"],data:function(){return{}},computed:{visiable:function(){return!!this.data.visiable&&this.data.visiable}},methods:{closePopup:function(){this.data.visiable=!1}}}},45:function(t,a,e){var i=e(46);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(1)("4b99b210",i,!0,{})},46:function(t,a,e){var i=e(7);a=t.exports=e(0)(!1),a.push([t.i,"#popup[data-v-f92e02c8]{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#222;z-index:999999}#popup header[data-v-f92e02c8]{position:relative;text-align:center;line-height:40px;font-size:18px;height:40px;margin-bottom:20px;background:#222;box-shadow:0 1px 1px hsla(0,12%,84%,.14)}#popup header .back[data-v-f92e02c8]{position:absolute;left:0;top:5px;height:40px;width:40px;border-style:none;background:url("+i(e(47))+") no-repeat}#popup .company[data-v-f92e02c8]{font-size:.6rem;text-align:center}#popup .period[data-v-f92e02c8]{text-align:right;padding:0 10px}#popup p.content[data-v-f92e02c8]{padding:0 10px;font-size:.5rem;text-indent:2em;line-height:.8rem;text-align:justify}",""])},47:function(t,a,e){t.exports=e.p+"img/back.png?ed28a0aa8c42aafd828efe5d76ad46a9"},48:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.visiable?e("div",{attrs:{id:"popup"}},[e("header",[e("button",{staticClass:"back",on:{click:t.closePopup}}),t._v(" "),e("span",[t._v("工作内容")])]),t._v(" "),e("h2",{staticClass:"company"},[t._v(t._s(t.data.data.company))]),t._v(" "),e("div",{staticClass:"period"},[t._v(t._s(t.data.data.period))]),t._v(" "),e("p",{staticClass:"content"},[t._v(t._s(t.data.data.content))])]):t._e()},n=[],o={render:i,staticRenderFns:n};a.a=o}});
//# sourceMappingURL=0.build.js.map