<template>
    <section class="material__container">
        <div class="card">
            <form @submit.prevent="save()" v-if="connection">
                <header class="card__header">Login to {{ connection.name }}</header>
                <div class="card__body">
                    <constant-field
                        label="User"
                        :value="connection.username + '@' + connection.host"></constant-field>
                    <password-field
                        id="password"
                        label="Password"
                        :value="model.password"></password-field>
                </div>
                <footer class="card__footer">
                    <button type="button" class="btn btn--secondary right-s" @click="cancel()">CANCEL</button>
                    <button type="submit" class="btn btn--primary">LOGIN</button>
                </footer>
            </form>
        </div>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import PasswordField from '@/components/form/PasswordField.vue'
    import ConstantField from '@/components/form/ConstantField.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import { ObservableProperty } from '@wildebeest/repository'
    import { SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            PasswordField,
            ConstantField
        }
    })
    export default class ConnectionLogin extends Vue {
        @Prop() readonly repositories!: any

        public model: any = {
            password: ''
        }

        public connection: any | null = null

        protected connectionChannel: Channel<any> = new ProxyChannel()
        protected watcher: SingleResourceWatcher<any> = new SingleResourceWatcher()

        @Watch('$route.query.id', { immediate: true })
        public onIdChange (value: string, oldValue: string): void {
            this.watcher.withId(value)
        }

        public created (): void {
            this.connectionChannel.connectFn((connecion: any) => {
                this.connection = connecion
            })

            this.watcher.withRepository(this.repositories.connection)
                .withBinging(this.connectionChannel)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public cancel (): void {
            this.$router.push('/')
        }

        public save (): void {
            console.log('save')
        }
    }
</script>

<style lang="scss"></style>
