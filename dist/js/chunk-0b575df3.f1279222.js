(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b575df3"],{1544:function(s,e,t){"use strict";var n=t("80f0"),r=t.n(n);r.a},"445b":function(s,e,t){"use strict";var n=t("6d37"),r=t.n(n);r.a},"4ee6":function(s,e,t){"use strict";var n=t("970a"),r=t.n(n);r.a},"5beb":function(s,e,t){},"6d37":function(s,e,t){},"72c4":function(s,e,t){"use strict";var n=t("5beb"),r=t.n(n);r.a},"7f7f":function(s,e,t){var n=t("86cc").f,r=Function.prototype,o=/^\s*function ([^ (]*)/,i="name";i in r||t("9e1e")&&n(r,i,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(s){return""}}})},"80f0":function(s,e,t){},8370:function(s,e,t){"use strict";t.r(e);var n=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{attrs:{id:"user-settings"}},[t("div",{staticClass:"Map"},[t("router-link",{attrs:{id:"link",to:"/"}},[s._v("Kovid")])],1),t("div",{staticClass:"header"},[s._v(" Customer Login Page ")]),s.isSignedIn?t("div",{staticClass:"signout"},[t("CustomerSignOut")],1):t("div",{staticClass:"signin-signup"},[t("CustomerSignIn"),t("CustomerSignUp")],1),t("br"),t("div",{staticClass:"bot"},[t("router-link",{attrs:{to:"/business"}},[s._v("Not a Cusotmer? SignIn as Business")])],1),s.success.length?t("div",{staticClass:"success-message",staticStyle:{"text-align":"center"}},s._l(s.success,(function(e){return t("div",{key:e.id},[s._v(s._s(e))])})),0):s._e(),s.errors.length?t("div",{staticClass:"error-message",staticStyle:{width:"250px"}},[t("b",[s._v("Please correct the following error(s):")]),t("ul",s._l(s.errors,(function(e){return t("li",{key:e.id},[s._v(s._s(e))])})),0)]):s._e()])},r=[],o=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"signup"},[t("form",{staticClass:"component",attrs:{id:"sign-up",method:"post"},on:{submit:function(e){return e.preventDefault(),s.signup(e)}}},[t("div",{staticClass:"header"},[s._v(" Sign Up ")]),t("input",{directives:[{name:"model",rawName:"v-model.trim",value:s.username,expression:"username",modifiers:{trim:!0}}],attrs:{id:"username",type:"text",name:"username",placeholder:"User's name"},domProps:{value:s.username},on:{input:function(e){e.target.composing||(s.username=e.target.value.trim())},blur:function(e){return s.$forceUpdate()}}}),t("input",{directives:[{name:"model",rawName:"v-model.trim",value:s.password,expression:"password",modifiers:{trim:!0}}],attrs:{id:"password",type:s.passwordType,name:"password",placeholder:"User's password"},domProps:{value:s.password},on:{input:function(e){e.target.composing||(s.password=e.target.value.trim())},blur:function(e){return s.$forceUpdate()}}}),t("div",[t("input",{attrs:{type:"checkbox"},on:{click:s.showPassword}}),s._v(" Show Password")]),t("br"),t("input",{staticClass:"button",attrs:{type:"submit",value:"Sign Up"}})])])},i=[],a=t("bc3a"),u=t.n(a),c=t("56d7"),p={name:"CustomerSignUp",data:function(){return{username:"",password:"",passwordType:"password"}},created:function(){},methods:{signup:function(){var s=this,e={username:this.username,password:this.password};u.a.post("/api/customers",e).then((function(){c["eventBus"].$emit("customer-signup-success",!0)})).catch((function(s){c["eventBus"].$emit("customer-signup-error",s.response.data.error)})).then((function(){s.resetForm()}))},showPassword:function(){"password"==this.passwordType?this.passwordType="text":this.passwordType="password"},resetForm:function(){this.username="",this.password=""},clearMessages:function(){var s=this;setInterval((function(){s.errors=[]}),5e3)}}},d=p,m=(t("4ee6"),t("2877")),l=Object(m["a"])(d,o,i,!1,null,"37021fa4",null),f=l.exports,g=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"signin"},[t("form",{staticClass:"component",attrs:{id:"sign-in",method:"post"},on:{submit:function(e){return e.preventDefault(),s.signin(e)}}},[t("div",{staticClass:"header"},[s._v(" Sign In ")]),t("input",{directives:[{name:"model",rawName:"v-model.trim",value:s.username,expression:"username",modifiers:{trim:!0}}],attrs:{id:"username",type:"text",name:"username",placeholder:"User's name"},domProps:{value:s.username},on:{input:function(e){e.target.composing||(s.username=e.target.value.trim())},blur:function(e){return s.$forceUpdate()}}}),t("input",{directives:[{name:"model",rawName:"v-model.trim",value:s.password,expression:"password",modifiers:{trim:!0}}],attrs:{id:"password",type:s.passwordType,name:"password",placeholder:"User's password"},domProps:{value:s.password},on:{input:function(e){e.target.composing||(s.password=e.target.value.trim())},blur:function(e){return s.$forceUpdate()}}}),t("div",[t("input",{attrs:{type:"checkbox"},on:{click:s.showPassword}}),s._v(" Show Password")]),t("br"),t("input",{staticClass:"button",attrs:{type:"submit",value:"Sign In"}})])])},v=[],h=(t("7f7f"),{name:"CustomerSignIn",data:function(){return{username:"",password:"",passwordType:"password"}},created:function(){},methods:{signin:function(){var s=this,e={username:this.username,password:this.password};u.a.post("/api/customers/signin",e).then((function(s){c["eventBus"].$emit("customer-signin-success",s.data.name)})).catch((function(s){c["eventBus"].$emit("customer-signin-error",s.response.data.error)})).then((function(){s.resetForm()}))},showPassword:function(){"password"==this.passwordType?this.passwordType="text":this.passwordType="password"},resetForm:function(){this.username="",this.password=""},clearMessages:function(){var s=this;setInterval((function(){s.errors=[]}),5e3)}}}),w=h,b=(t("445b"),Object(m["a"])(w,g,v,!1,null,"98740616",null)),y=b.exports,C=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"signout"},[t("button",{on:{click:s.signOut}},[s._v("Sign Out")])])},S=[],$={name:"SignOut",methods:{signOut:function(){u.a.post("/api/customers/signout",{}).then((function(){c["eventBus"].$emit("customer-signout-success",{})})).catch((function(s){c["eventBus"].$emit("customer-signout-error",s.response)}))}}},_=$,k=(t("72c4"),Object(m["a"])(_,C,S,!1,null,"2a060402",null)),x=k.exports,I={name:"CustomerAccount",components:{CustomerSignUp:f,CustomerSignIn:y,CustomerSignOut:x},data:function(){return{isSignedIn:!1,success:[],errors:[]}},created:function(){var s=this,e=this.$cookie.get("auth");e&&(this.isSignedIn=!0),c["eventBus"].$on("customer-signup-success",(function(){s.success.push("Signup completed successfully."),s.clearMessages()})),c["eventBus"].$on("customer-signup-error",(function(e){s.errors.push(e),s.clearMessages()})),c["eventBus"].$on("customer-signin-success",(function(e){s.$cookie.set("auth",e),s.$cookie.set("account-type","customer"),s.isSignedIn=!0,s.success.push("Successfully signed in as ".concat(e,".")),"/"!=s.$router.path&&s.$router.push("/").catch((function(){})),s.clearMessages()})),c["eventBus"].$on("customer-signin-error",(function(e){s.errors.push(e),s.clearMessages()})),c["eventBus"].$on("customer-signout-success",(function(){s.$cookie.set("auth",""),s.$cookie.set("account-type",""),s.isSignedIn=!1,s.success.push("Successfully signed out."),s.clearMessages()})),c["eventBus"].$on("customer-signout-error",(function(e){s.errors.push(e),s.clearMessages()}))},methods:{clearMessages:function(){var s=this;setInterval((function(){s.success=[],s.errors=[]}),5e3)}}},B=I,U=(t("1544"),Object(m["a"])(B,n,r,!1,null,"9da5db4a",null));e["default"]=U.exports},"970a":function(s,e,t){}}]);
//# sourceMappingURL=chunk-0b575df3.f1279222.js.map