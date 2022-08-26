<template>
    <div class="app">
        <button class="btn custom-btn exit" @click="exit">Выход</button>
        <input class="input" v-model="searchQuery" placeholder="Поиск (не менее 3х символов)..."/>
        <div v-if="sortedAndSearchedPosts.length > 0">
            <div v-if="searchQuery.length > 0">
                <accordion-menu v-if="searchQuery.length > 2" :users="sortedAndSearchedPosts"/>
                <h5 class="h" v-else>Не менее 3х символов!</h5>
            </div>
            <div v-else>
                <accordion-menu :users="sortedAndSearchedPosts"/>
            </div>
        </div>
        <h2 class="h" v-else>Пользователь не найден!</h2>
        <div class="page-wrapper">
           <paginate
                v-model="page"
                :page-count="totalPages"
                @click="changePage(page)"
                :prev-text="'Назад'"
                :next-text="'Вперед'"
            />
        </div>
        <div>
            <button class="btn custom-btn btn-5" @click="showPopup">Новый пользователь</button>
            <popup v-model:show="popupVisible" @create="createUsers"></popup>
        </div>
    </div>
</template>

<script>
import AccordionMenu from '@/components/AccordionMenu'
import Popup from '@/components/Popup'
import Paginate from 'vuejs-paginate-next'
import axios from 'axios'
export default {
    components: {
        AccordionMenu,
        Paginate,
        Popup,
    },
    data() {
        return {
            users: [],
            searchQuery: '',
            page: 1,
            limit: 6,
            totalPages: 0,
            phoneList: [ 
                88505553535, 89046398745, 89541239867, 89006834572, 
                89647589687, 89314568789, 88457569248, 83645984231,
                89002015869, 81061234782, 89116580234, 89120000456
                ],
            popupVisible: false,
        }
    },
    methods: {
        changePage(page) {
            this.page = page
            this.fetchUser()
        },
        showPopup() {
            this.popupVisible = true
        },
        createUsers(user) {
            axios.post('https://reqres.in/api/users', user)
                .then(response => {
                    // this.users.unshift(response.data) тестирование!!!
                    console.log(response)
                })
                .catch(error => {
                    alert(error)
                })
        },
        async fetchUser() {
            try {
                const result = await axios.get('https://reqres.in/api/users',{
                    params: {
                        page: this.page,
                        per_page: this.limit,
                    }
                })
                this.totalPages = result.data.total_pages
                this.users = result.data.data
                this.users.forEach(item => {
                    item.phone = this.phoneList[item.id - 1]
                })
            } catch (e) {
                alert('Ошибка')
            }
        },
        exit() {
            this.$router.push('/')
        }
    },
    mounted() {
        this.fetchUser()
    },
    computed: {
        sortedAndSearchedPosts() {
            return this.users.filter(user => (user.first_name + ' ' + user.last_name).toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    }
}
</script>

<style scoped>
 @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
.app {
    padding: 20px;
}
.h {
    padding: 10px;
}
.input {
    width: 100%;
    border: 1px solid black;
    padding: 10px 15px ;
    margin-top: 15px;
}
.page-wrapper {
    display: flex;
    margin-top: 15px;
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
  display: inline-block;
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
  color: rgba(7,187, 7);
  background: transparent;
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

.exit {
  width: 60px;
  height: 30px;
  position: absolute;
  top: 2px;
  right: 20px;
  padding: 0;
  border: none;
  background: linear-gradient(0deg, red, red 100%);
}
.exit:hover {
  color: red;
  background: transparent;
  box-shadow:none;
}
.exit:before,
.exit:after{
  content:'';
  position:absolute;
  top: 25px;
  right:0;
  height:2px;
  width:0;
  background: red;
}
.exit:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
.exit:hover:before,
.exit:hover:after{
  width:100%;
  transition:800ms ease all;
}
</style>