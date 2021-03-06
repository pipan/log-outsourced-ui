<template>
    <section class="material__container">
        <div class="card" v-if="invitation">
            <form @submit.prevent="accept()">
                <header class="card__header">Invitation</header>
                <div class="card__body">
                    <div>You have been invited to work at <span class="text--primary">{{ host }}</span></div>
                    <constant-field
                        label="Username"
                        :value="invitation.username"></constant-field>
                    <password-field
                        id="password"
                        label="Password"
                        :value="model.password"
                        :error="form.error.password"
                        @change="model.password = $event"></password-field>
                    <password-field
                        id="password_repeat"
                        label="Password repeat"
                        :value="model.passwordRepeat"
                        @change="model.passwordRepeat = $event"></password-field>
                </div>
                <footer class="card__footer">
                    <button type="button" class="btn btn--secondary right-s" @click="cancel()">CANCEL</button>
                    <button type="submit" class="btn btn--primary">ACCEPT</button>
                </footer>
            </form>
        </div>
        <error-status
            v-if="!invitation"
            status="404"
            message="I'm afraid I cannot find this invitation">
        </error-status>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import PasswordField from '@/components/form/PasswordField.vue'
    import ConstantField from '@/components/form/ConstantField.vue'
    import ErrorStatus from '@/components/error/ErrorStatus.vue'
    import { ObservableProperty } from '@wildebeest/repository'
    import { SingleResourceWatcher } from '@/lib/watcher'
    import { Channel, ProxyChannel } from '@wildebeest/observable'

    @Component({
        components: {
            PasswordField,
            ConstantField,
            ErrorStatus
        }
    })
    export default class ConnectionInvite extends Vue {
        @Prop() readonly store!: any
        @Prop() readonly channel!: Channel<any>

        public model: any = {
            password: '',
            passwordRepeat: ''
        }

        public form: any = {
            error: {
                password: ''
            }
        }

        public host = ''
        public invitation: any = {}
        private watcher: SingleResourceWatcher<any> = new SingleResourceWatcher()
        private invitationProperty: Channel<any> = new ProxyChannel()

        @Watch('$route.query.host', { immediate: true })
        public onHostChange (value: string, oldValue: string): void {
            this.host = value
        }

        @Watch('$route.params.token', { immediate: true })
        public onTokenChange (value: string, oldValue: string): void {
            this.watcher.withId(value)
            this.channel.dispatch({
                event: 'invite@load',
                data: {
                    host: this.host,
                    body: value
                }
            })
        }

        public created (): void {
            this.invitationProperty.connectFn((invite: any) => {
                this.invitation = invite
            })

            this.watcher.withRepository(this.store.invites)
                .withBinding(this.invitationProperty)
        }

        public cancel (): void {
            this.$router.push('/')
        }

        public accept (): void {
            if (!this.model.password) {
                this.form.error.password = 'Password is required'
                return
            }
            if (this.model.password !== this.model.passwordRepeat) {
                this.form.error.password = 'Password has to match with repeat password'
                return
            }
            this.channel.dispatch({
                event: 'invite@accept',
                data: {
                    host: this.host,
                    body: {
                        invite_token: this.invitation.invite_token,
                        password: this.model.password
                    },
                    success: () => {
                        this.$router.push({
                            name: 'connection.list'
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
