<template>
    <div class="material__body material__body--with-nav">
        <section class="material__container" :class="{'hide-m': user}">
            <filtered-list
                title="Users"
                :filterAvailable="true"
                @filter="filter($event)"
                @add="create()">
                <double-lined-item
                    v-for="item of usersFiltered"
                    :key="item.uuid"
                    :text="item.username"
                    :subtext="item.roles.join(', ')"
                    :value="item"
                    :contexts="item.roles.length > 0 ? ['Disable'] : []"
                    :active="user && item.uuid === user.uuid"
                    @select="open($event)"
                    @disable="disable($event)">
                </double-lined-item>
            </filtered-list>
        </section>
        <router-view
            :channel="channel"
            :store="store"
            :project="project"
            :user="user"></router-view>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import Contextmenu from '@/components/contextmenu/Contextmenu.vue'
    import FilteredList from '@/components/list/filtered/FilteredList.vue'
    import DoubleLinedItem from '@/components/list/double/DoubleLinedItem.vue'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            Contextmenu,
            FilteredList,
            DoubleLinedItem
        }
    })
    export default class UserView extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() store!: any
        @Prop() project!: any

        public user!: any
        public userProperty: Channel<any> = new ProxyChannel()
        private userWatcher = new SingleResourceWatcher()

        public filterValue = ''
        public usersFiltered: any[] = []
        public users: any[] = []
        public usersProperty: Channel<any> = new ProxyChannel()
        private watcher = new ListWatcher()

        @Watch('$route.query.uuid', { immediate: true })
        public onUuidChange (value: string, oldValue: string): void {
            if (!value) {
                this.user = null
            }
            this.userWatcher.withId(value)
        }

        public created (): void {
            this.channel.dispatch({
                event: 'user@load',
                data: this.project.uuid
            })

            this.usersProperty.connectFn((items: any[]) => {
                this.users = items
                this.filter(this.filterValue)
            })
            this.watcher.withRepository(this.store.users)
                .withBinding(this.usersProperty)

            this.userProperty.connectFn((item: any) => {
                this.user = item
            })
            this.userWatcher.withRepository(this.store.users)
                .withBinding(this.userProperty)
        }

        public filter (value: string): void {
            this.filterValue = value
            if (!this.filterValue) {
                this.usersFiltered = this.users
                return
            }
            this.usersFiltered = []
            for (const user of this.users) {
                if (!user.username.toLowerCase().startsWith(this.filterValue)) {
                    continue
                }
                this.usersFiltered.push(user)
            }
        }

        public beforeDestroy (): void {
            this.watcher.stop()
            this.userWatcher.stop()
        }

        public open (user: any): void {
            if (this.$route.query.uuid === user.uuid) {
                return
            }
            this.$router.push({
                name: 'user.edit',
                params: this.$route.params,
                query: {
                    uuid: user.uuid
                }
            })
        }

        public disable (user: any): void {
            const consent = confirm('You are about to remove all roles for user: ' + user.username)
            if (!consent) {
                return
            }
            this.channel.dispatch({
                event: 'user@disable',
                data: {
                    body: user
                }
            })
        }

        public create (): void {
            this.$router.push({
                name: 'user.create',
                params: this.$route.params
            })
        }
    }
</script>

<style lang="scss"></style>
