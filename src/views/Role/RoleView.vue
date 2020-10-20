<template>
    <div class="material__body material__body--with-nav">
        <section class="material__container" :class="{'hide-m': role}">
            <filtered-list
                title="Roles"
                :filterAvailable="true"
                :filter="filterValue"
                @filter="filter($event)"
                @add="create()">
                <double-lined-item
                    v-for="item of rolesFiltered"
                    :key="item.uuid"
                    :text="item.name"
                    :subtext="item.permissions.join(', ')"
                    :value="item"
                    :contexts="['Delete']"
                    :active="role && role.uuid === item.uuid"
                    @select="open($event)"
                    @delete="remove($event)">
                </double-lined-item>
            </filtered-list>
        </section>
        <router-view
            :channel="channel"
            :store="store"
            :project="project"
            :role="role"></router-view>
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
    export default class RoleView extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() store!: any
        @Prop() project!: any

        public role!: any
        public roleProperty: Channel<any> = new ProxyChannel()
        private roleWatcher = new SingleResourceWatcher()

        public filterValue = ''
        public rolesFiltered: any[] = []
        public roles: any[] = []
        public rolesProperty: Channel<any> = new ProxyChannel()
        private watcher = new ListWatcher()

        @Watch('$route.query.uuid', { immediate: true })
        public onUuidChange (value: string, oldValue: string): void {
            if (!value) {
                this.role = null
            }
            this.roleWatcher.withId(value)
        }

        public created (): void {
            this.channel.dispatch({
                event: 'role@load',
                data: this.project.uuid
            })

            this.rolesProperty.connectFn((items: any[]) => {
                this.roles = items
                this.filter(this.filterValue)
            })
            this.watcher.withRepository(this.store.roles)
                .withBinding(this.rolesProperty)

            this.roleProperty.connectFn((item: any) => {
                this.role = item
            })
            this.roleWatcher.withRepository(this.store.roles)
                .withBinding(this.roleProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
            this.roleWatcher.stop()
        }

        public filter (value: string): void {
            this.filterValue = value
            if (!this.filterValue) {
                this.rolesFiltered = this.roles
                return
            }
            this.rolesFiltered = []
            for (const role of this.roles) {
                if (!role.name.toLowerCase().startsWith(this.filterValue)) {
                    continue
                }
                this.rolesFiltered.push(role)
            }
        }

        public open (role: any): void {
            this.$router.push({
                name: 'role.edit',
                params: this.$route.params,
                query: {
                    uuid: role.uuid
                }
            })
        }

        public remove (role: any): void {
            this.channel.dispatch({
                event: 'role@delete',
                data: {
                    body: role
                }
            })
        }

        public create (): void {
            this.$router.push({
                name: 'role.create',
                params: this.$route.params
            })
        }
    }
</script>

<style lang="scss"></style>
