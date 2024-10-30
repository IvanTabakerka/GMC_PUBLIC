<template>
    <b-modal :id="`changeUser_${page}`" centered title="Изменение данных">
        <b-form-group
        id="user_email_label"
        label="Email"
        label-for="user_email"
        label-cols="12"
        label-cols-lg="4"
        >
            <b-form-input id="user_email" trim v-model="userData.email"></b-form-input>
        </b-form-group>
        <b-form-group v-show="userId == $auth.user.id"
            id="user_pass_label"
            label="Старый пароль"
            label-for="user_pass"
            label-cols="12"
            label-cols-lg="4"
            >
            <b-form-input id="user_pass" trim v-model="userData.oldPassword"></b-form-input>
        </b-form-group>
        <b-form-group
            id="user_pass_label"
            label="Новый пароль"
            label-for="user_pass"
            label-cols="12"
            label-cols-lg="4"
            >
            <b-form-input id="user_pass" trim v-model="userData.password"></b-form-input>
        </b-form-group>
        <b-form-group
            id="user_pass_label"
            label="Повторите пароль"
            label-for="user_pass"
            label-cols="12"
            label-cols-lg="4"
            >
            <b-form-input id="user_pass_repeat" trim v-model="userData.repeatPassword"></b-form-input>
        </b-form-group>
        <b-form-group
            id="user_pass_label"
            label="Картинка"
            label-for="user_pass"
            label-cols="12"
            label-cols-lg="4"
            >
            <b-form-file
                id="file"
                ref="file"
                browse-text="Файл"
                placeholder="Перетащите файл сюда..."
                drop-placeholder="Сюда..."
                size="sm"
                v-on:change="croppie"
                ></b-form-file>
        </b-form-group>
        <client-only>
          <vue-croppie
              v-show="cropStatus"
              ref="croppieRef"
              :boundary="{height: 300}"
              :viewport="{width:230, height:230}"
              :enableResize="false"
          >
          </vue-croppie>
        </client-only>
        <template #modal-footer>
            <b-button squared @click="$bvModal.hide('changeUser_' + page)">Отменить</b-button>
            <b-button squared @click="updateUser()">Ок</b-button>
        </template>
    </b-modal>
</template>

<script>
  export default {
    data() {
      return {
        cropped: null,
        cropStatus: false,
        userData: {} 
      }
    },
    methods: {
      updateUser () {
        this.userData.userId = this.userId;
        if (!!this.userData.password && this.userData.password !== this.userData.repeatPassword) {
          this.$toast.show('Пароли не совпадают');
          return null;
        }
        if (this.cropStatus) {
          let options = {
            type: 'blob',
            size: {width: 230, height: 230},
            format: 'jpeg'
          };
          this.$refs.croppieRef.result(options, output => {
            this.cropped = this.croppieImage = output;
            let file = new File([this.croppieImage], 'userImage.jpeg', {type: 'image/jpeg', lastModified: Date.now()});
            this.$store.dispatch('account/update', {
              userdata: this.userData,
              file: file,
              page: this.page
            })
          });
        } else {
          this.$store.dispatch('account/update', {
            userdata: this.userData,
            file: false,
            page: this.page
          })
        }
        this.cropStatus = false;
        this.$bvModal.hide("changeUser_" + this.page)
      },
      croppie (e) {
        this.cropStatus = true;
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;

        var reader = new FileReader();
        reader.onload = e => {
          this.$refs.croppieRef.bind({
            url: e.target.result
          });
        };
        reader.readAsDataURL(files[0]);
      }
    },
    props: ['userId', 'page']
  }
</script>