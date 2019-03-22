<template>
    <div class="text-center">
        <form class="form-center">
            <img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password" required>
            <div class="mb-3">
                <router-link :to="{ path: '/register' }">Register</router-link>
            </div>
            <h6 v-if="message" style="color:red">
                {{message}}
            </h6>
            <button class="btn btn-lg btn-primary btn-block" @click="onSubmit">Sign in</button>

            <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
        </form>

    </div>
</template>

<script>
    import auth from '../auth'
    export default {
        data() {
            return {
                email: null,
                password: null,
                message: null
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                this.message = null;
                auth.login(this.email, this.password).then( user => {
                    this.$router.push({path: '/' + user.role})
                }).catch( e => this.message = e);
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .form-center input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-center input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>
