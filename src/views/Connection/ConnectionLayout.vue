<template>
    <div>
        <header class="material__header">
            <div class="flexbox-row space-between center flex flexfix">
                <button class="btn btn--secondary btn--circle material__header__back" @click="back()"><i class="material-icons md-18">arrow_back</i></button>
                <div class="material__header__title text-h2 text-ellipsis" v-if="connection">{{ connection.name }}</div>
            </div>
        </header>
        <connection-navigation
         v-if="!connection.error && !auth.error"></connection-navigation>
        <div class="material__body">
            <div class="material__container">
                <div v-if="!connection.error">
                    <router-view v-if="!auth.error"></router-view>
                    <connection-login
                        v-if="auth.error && auth.error.status == 401"
                        :connection="connection"
                        :auth="auth"
                        @cancel="back()"
                        @submit="login($event)">
                    </connection-login>
                </div>
                <error-status
                    v-if="connection.error"
                    :status="connection.error.status"
                    :message="connection.error.message">
                </error-status>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import Contextmenu from '@/components/contextmenu/Contextmenu.vue'
    import ErrorStatus from '@/components/error/ErrorStatus.vue'
    import ConnectionNavigation from '@/components/domain/connection/ConnectionNavigation.vue'
    import ConnectionLogin from '@/components/domain/connection/ConnectionLogin.vue'
    import { PropertyWatcher, SingleResourceWatcher } from '@/lib/watcher'
    import { PropertyChange } from '@wildebeest/repository'

    @Component({
        components: {
            ConnectionLogin,
            ConnectionNavigation,
            ErrorStatus
        }
    })
    export default class ConnectionLayout extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() repositories!: any
        @Prop() properties!: any

        public connection: any = null
        public auth: any = {}

        private watcher: any
        private authWatcher: any

        @Watch('$route.params.connectionId', { immediate: true })
        public onIdChange (value: string, oldValue: string): void {
            this.channel.dispatch({
                event: 'connection@open',
                data: value
            })
        }

        public created (): void {
            this.watcher = new PropertyWatcher((item: any) => {
                this.connection = item
            })
            this.watcher.watch(this.properties.connection)

            this.authWatcher = new PropertyWatcher((item: any) => {
                this.auth = item
            })
            this.authWatcher.watch(this.properties.auth)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
            this.authWatcher.stop()
            this.channel.dispatch({
                event: 'connection@close'
            })
        }

        public back (): void {
            this.$router.push('/')
        }

        public login (password: string): void {
            this.channel.dispatch({
                event: 'auth@access',
                data: {
                    body: {
                        username: this.connection.username,
                        password: password
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
