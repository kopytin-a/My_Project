<template>
    <div class="dialog" v-if="show" @click="hidePopup">
        <div class="main-form" @click.stop>
            <h3 class="h">Новый пользователь</h3>
            <div class="form-group">
                <label>Введите имя:</label>
                <input
                    @focus="isActiveName = false" 
                    v-model.trim="user.first_name"
                    type="text" 
                    class="form-control" 
                    :class="{input: isActiveName}"
                    placeholder="Name"
                />
                <h6 v-if="isActiveName" :class="{error: isActiveName}">Введите имя!</h6>
            </div>

            <div class="form-group">
                <label>Введите фамилию:</label>
                <input
                    v-model.trim="user.last_name"
                    type="text" 
                    class="form-control"
                    placeholder="Surname"
                />
            </div>

            <div class="form-group">
                <label>Введите номер телефона:</label>
                <input 
                    v-model.trim="user.phone"
                    type="text" 
                    class="form-control" 
                    placeholder="Phone"
                />
            </div>

            <div class="form-group">
                <label>Введите email:</label>
                <input 
                    @focus="isActiveEmail = false" 
                    v-model.trim="user.email"
                    type="email" 
                    class="form-control" 
                    :class="{input: isActiveEmail}"
                    placeholder="Email"
                />
                <h6 v-if="isActiveEmail" :class="{error: isActiveEmail}">Введите email!</h6>
            </div>

            <div class="form-group">
                <label>Введите пароль:</label>
                <input
                    @focus="isActivePassword = false"
                    v-model.trim="user.password"
                    type="password" 
                    class="form-control" 
                    :class="{input: isActivePassword}"
                    placeholder="Password"
                />
                <h6 v-if="isActivePassword" :class="{error: isActivePassword}">Введите пароль! </h6>
            </div>

            <div class="form-group">
                <button class="btn custom-btn btn-5" @click="createUsers">Добавить</button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            user: {
                id: 13,
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                phone: '',
            },
            isActiveName: false,
            isActiveEmail: false,
            isActivePassword: false
        }
    },
    methods: {
        createUsers() {
            if (this.user.first_name === '' || this.user.email === '' || this.user.password === '') {
                this.isActiveEmail = true
                this.isActiveName = true
                this.isActivePassword = true

                if(this.user.first_name !== '') 
                    this.isActiveName = false

                if (this.user.email !== '') 
                    this.isActiveEmail = false

                if(this.user.password !== '') 
                    this.isActivePassword = false
            } else {
                this.$emit('create', this.user)
                this.$emit('update:show', false)
                this.user = {
                    id: ++this.user.id,
                    email: '',
                    password: '',
                    first_name: '',
                    last_name: '',
                    phone: ''
                }
            }
        },
        hidePopup() {
            this.$emit('update:show', false)
            this.isActiveName = false,
            this.isActiveEmail =  false,
            this.isActivePassword = false
            this.user = {
                id: this.user.id,
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                phone: ''
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
    height: 600px;
    margin: 2% auto;
    padding: 10px 20px;
    border-radius: 10px;
    background:#009edf;
    color: #FFF;
    text-shadow: none;
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
