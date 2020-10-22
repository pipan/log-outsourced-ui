<template>
    <div>
        <router-view
            :connection="connection"
            v-if="connection && !error"></router-view>
        <div class="material__body" v-if="!connection || error">
            <div class="material__container">
                <connection-login
                    v-if="connection && error.status === 401"
                    :connection="connection"
                    :error="error"
                    @cancel="back()"
                    @submit="login($event)">
                </connection-login>
                <error-status
                    v-if="!connection"
                    status="404"
                    message="Connection not found">
                </error-status>
                <error-status
                    v-if="error && error.status !== 401"
                    :status="error.status"
                    :message="error.message">
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
        private watcher = new SingleResourceWatcher()

        public error: any = null
        private errorWatcher: any

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

            this.errorWatcher = new PropertyWatcher((item: any) => {
                this.error = item
            })
            this.errorWatcher.watch(this.store.error)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
            this.errorWatcher.stop()
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
                    },
                    success: () => {
                        this.error = null
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
