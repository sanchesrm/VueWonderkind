<template>
	<div>
		<div class="search-contacts">
			<div class="label lightgray">Contacts</div>
			<input type="text" placeholder="Search" id="search" v-model="filterInput"/>
		</div>
		<div class="contacts-list">
			<div v-for="(item, index) in this.contacts"> 
				<div v-if="filterContact(item)">
					<div v-if="item.lastName[0] != lastLetter" class="item-list lightgray letter">
						{{ lastLetter = item.lastName[0].toUpperCase() }}
					</div>
					<div class="item-list" v-on:click="selectContact(index)" :class="{ lightgrayBackground: $route.params.contact_index == index }">
						<span class="bold">{{ item.lastName }}</span>, {{ item.firstName }}
					</div>
				</div>
			</div>
		</div>
		<button class="add-contact" v-on:click="addContact">               
			<div id="btn_container">
				<img src="../../static/add_contact_button.png" />
				<span class="btn-txt">ADD CONTACT</span>
			</div>
		</button>
	</div>
</template>

<script>
  import VueCookie from 'vue-cookies'
	import router from 'vue-router'

  export default {
    name: 'LeftSideMenu',
    mounted: function () {
      this.contacts = JSON.parse(VueCookie.get('contacts'));
    },
    data () {
      return {
        contacts: {},
        lastLetter: '',
				filterInput: "",
				selectedIndex: null
      }
    },
		watch: {
			'selectedIndex': {
				handler: function(val) { console.log('changed') },
						deep: false
				}
		},
		methods: {
      selectContact (index) {
				this.selectedIndex = index;
				this.$router.push({ path: `/contact/${index}` });
      },
			addContact () {
        this.$router.push({ path: '/addNewContact' });
      },
			filterContact (item) {
				return item.fullName.toLowerCase().indexOf(this.filterInput) !== -1;
			}
		}
	}
</script>

<style scoped lang="less">

  .lightgrayBackground {
    background-color: rgba(93, 100, 122, 0.15);
  }
	.search-contacts {
		height: 200px;
		top: 0;
		background-color: #fff;
		padding: 0px 25px;

		.label {
			display: block;
			text-align: left;
			padding-top: 55px;
			font-weight: 600;
			font-size: 40px;
		}

		input#search {
			height: 55px;
			width: 100%;
			box-sizing: border-box;
			border-radius: 12px;
			margin-top: 30px;
			padding: 10px;
			font-size: 26px;
		}

		input#search::placeholder{
			background-image: url('../../static/search_img.png');
			background-repeat: no-repeat;
			background-size: 40px 40px;
			background-position: 5rem center;
			height: 55px;
			line-height: 55px;
			text-indent: 8rem;   
		}

		input#search:focus{
			outline: none;
		}
	}

	.contacts-list {
		width: 100%;
		top: 200px;
		bottom: 40px;
		position: absolute;
		background-color: #fff;
		overflow-y: auto;
		text-align: left;

		.item-list {
			font-size: 20px;
			padding: 8px 0px 8px 30px;

			.letter {
				font-weight: 700;
			}

			.bold {
				font-weight: 600;
			}
		}

		.item-list.letter {      
			font-weight: 700;
		}
	}

	.add-contact {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: #5dbf49;
		color: #fff;
		border-style: none;

		#btn_container {
			img {
				width: 30px;
				height: 30px;
				background-size: cover;
				margin-right: 5px;    
				vertical-align: middle;
			}
			.btn-txt {
				font-size: 18px;
				font-weight: 500;
				vertical-align: middle;
			}
		}
	}

</style>