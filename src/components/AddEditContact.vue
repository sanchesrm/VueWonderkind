<template>
	<div>
		<div class="header">
			<div class="profile-picture">
				<input ref="fileInput" type="file" id="profilePicture-input" accept="image/*" @change="onFileChange">

				<img class="img-to-edit":style="{ backgroundImage: 'url(' + profilePicture + '), url(../../static/profile_picture.png)', backgroundSize: 'cover' }" /> 
				<img class="add-image-btn" v-on:click="selectImage">
			</div>
			<div class="contact-name">
				<input type="text" placeholder="Name" v-model="fullName">
			</div>
		</div>
		<div class="body-content">
			<div class="label bold lightgray">
				Email
			</div>
			<div class="label lightgray">
				<input type="email" placeholder="Email" v-model="email">
			</div>
			<div class="label bold lightgray">
				Mobile
			</div>
			<div class="label" v-for="(mobilePhone, index) in this.mobile">
				<input type="text" placeholder="Phone" v-model="mobile[index]">
			</div>

			<div class="add-input-field lightgray" v-on:click="addInputField">
				Add input field
			</div>

			<div v-if="errors.length" class="errors">
				<span><b>Error while saving:</b></span>
				<ul>
					<li v-for="error in errors">{{ error }}</li>
				</ul>
			</div>
		</div>
		<div class="save-contact" v-on:click="saveChanges">
			<label class="save-contact-label">SAVE CHANGES</label>
		</div>
	</div>
</template>

<script>
  import VueCookie from 'vue-cookies'

  export default {
		name: 'AddEditContact',
		created () {
			this.updateContact();
		},
		data () {
			return {
				errors: [],
				profilePicture: "",
				fullName: "",
				email: "",
				mobile: [""],
				selectedContact: {}
			}
		},
		methods: {
			updateContact () {
				console.log(this.$route.params.contact_index);
				if (this.$route.params.contact_index) {
					let selectedIndex =  this.$route.params.contact_index;
					let contacts = JSON.parse(VueCookie.get('contacts'));
					this.profilePicture = contacts[selectedIndex].profilePicture;
					this.fullName = contacts[selectedIndex].fullName;
					this.email = contacts[selectedIndex].email;
					this.mobile = contacts[selectedIndex].mobile;
				}
			},
			addInputField: function() {
        this.mobile.push("");
      },
      saveChanges: function() {
        if (!this.fullName) {
          this.errors.push("Name Required");
        }
        if(this.email && !this.validEmail(this.email)) {
          this.errors.push("Valid email required.");        
        }

        if (this.errors.length) {
          return;
        }

        this.errors = [];
				
				let uuidForProfilePicture = this.uuidv4();
				console.log(this.profilePicture);
				sessionStorage.setItem(uuidForProfilePicture, this.profilePicture);

				let selectedIndex;
				let contacts = JSON.parse(VueCookie.get('contacts'))
				
				if (this.$route.params.contact_index) {
					selectedIndex = this.$route.params.contact_index;
					
				} else {
					selectedIndex = contacts.length;
					contacts.push({});
				}

				contacts[selectedIndex].profilePicture = uuidForProfilePicture;
				contacts[selectedIndex].fullName = this.fullName;
				contacts[selectedIndex].firstName = this.fullName.split(' ').slice(0, -1).join(' ');
				contacts[selectedIndex].lastName = this.fullName.split(' ').slice(-1).join(' ');
				contacts[selectedIndex].email = this.email;
				contacts[selectedIndex].mobile = this.mobile;
				
        contacts.sort(function(a, b) {
          return a.lastName.localeCompare(b.lastName);
        });

				console.log(contacts);

        VueCookie.set('contacts', JSON.stringify(contacts), -1, "/");

				this.$router.push({ path: '/' });
      },
      validEmail:function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      selectImage: function () {
        this.$refs.fileInput.click()
      },
      onFileChange: function(e, prefill) {

        e.preventDefault();

        var reader = new FileReader();
        var file = e.target.files[0];

        reader.readAsDataURL(file)
        reader.onloadend = () => {
          this.profilePicture = reader.result;
        }
      },
			uuidv4 () {
				return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
					(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
				)
			}
		}
	}
</script>

<style lang="less" src="./mainContent.less" />