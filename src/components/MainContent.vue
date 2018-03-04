<template>
	<div>
		<div v-if="$route.params.contact_index < contacts.length">
			<div class="header">
				<div class="profile-picture">
					<img :style="{ backgroundImage: 'url(' + profilePicture  + '), url(../../static/profile_picture.png)', backgroundSize: 'cover' }" /> 
				</div>
				<div class="contact-name">
					{{ fullName }}
				</div>
				<div class="buttons">
					<button v-on:click="editContact()" class="edit-contact-button" />
					<button v-confirm="{ok: removeContact, cancel: '', message: 'Are you sure you want to delete contact?'}" class="delete-contact-button" />
				</div>
			</div>
			<div class="body-content">
				<div class="label bold lightgray">
					Email
				</div>
				<div class="label lightgray">
					{{ email }}
				</div>
				<div class="label bold lightgray">
					Mobile
				</div>
				<div class="label lightgray" v-for="(phones, index) in mobile">
					{{ phones }}
				</div>
			</div>
		</div>
		<div v-else>
			This contact id doesn't exist
		</div>
	</div>
</template>

<script>
  import VueCookie from 'vue-cookies'

  export default {
		name: 'MainContent',
		created () {
			this.contacts = JSON.parse(VueCookie.get('contacts'));
			this.updateContact();
		},
		data () {
			return {
				contacts: {},
				profilePicture: "",
				fullName: "",
				email: "",
				mobile: []
			}
		},
		methods: {
			updateContact () {
				let selectedIndex =  this.$route.params.contact_index;

				this.profilePicture = sessionStorage.getItem(this.contacts[selectedIndex].profilePicture);
				this.fullName = this.contacts[selectedIndex].fullName;
				this.email = this.contacts[selectedIndex].email;
				this.mobile = this.contacts[selectedIndex].mobile;
			},
			editContact () {
				this.$router.push({ path: `/edit/${this.$route.params.contact_index}` });
      },
			removeContact () {
				let selectedIndex =  this.$route.params.contact_index;
        this.contacts.splice(selectedIndex, 1);
        VueCookie.set('contacts', JSON.stringify(this.contacts), -1, "/");
				this.$router.push({ path: '/' });
      }
		}
	}
</script>

<style lang="less" src="./mainContent.less" />
	