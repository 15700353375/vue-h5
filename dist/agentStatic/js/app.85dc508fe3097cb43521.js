webpackJsonp([5],{199:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(240),r=a(o),u=n(232),i=a(u);t.default=[].concat((0,r.default)(i.default))},200:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(237),r=a(o),u=n(234),i=a(u),s=n(233),l=a(s);t.default=(0,r.default)(i.default,l.default)},201:function(e,t,n){"use strict";var a=n(46),o=function(e){return e&&e.__esModule?e:{default:e}}(a);(0,o.default)(document).on("click",function(e){var t=(0,o.default)(e.target),n=t.closest(".selectVue");if(n.length){(t.hasClass("caretBottom")||t.hasClass("caretSpan"))&&n.find("input").first().focus();var a=n.find(".dropdownMenu")[0].id;return(0,o.default)(".dropdownMenu").hide(),(0,o.default)("#"+a).show(),e.stopPropagation(),!1}(0,o.default)(".dropdownMenu").hide(),e.stopPropagation()}),(0,o.default)(document).on("click",function(e){var t=(0,o.default)(e.target),n=t.closest(".cascadeVue");if(n.length){(t.hasClass("caretBottom")||t.hasClass("caretSpan"))&&n.find("input").first().focus();var a=n.find(".ulDiv")[0].id;return(0,o.default)(".ulDiv").hide(),(0,o.default)("#"+a).show(),e.stopPropagation(),!1}(0,o.default)(".ulDiv").hide(),e.stopPropagation()}),(0,o.default)(document).on("click",function(e){if((0,o.default)(e.target).closest(".DropdownVue").length)return(0,o.default)(".dropdownMenuVue").show(),e.stopPropagation(),!1;(0,o.default)(".dropdownMenuVue").hide(),e.stopPropagation()})},202:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function o(e){if(-1==m.noTokenReq.indexOf(e)){var t=sessionStorage.getItem("agentToken");return E.default.defaults.headers.common.agentToken=t,!!t}return!0}function r(e){if(200!=e.data.code)return window.app.$message.error(e.data.message),e.data;var t=function(){var t=e.data.data.pagination;for(var n in e.data.data)t&&Array.isArray(e.data.data[n])&&e.data.data[n].map(function(e,n){e.index=t.limit*(t.page-1)+(n+1)});return{v:e.data}}();return"object"===(void 0===t?"undefined":(0,s.default)(t))?t.v:void 0}function u(e){e>=500?window.app.$message.error("服务器错误，请稍后重试"):e>=400&&e<500?404==e?window.app.$message.error("网络错误，请稍后重试"):window.app.$message.error("客户端错误，请联系工作人员"):e>=300&&e<400&&window.app.$message.error("请求发生重定向，请联系工作人员")}var i=n(241),s=a(i),l=n(27),d=a(l),f=n(284),c=a(f),p=n(212),E=a(p),m=n(28),_=function(e,t,n){var a=t||{};if(o(e))return E.default.post(e,c.default.stringify(a)).then(function(e){return n&&(n.loading=!1),r(e)}).catch(function(e){n&&(n.loading=!1),u(e.response.status)});this.$router.push({name:"login"})},g=function(e,t,n){var a=t||{};if(o(e))return E.default.get(e,{params:a}).then(function(e){return n&&(n.loading=!1),r(e)}).catch(function(e){n&&(n.loading=!1),u(e.response.status)});this.$router.push({name:"login"})};E.default.defaults.baseURL=m.urls.BASE_URL,E.default.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",E.default.defaults.timeout=25e3,d.default.prototype.$ajaxPost=_,d.default.prototype.$ajaxGet=g},208:function(e,t,n){var a=n(211)(null,n(297),null,null,null);e.exports=a.exports},230:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var o=n(27),r=a(o),u=n(47),i=a(u),s=n(210),l=a(s),d=n(200),f=a(d),c=n(199),p=a(c),E=n(208),m=a(E),_=n(207),g=(a(_),n(0)),O=a(g),P=n(46),v=a(P),L=n(209),M=a(L),h=n(202),w=(a(h),n(201)),S=(a(w),n(48)),y=a(S),T=n(28);r.default.use(i.default),r.default.use(l.default),r.default.prototype.$message=M.default;var A=new i.default.Store({modules:f.default,plugins:[y.default.vuexReload]}),I=new l.default({linkActiveClass:"red",routes:p.default}),Y=new r.default({el:"#app",store:A,router:I,components:{App:m.default},template:"<App/>"});window.$=v.default,window.Moment=O.default,window.app=Y,I.beforeEach(function(e,t,n){if(e.meta.title&&(document.title=e.meta.title),-1==T.noTokenUrls.indexOf(e.path)){sessionStorage.getItem("agentToken");n()}else n()})},232:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){return n.e(0).then(function(){return e(n(303))}.bind(null,n)).catch(n.oe)},o=function(e){return n.e(1).then(function(){return e(n(302))}.bind(null,n)).catch(n.oe)},r=function(e){return n.e(3).then(function(){return e(n(300))}.bind(null,n)).catch(n.oe)},u=function(e){return n.e(2).then(function(){return e(n(301))}.bind(null,n)).catch(n.oe)};t.default=[{path:"/",name:"statistical",component:a,meta:{title:"即时信息"}},{path:"/report",name:"report",component:o,meta:{title:"报表决策"}},{path:"/manager",name:"manager",component:r,meta:{title:"经营管理"}},{path:"/myself",name:"myself",component:u,meta:{title:"我的"}}]},233:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={bread:"销售报表",activeLi:"staffSaleStatist",activeTab:"staffSaleStatist",regionOptions:[]},o={},r={setBread:function(e,t){e.bread=t},setActiveLi:function(e,t){e.activeLi=t},setActiveTab:function(e,t){e.activeTab=t},setRegionOptions:function(e,t){e.regionOptions=t}};t.default={common:{namespaced:!0,state:a,getters:o,mutations:r}}},234:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={userInfo:{}},o={},r={setUserInfo:function(e,t){e.userInfo=t}};t.default={login:{namespaced:!0,state:a,getters:o,mutations:r}}},28:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a="/agent/agent/web/";a="/agent/agent/web/";t.baseUrl=a,t.urls={BASE_URL:a,LOGIN_LOGIN:"login/login",PUBLIC_CAPTCHA_IMG:"public/captcha-img",PUBLIC_CAPTCHA_SMS:"public/captcha-sms",LOGIN_RESET_PASSWD:"login/reset-passwd",SALE_SALE_SHOP_STATISTICS:"sale/sale-shop-statistics",SALE_SALE_RECORD:"sale/sale-record",SALE_EMPLOYEE_SALELIST:"sale/employee-salelist",SHOP_LIST:"shop/list",SHOP_DETAIL:"shop/detail",SHOP_SHOP_EMPOWER_LIST:"shop/shop-empower-list",SHOP_SALE_UPDATE:"shop/sale-update",SHOP_SHOP_EMPOWER:"shop/shop-empower",EMPLOYEE_EMPLOYEE_LIST:"empower/empower-list",EMPLOYEE_EMPLOYEE_COUNT:"empower/empower-count",AGENT_APPLY_CREATE:"agent-apply/create",EMPLOYEE_EMPLOYEE_INFO:"empower/empower-info",EMPLOYEE_EMPLOYEE_ASSIGNED:"empower/empower-assigned",EMPLOYEE_EMPLOYE_ALLOCATE:"empower/empower-allocate",EMPLOYEE_EMPLOYE_RECYCLE:"empower/empower-recycle",EMPLOYEE_LIST_EMPLOYEE:"employee/list-employee",EMPLOYEE_ADD_EMPLOYEE:"employee/add-employee",EMPLOYEE_EDIT_EMPLOYEE_INFO:"employee/edit-employee",EMPLOYEE_DEL_EMPLOYEE:"employee/del-employee",AGENT_APPLY_LIST:"agent-apply/list",COMMON_REGION_LIST:"common/region-list",EMPLOYEE_ALL_EMPLOYEE:"employee/all-employee",EMPLOYEE_UPDATE_PASSWORD:"employee/update-password",LOG_LIST:"log/list",EMPLOYEE_GET_EMPLOYEE_INFO:"employee/get-employee-info",EMPLOYEE_UPDATE_INFO:"employee/update-info",EMPOWER_GET_EMPOWERNUM:"empower/get-empowernum"},t.noTokenReq=["login/login","public/captcha-img","public/captcha-sms","login/reset-passwd"],t.noTokenUrls=["/","/login","/forgetPasswd"]},297:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("router-view")},staticRenderFns:[]}},298:function(e,t){},299:function(e,t){},48:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(236),r=a(o),u=n(282),i=a(u);t.default={clone:function(e){return JSON.parse((0,r.default)(e))},formatTime:function(e,t){var n=t||"YYYY-MM-DD HH:mm:ss";return Moment(1e3*e).format(n)},formatMoney:function(e){return new Number(e).toFixed(2)},formatRegion:function(e,t,n){if(n.length){var a="",o="",r="",u="";return a=i.default.find(n,{province_id:parseInt(e)}),a?(o=a.province_name,(r=i.default.find(a.child,{city_id:parseInt(t)}))?(u=r.city_name,o+"-"+u):""):""}},formatEmployee:function(e){var t=[];return e.forEach(function(e){t.push({value:parseInt(e.user_id),label:e.username})}),t},randomValidateCode:function(){for(var e="qwertyuiopasdfghjklzxcvbnm0123456789".split(""),t=[],n=0;n<4;n++)t.push(e[parseInt(36*Math.random())]);return t.join("")},vuexReload:function(e){var t=sessionStorage.getItem("vuexData");if(t&&!function(e){for(var t in e)return!1;return!0}(JSON.parse(t))){var n=JSON.parse(t);for(var a in n)e.state[a]=n[a].state[a]}e.subscribe(function(e,t){var n=sessionStorage.getItem("vuexData"),a={};n&&(a=JSON.parse(n));var o=e.type.split("/"),u=o[0],i=e.payload,s=e.type;a[u]={payload:i,mutationWay:s,state:t},sessionStorage.setItem("vuexData",(0,r.default)(a))})}}}},[230]);