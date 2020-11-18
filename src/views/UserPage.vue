<template>
<div>
	<div v-if='userExists'>
    <div class='user-page-container'>
			<br>
      <h1> {{this.$route.params.username}}'s Page </h1>
    </div>

    <div class='user-page-container'>
      <div v-if = "username" >
        <div v-if = "!mypage">
          <button v-on:click='sendFollow' class="btn btn-primary">
            <div v-if='followed'>
            Followed!
            </div>
            <div v-else>
            Follow
            </div>
          </button>
        </div>
      </div>
    </div>


    <div class = "account-setting">  
        <div v-if="mypage">
          <div class="btn-group" role="group" aria-label="Account Setting">
							<button type="button" class="btn btn-secondary"
							v-on:click='toggleUpdateUsernane'>Change Username
							</button>
							<button type="button" class="btn btn-secondary"
							v-on:click='toggleUpdatePassword'>Change Password
							</button>
							<button type="button" class="btn btn-danger" 
							v-on:click="toggleDeleteUser">Delete My Account
							</button>
          </div>
          
        </div>
    </div>
    <br>
    <div v-if ='viewChangeName'>
            <ChangeUsername/>
    </div>
    <div v-if ='viewChangePassword'>
            <ChangePassword/>
    </div>
    <div v-if ='viewDeleteUser'>
            <DeleteUser/>
    </div>
		<div class="freets-container">
			<FreetContainer :freets="freets"/>
		</div>
  </div>
  <div v-else>
		<div class='user-page-container'>
			<br>
      <h1> User {{this.$route.params.username}} does not exist</h1>
    </div>
	</div>
</div>

</template>

<script>
import axios from "axios";
import ChangeUsername from "../components/ChangeUsername"
import ChangePassword from "../components/ChangePassword"
import DeleteUser from "../components/DeleteUser"
import DisplayUserPost from "../components/DisplayUserPost"
import FreetContainer from "../components/FreetContainer";
import { eventBus } from "../main";

export default {
  name: "account",
  watch: {
    $route(to, from) {
      // react to route changes...
      if(to!=from){
				this.$router.push({name: 'user', params: { username: this.username }});
				eventBus.$emit("user-status-update");
      }
    }},
  data() {
		return {
      username: this.$cookie.get('user-auth') ? this.$cookie.get('user-auth') : "",
			userExists: true,
			mypage: "",
      myfollowing: [],
      followed: "",
      viewChangeName:false,
      viewChangePassword:false,
			viewDeleteUser:false,
			freets: [],
		}
  },
  components: {
		axios,
    eventBus,
    ChangeUsername,
    ChangePassword,
    DisplayUserPost,
		DeleteUser,
		FreetContainer
  },
  created: function () {
    this.getFollow();
		this.getMyPage();
		this.updateFeed();
    eventBus.$on("user-status-update", () => {
      this.username = this.$cookie.get('user-auth') ? this.$cookie.get('user-auth') : "";
      this.updateFeed();
		});
		eventBus.$on("freet-update", () => {
      this.updateFeed();
    });
  },
  methods:{
    getFollow: function(){
      axios.get('/api/users/following')
          .then((res) => {
            this.myfollowing= res.data.following;
            let index=0;
            this.followed=false;
            while(index<this.myfollowing.length){
              if(this.myfollowing[index]["username"]==this.$route.params.username){
                this.followed=true;
              }
              index++;
            } 
          })
    },
    sendFollow: function(){
        const postBody = {username: this.$route.params.username};
        axios.post('/api/users/follow/', postBody)
          .catch((err) => {
            alert(err.response.data.error);
          })
        this.getFollow();
    },
    getMyPage:function(){
      this.mypage=this.$cookie.get('user-auth') == this.$route.params.username;
    },
    toggleUpdateUsernane:function(){
      this.viewChangeName=!this.viewChangeName;
      this.viewChangePassword=false;
      this.viewDeleteUser=false;
    },
    toggleUpdatePassword:function(){
      this.viewChangePassword=!this.viewChangePassword;
      this.viewChangeName=false;
      this.viewDeleteUser=false;
    },
    toggleDeleteUser:function(){
      this.viewDeleteUser= !this.viewDeleteUser;
      this.viewChangePassword=false;
      this.viewChangeName=false;
		},
		updateFeed: function() {
      // Populate the freet feed with all followed freets,
      // if user isn't following anyone, give all freets
			const postbody={author:this.$route.params.username}
			axios.post("/api/freets/author",postbody)
        .then((res) => {
          this.freets = res.data.message;
        })
        .catch((err) => {
					if (err.response.status == 404) {
						this.userExists = false;
					} else {
						alert(err.respose.data.error);
					}
					
        }) 
		} 

  }  
};
</script>

<style scoped>
  .user-page-container {
  text-align: center;
}
  .account-setting{
  text-align: center; 
	}
	.freets-container{
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: left;
	}
</style>
