<template>
    <div class="dialog" v-if="show">
        <div class="main-form">
            <h3 class="h">Авторизация</h3>
            <div class="form-group">
                <label>Введите Login:</label>
                <input
                    @focus="isActiveLogin = false, errorOppen = false" 
                    v-model.trim="loginPanel"
                    type="text" 
                    class="form-control" 
                    :class="{input: isActiveLogin}"
                    placeholder="Login"
                />
                <h6 v-if="isActiveLogin" :class="{error: isActiveLogin}">Введите Login!</h6>
            </div>

            <div class="form-group">
                <label>Введите пароль:</label>
                <input
                    @focus="isActivePassword = false, errorOppen = false"
                    v-model.trim="passwordPanel"
                    type="password" 
                    class="form-control" 
                    :class="{input: isActivePassword}"
                    placeholder="Password"
                />
                <h6 v-if="isActivePassword" :class="{error: isActivePassword}">Введите пароль!</h6>
                <h6 v-if="errorOppen" :class="{error: errorOppen}">Неверный login или пароль!</h6>
            </div>

            <div class="form-group">
                <button class="btn custom-btn btn-5" @click="createUsers">Вход</button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginPanel: '',
            passwordPanel: '',
            login: 'admin',
            password: 'admin',
            show: true,
            isActiveLogin: false,
            isActivePassword: false,
            errorOppen: false,
        }
    },
    methods: {
        createUsers() {
            if(this.loginPanel === this.login && this.passwordPanel === this.password) {
                this.show = false
                this.$router.push('/UserPage')
            } else if (this.loginPanel === '' || this.passwordPanel === '') {
                this.isActiveLogin = true
                this.isActivePassword = true
            } else if(this.loginPanel === this.login && this.passwordPanel === '') {
                this.isActivePassword = true
            } else if (this.loginPanel === '' && this.passwordPanel === this.password) {
                this.isActiveLogin = true
            }

            if (this.loginPanel !== '') 
                this.isActiveLogin = false

            if (this.passwordPanel !== '') 
                this.isActivePassword = false

            if (this.loginPanel !== this.login && this.loginPanel !=='' 
            && this.passwordPanel !== this.password && this.passwordPanel !== '') {
                this.errorOppen = true
            } else if (this.loginPanel === this.login && this.passwordPanel !==''  && this.passwordPanel !== this.password 
            || this.passwordPanel === this.password && this.loginPanel !== '' && this.loginPanel !== this.login) {
                this.errorOppen = true
            } else {
                this.errorOppen = false
            }
        }
    }
}
</script>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}
 .form-group{
     margin-bottom: 15px;
}
label{
    margin-bottom: 5px;
}
.h {
    text-align: center;
}
.form-control {
    height: auto;
    padding: 8px 12px;
}
.main-form{
    width: 400px;
    height: 320px;
    margin: 10% auto;
    padding: 10px 20px;
    border-radius: 10px;
    background:#009edf;
    color: #FFF;
}
.custom-btn {
    width: 130px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    margin: 0 auto;
    display: block;
    outline: none;
}
.btn-5 {
    width: 200px;
    height: 40px;
    padding: 0;
    border: none;
    background: linear-gradient(0deg, rgba(255,151,0,1) 0%, rgba(251,75,2,1) 100%);
}
.btn-5:hover {
    font-weight: bold;
    color: rgba(7,187, 7);
    background: white;
    box-shadow:none;
}
.btn-5:before,
.btn-5:after{
    content:'';
    position:absolute;
    top:0;
    right:0;
    height:2px;
    width:0;
    background: rgba(7,187, 7);
}
.btn-5:after{
    right:inherit;
    top:inherit;
    left:0;
    bottom:0;
}
.btn-5:hover:before,
.btn-5:hover:after{
    width:100%;
    transition:800ms ease all;
}
.error{
    color: red;
}
.input{
    border: 2px solid red;
}
</style>
