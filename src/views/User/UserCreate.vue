<template>
    <div class="material__body material__body--with-nav">
        <section class="material__container">
            <user-card
                title="Create User"
                :roles="roles"
                :form="form"
                @submit="save($event)"
                @cancel="cancel()"></user-card>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import UserCard from '@/components/domain/user/UserCard.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'
    import { Uid } from '../Uid'

    @Component({
        components: {
            UserCard
        }
    })
    export default class UserCreate extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly store!: any
        @Prop() readonly project!: any

        public uid = Uid.next()

        public form: any = {}
        public formWatcher = new SingleResourceWatcher()

        public roles: any[] = []
        public rolesProperty: Channel<any[]> = new ProxyChannel()
        public rolesWatcher = new ListWatcher()

        public created (): void {
            this.channel.dispatch({
                event: 'role@load',
                data: this.project.uuid
            })

            this.rolesProperty.connectFn((items: any[]) => {
                this.roles = []
                for (const item of items) {
                    this.roles.push(item.name)
                }
            })

            this.rolesWatcher.withRepository(this.store.roles)
                .withBinding(this.rolesProperty)

            this.formWatcher.withRepository(this.store.forms)
                .withBindingFn(this.onFormChange.bind(this))
                .withId(this.uid)
        }

        public beforeDestroy (): void {
            this.rolesWatcher.stop()
            this.formWatcher.stop()
        }

        public onFormChange (item: any): void {
            this.form = item
        }

        public cancel (): void {
            this.$router.push({
                name: 'user.list',
                params: this.$route.params
            })
        }

        public save (model: any): void {
            this.channel.dispatch({
                event: 'user@create',
                data: {
                    uid: this.uid,
                    body: {
                        username: model.username,
                        roles: model.roles,
                        project_uuid: this.project.uuid
                    },
                    success: (project: any) => {
                        this.$router.push({
                            name: 'user.list',
                            params: this.$route.params
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
