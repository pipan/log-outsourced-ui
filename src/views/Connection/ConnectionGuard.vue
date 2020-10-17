<template>
    <div>
        <router-view
            :connection="connection"
            v-if="connection && !auth.error"></router-view>
        <div class="material__body" v-if="!connection || auth.error">
            <div class="material__container">
                <connection-login
                    v-if="connection && auth.error && auth.error.status == 401"
                    :connection="connection"
                    :auth="auth"
                    @cancel="back()"
                    @submit="login($event)">
                </connection-login>
                <error-status
                    v-if="!connection"
                    status="404"
                    message="Connection not found">
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
    import ConnectionLogin from '@/components/domain/connection/ConnectionLogin.vue'
    import { PropertyWatcher, SingleResourceWatcher } from '@/lib/watcher'
    import { PropertyChange } from '@wildebeest/repository'

    @Component({
        components: {
            ConnectionLogin,
            ErrorStatus
        }
    })
    export default class ConnectionGuard extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() store!: any

        public connection: any = null
        public connectionProperty: Channel<any> = new ProxyChannel()
        public auth: any = {}

        private watcher = new SingleResourceWatcher()
        private authWatcher: any

        @Watch('$route.params.connectionId', { immediate: true })
        public onIdChange (value: string, oldValue: string): void {
            this.watcher.withId(value)
            this.channel.dispatch({
                event: 'connection@open',
                data: value
            })
        }

        public created (): void {
            this.connectionProperty.connectFn((item: any) => {
                this.connection = item
            })
            this.watcher.withRepository(this.store.connections)
                .withBinding(this.connectionProperty)

            this.authWatcher = new PropertyWatcher((item: any) => {
                this.auth = item
            })
            this.authWatcher.watch(this.store.auth)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
            this.authWatcher.stop()
            this.channel.dispatch({
                event: 'connection@close'
            })
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

        public back (): void {
            this.$router.push('/')
        }
    }
</script>

<style lang="scss"></style>
