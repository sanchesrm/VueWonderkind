<template>
  <div id="app">
    <div class="leftside-menu lightgrayBackground">
      <div v-if="!edit">
        <div class="search-contacts">
          <div class="label lightgray">Contacts</div>
          <input placeholder="Search" />
        </div>
        <div class="contacts-list">
          <div v-for="(item, index) in this.contacts"> 
            <div v-if="item.lastName[0] != lastLetter" class="item-list lightgray letter">
              {{ lastLetter = item.lastName[0].toUpperCase() }}
            </div>
            <div class="item-list" v-on:click="selectContact(item, index)" :class="{lightgrayBackground:item.selected}">
              <span class="bold">{{ item.lastName }}</span>, {{ item.firstName }}
            </div>
          </div>
        </div>
        <div class="add-contact" v-on:click="addContact">
          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
          <label class="add-contact-label">ADD CONTACT</label>
        </div>
      </div>
    </div>
    <div class="main-content" v-if="selectedContact">
      <div class="header">
        <div v-if="edit">
          <div class="profile-picture">
            <input ref="fileInput" type="file" id="profilePicture-input" accept="image/*" @change="onFileChange">

            <img :src="selectedContact.profilePicture" onerror="">
            <img class="add-image-btn" v-on:click="selectImage">
          </div>
          <div class="contact-name">
            <input type="text" placeholder="Name" v-model="selectedContact.fullName" required>
          </div>
        </div>
        <div v-else>
          <div class="profile-picture">
            <img :src="this.selectedContact.profilePicture" onerror="">
          </div>
          <div class="contact-name">
            {{ this.selectedContact.fullName }}
          </div>
          <div class="buttons">
            <button v-on:click="editContact()">A</button>
            <button v-on:click="removeContact()">b</button>
          </div>
        </div>
      </div>
        <div class="body-content">
          <div v-if="edit">
            <div class="label bold lightgray">
              Email
            </div>
            <div class="label lightgray">
              <input type="email" placeholder="Email" v-model="selectedContact.email" required>
            </div>
            <div class="label bold lightgray">
              Mobile
            </div>
            <div class="label" v-for="(mobile, index) in this.selectedContact.mobile">
              <input type="text" placeholder="Phone" v-model="selectedContact.mobile[index]" required>
            </div>

            <div class="add-input-field lightgray" v-on:click="addInputField">
              Add input field
            </div>

          </div>
          <div v-else>
            <div class="label bold lightgray">
              Email
            </div>
            <div class="label lightgray">
              {{ this.selectedContact.email }}
            </div>
            <div class="label bold lightgray">
              Mobile
            </div>
            <div class="label lightgray" v-for="(phones, index) in this.selectedContact.mobile">
              {{ phones }}
            </div>
          </div>

        </div>
        <div class="save-contact" v-if="edit" v-on:click="saveChanges">
          <label class="save-contact-label">SAVE CHANGES</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueCookie from 'vue-cookies'


  export default {
    name: 'app',
    mounted: function () {
      this.contacts = JSON.parse(VueCookie.get('contacts'));
    },
    data () {
      return {
        contacts: {},
        edit: false,
        lastLetter: '',
        selectedContact: null,
        selectedIndex: null
      }
    },  
    methods: {
      selectContact: function(item, index) {
        if (this.selectedIndex != null) {
          this.contacts[this.selectedIndex].selected = false;
        }

        this.selectedContact = item;
        this.selectedContact.selected = true;
        this.selectedIndex = index;
      },
      editContact: function() {
        this.edit = true;
      },
      removeContact: function() {
        this.contacts.splice(this.selectedIndex, 1);
        VueCookie.set('contacts', JSON.stringify(this.contacts));
        this.selectedContact = null;
      },
      addInputField: function() {
        this.selectedContact.mobile.push("");
      },
      saveChanges: function() {
        this.edit = false;

        this.selectedContact.firstName = this.selectedContact.fullName.split(' ').slice(0, -1).join(' ');
        this.selectedContact.lastName = this.selectedContact.fullName.split(' ').slice(-1).join(' ');

        this.selectedContact.selected = false;         
        this.contacts[this.selectedIndex] = this.selectedContact;

        this.contacts.sort(function(a, b) {
          return a.lastName.localeCompare(b.lastName);
        });

        VueCookie.set('contacts', JSON.stringify(this.contacts));
        this.selectedContact = null;
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
          this.selectedContact.profilePicture = reader.result;
        }
      },
      addContact: function() {
        this.edit = true;
        console.log(this.contacts.length);
        this.selectedIndex = this.contacts.length;

        this.selectedContact = {fullName: "", firstName: "", lastName: "", profilePicture: "", mobile: [""], email:"", selected: true};
      }
    }
  }
