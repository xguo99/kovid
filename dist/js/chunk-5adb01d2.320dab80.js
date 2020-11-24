(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5adb01d2"],{"1e4d":function(e,s,t){"use strict";var n=t("5392"),r=t.n(n);r.a},"28e1":function(e,s,t){"use strict";var n=t("46a0"),r=t.n(n);r.a},"423c":function(e,s,t){},"46a0":function(e,s,t){},5392:function(e,s,t){},6911:function(e,s,t){},7769:function(e,s,t){"use strict";var n=t("423c"),r=t.n(n);r.a},"7f7f":function(e,s,t){var n=t("86cc").f,r=Function.prototype,i=/^\s*function ([^ (]*)/,o="name";o in r||t("9e1e")&&n(r,o,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(e){return""}}})},8370:function(e,s,t){"use strict";t.r(s);var n=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{attrs:{id:"user-settings"}},[t("div",{staticClass:"Map"},[t("router-link",{attrs:{id:"link",to:"/"}},[e._v("Kovid")])],1),e.isSignedIn?t("div",{staticClass:"signout"},[t("CustomerSignOut")],1):t("div",{staticClass:"signin-signup"},[t("CustomerSignIn"),t("CustomerSignUp")],1),e.success.length?t("div",{staticClass:"success-message",staticStyle:{"text-align":"center"}},e._l(e.success,(function(s){return t("div",{key:s.id},[e._v(e._s(s))])})),0):e._e(),e.errors.length?t("div",{staticClass:"error-message",staticStyle:{width:"250px"}},[t("b",[e._v("Please correct the following error(s):")]),t("ul",e._l(e.errors,(function(s){return t("li",{key:s.id},[e._v(e._s(s))])})),0)]):e._e()])},r=[],i=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"signup"},[t("form",{staticClass:"component",attrs:{id:"sign-up",method:"post"},on:{submit:function(s){return s.preventDefault(),e.signup(s)}}},[t("div",{staticClass:"header"},[e._v(" Sign Up ")]),t("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.username,expression:"username",modifiers:{trim:!0}}],attrs:{id:"username",type:"text",name:"username",placeholder:"User's name"},domProps:{value:e.username},on:{input:function(s){s.target.composing||(e.username=s.target.value.trim())},blur:function(s){return e.$forceUpdate()}}}),t("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.password,expression:"password",modifiers:{trim:!0}}],attrs:{id:"password",type:"text",name:"password",placeholder:"User's password"},domProps:{value:e.password},on:{input:function(s){s.target.composing||(e.password=s.target.value.trim())},blur:function(s){return e.$forceUpdate()}}}),t("input",{staticClass:"button",attrs:{type:"submit",value:"Sign Up"}})])])},o=[],u=t("bc3a"),a=t.n(u),c=t("56d7"),m={name:"CustomerSignUp",data:function(){return{username:"",password:""}},created:function(){},methods:{signup:function(){var e=this,s={username:this.username,password:this.password};a.a.post("/api/customer",s).then((function(){c["eventBus"].$emit("customer-signup-success",!0)})).catch((function(e){c["eventBus"].$emit("customer-signup-error",e.response.data.error)})).then((function(){e.resetForm()}))},resetForm:function(){this.username="",this.password=""},clearMessages:function(){var e=this;setInterval((function(){e.errors=[]}),5e3)}}},p=m,d=(t("b1a7"),t("2877")),l=Object(d["a"])(p,i,o,!1,null,"c67f7e32",null),f=l.exports,g=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"signin"},[t("form",{staticClass:"component",attrs:{id:"sign-in",method:"post"},on:{submit:function(s){return s.preventDefault(),e.signin(s)}}},[t("div",{staticClass:"header"},[e._v(" Sign In ")]),t("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.username,expression:"username",modifiers:{trim:!0}}],attrs:{id:"username",type:"text",name:"username",placeholder:"User's name"},domProps:{value:e.username},on:{input:function(s){s.target.composing||(e.username=s.target.value.trim())},blur:function(s){return e.$forceUpdate()}}}),t("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.password,expression:"password",modifiers:{trim:!0}}],attrs:{id:"password",type:"text",name:"password",placeholder:"User's password"},domProps:{value:e.password},on:{input:function(s){s.target.composing||(e.password=s.target.value.trim())},blur:function(s){return e.$forceUpdate()}}}),t("input",{staticClass:"button",attrs:{type:"submit",value:"Sign In"}})])])},v=[],h=(t("7f7f"),{name:"CustomerSignIn",data:function(){return{username:"",password:""}},created:function(){},methods:{signin:function(){var e=this,s={username:this.username,password:this.password};a.a.post("/api/customer/signin",s).then((function(e){c["eventBus"].$emit("customer-signin-success",e.data.name)})).catch((function(e){c["eventBus"].$emit("customer-signin-error",e.response.data.error)})).then((function(){e.resetForm()}))},resetForm:function(){this.username="",this.password=""},clearMessages:function(){var e=this;setInterval((function(){e.errors=[]}),5e3)}}}),w=h,$=(t("7769"),Object(d["a"])(w,g,v,!1,null,"2d5f2d34",null)),b=$.exports,S=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"signout"},[t("button",{on:{click:e.signOut}},[e._v("Sign Out")])])},C=[],_={name:"SignOut",methods:{signOut:function(){a.a.post("/api/customer/signout",{}).then((function(){c["eventBus"].$emit("customer-signout-success",{})})).catch((function(e){c["eventBus"].$emit("customer-signout-error",e.response)}))}}},y=_,x=(t("28e1"),Object(d["a"])(y,S,C,!1,null,"5ae3e1a8",null)),k=x.exports,I={name:"CustomerAccount",components:{CustomerSignUp:f,CustomerSignIn:b,CustomerSignOut:k},data:function(){return{isSignedIn:!1,success:[],errors:[]}},created:function(){var e=this,s=this.$cookie.get("auth");s&&(this.isSignedIn=!0),c["eventBus"].$on("customer-signup-success",(function(){e.success.push("Signup completed successfully."),e.clearMessages()})),c["eventBus"].$on("customer-signup-error",(function(s){e.errors.push(s),e.clearMessages()})),c["eventBus"].$on("customer-signin-success",(function(s){e.$cookie.set("auth",s),e.$cookie.set("account-type","customer"),e.isSignedIn=!0,e.success.push("Successfully signed in as ".concat(s,".")),"/"!=e.$router.path&&e.$router.push("/").catch((function(){})),e.clearMessages()})),c["eventBus"].$on("customer-signin-error",(function(s){e.errors.push(s),e.clearMessages()})),c["eventBus"].$on("customer-signout-success",(function(){e.$cookie.set("auth",""),e.$cookie.set("account-type",""),e.isSignedIn=!1,e.success.push("Successfully signed out."),e.clearMessages()})),c["eventBus"].$on("customer-signout-error",(function(s){e.errors.push(s),e.clearMessages()}))},methods:{clearMessages:function(){var e=this;setInterval((function(){e.success=[],e.errors=[]}),5e3)}}},U=I,B=(t("1e4d"),Object(d["a"])(U,n,r,!1,null,"6bdb9d33",null));s["default"]=B.exports},b1a7:function(e,s,t){"use strict";var n=t("6911"),r=t.n(n);r.a}}]);
//# sourceMappingURL=chunk-5adb01d2.320dab80.js.map