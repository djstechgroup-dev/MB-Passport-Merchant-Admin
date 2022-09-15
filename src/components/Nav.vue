<template>

    <nav>
        <div style="flex: 1;">
            <div v-for="route in navRoutes" :key="route.name" class="nav-item">
                <router-link :to="route.path">
                    <span>{{route.meta.label}}</span>
                </router-link>
            </div>
        </div>
        

        <div class="nav-logout">
            <button class="btn-logout" v-if="isLaoding" disabled>Loading...</button>
            <button class="btn-logout" v-else @click="logout">LOGOUT</button>
        </div>
    </nav>

</template>

<script>
import {computed} from 'vue'
import useSignout from '../composables/useSignout'
import router from './../router'

export default {
    setup() {

        const {isLaoding, error, signOut} = useSignout()

        const navRoutes = computed(() => {
            const merchantRoutes = router.options.routes.filter(item => item.name === 'merchant')[0]
            return merchantRoutes.children.filter(item => item.meta.display)
        })

        const logout = async () => {

            const isConfirmed = confirm('Are you sure?')

            if(isConfirmed) {
                await signOut()
                router.push('/login')
            }

            return
            
        }

        return {
            navRoutes,
            logout,
            isLaoding,
            error
        }
    }
}
</script>

<style scoped>
    nav {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        min-height: 100%;
    }

    a {
        display: block;
        color: black;
        text-decoration: none;
        padding: 10px 0;
        width: 100%;
        height: 100%;
    }

    .nav-item {
        width: 100%;
        font-size: 1.3rem;
        border-bottom: 2px solid #000;
    }

    .nav-item:hover, .btn-logout:hover {
        color: #fff;
       background-color: #0d47aa;
    }

    .nav-item:hover a {
        color: #fff;
    }

    .btn-logout {
        border-top: 2px solid #000;
        outline: none;
        background: none;
        width: 100%;
        height: 100%;
        padding: 10px 0;
    }

</style>