</script>

<style scoped lang="less">
  #app {
    display: flex;
    display: -webkit-flex;
    text-align: center;
  }

  .lightgray {
    color: #5d647a;
  }

  .lightgrayBackground {
    background-color: rgba(93, 100, 122, 0.15);
  }

  .leftside-menu {
    position: relative;
    top: 0;
    width: 26rem;
    height: 100vh;
    border-right: 2px solid rgba(93, 100, 122, 0.3); 
    -webkit-flex: none;
    flex: none;

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

      input {
        height: 55px;
        width: 100%;
        box-sizing: border-box;
        border-radius: 12px;
        margin-top: 30px;
      }
    }

    .contacts-list {
      width: 100%;
      top: 200px;
      bottom: 40px;
      position: absolute;
      background-color: #fff;
      overflow-y: scroll;
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
      background-color: #5dbf49;
      color: #fff;
      bottom: 0;
      position: absolute;
      width: 100%;
      height: 50px;
      line-height: 50px;

      .add-contact-label {
        font-size: 18px;
        font-weight: 500;
        vertical-align: middle;
      }
    }
  }

  .main-content {
    background-color: #fff;
    flex-grow: 100;
    text-align: left;

    input {
      padding: 0 10px;
      color:  #5d647a;
    }

    .header {
      line-height: 150px;
      margin: 50px 15rem 0 15rem;

      .profile-picture {
        display: inline-block;
        
        img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          border: 1px solid #5d647a;
          z-index: 1;
        }

        img.add-image-btn {
          position: absolute;
          top: 50px;
          margin-left: 110px;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          border: 1px solid #5d647a;
          z-index: 100;
        }
      }

      .contact-name {
        position: absolute;
        display: inline-block;
        margin-left: 8rem;
        font-size: 60px;
        font-weight: 600;
      }

      .buttons {
        display: inline-block;
        float: right;
      }
    }

    .body-content {
      margin: 0 15rem;
      padding: 0 140px 0 140px; 

      .label {
        margin-top:10px;
        font-size: 20px;
        font-weight: 500;

        input, input::-webkit-input-placeholder {
          display: inline-block;
          width: 100%;
          height: 40px;
        }
      }
      .label.bold {
        padding-top: 15px;
        font-weight: 700;
      }

      .add-input-field {
        margin-top: 60px;
        font-size: 20px;
        font-weight: 600;
      }

    }

    #profilePicture-input {
      opacity: 0;
      position: absolute;
      top: 0;
    }

    .save-contact {
      background-color: #5dbf49;
      color: #fff;
      height: 50px;
      line-height: 50px;
      text-align: center;
      position: relative;
      position: fixed;
      bottom: 0;
      left: 26rem;
      right: 0;

      .save-contact-label {
        font-size: 18px;
        font-weight: 500;
        vertical-align: middle;
      }
    }

  }
</style>

<style src="normalize.css/normalize.css"></style>

<style>
  body {
    font-family: 'Poppins';
  }
  
  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-button {
    width: 15px;
    height:0px;
  }
  ::-webkit-scrollbar-track {
    background:#eee;
    border: thin solid lightgray;
    box-shadow: 0px 0px 3px #dfdfdf inset;
    border-radius:10px;
  }
  ::-webkit-scrollbar-thumb {
    background:#999;
    border: thin solid gray;
    border-radius:10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background:#7d7d7d;
  }
</style>