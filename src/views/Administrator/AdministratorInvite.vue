<template>
    <section>
        <div class="card">
            <form @submit.prevent="save()">
                <header class="card__header">Invite administrator</header>
                <div class="card__body">
                    <string-field
                        v-if="model"
                        id="username"
                        label="Username"
                        :value="model.username"
                        :error="(form && form.error) ? form.error.username : ''"
                        @change="model.username = $event"></string-field>
                </div>
                <footer class="card__footer">
                    <button type="button" class="btn btn--secondary right-s" @click="cancel()">CANCEL</button>
                    <button type="submit" class="btn btn--primary">INVITE</button>
                </footer>
            </form>
        </div>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import StringField from '@/components/form/StringField.vue'
    import { Channel } from '@wildebeest/observable'
    import { Uid } from '../Uid'
    import { SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            StringField
        }
    })
    export default class AdministratorCreate extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly store!: any

        public uid = Uid.next()
        public model: any = {}

        public form: any = {}
        public formWatcher = new SingleResourceWatcher()

        public created (): void {
            this.formWatcher.withRepository(this.store.forms)
                .withBindingFn(this.onFormChange.bind(this))
                .withId(this.uid)
        }

        public beforeDestroy (): void {
            this.formWatcher.stop()
        }

        public onFormChange (item: any): void {
            this.form = item
        }

        public cancel (): void {
            this.$router.push({
                name: 'administrator.list',
                params: this.$route.params
            })
        }

        public save (): void {
            this.channel.dispatch({
                event: 'administrator@invite',
                data: {
                    uid: this.uid,
                    body: {
                        username: this.model.username
                    },
                    success: (admin: any) => {
                        this.$router.push({
                            name: 'administrator.list',
                            params: this.$route.params
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
