<template>
    <section>
        <filtered-list
            title="Log listeners"
            @add="create()">
            <simple-list-item
                v-for="item of listeners"
                :key="item.uuid"
                :text="item.username"
                :value="item"
                :contexts="['Delete']"
                @select="open($event)"
                @delete="remove($event)">
            </simple-list-item>
        </filtered-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import Contextmenu from '@/components/contextmenu/Contextmenu.vue'
    import FilteredList from '@/components/list/filtered/FilteredList.vue'
    import SimpleListItem from '@/components/list/simple/SimpleListItem.vue'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            Contextmenu,
            FilteredList,
            SimpleListItem
        }
    })
    export default class LoggingView extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() repositories!: any

        public listeners: any[] = []

        public listenersProperty: Channel<any> = new ProxyChannel()

        private watcher = new ListWatcher()

        public created (): void {
            // this.channel.dispatch({
            //     event: 'user@load'
            // })

            this.listenersProperty.connectFn((items: any[]) => {
                this.listeners = items
            })

            // this.watcher.withRepository(this.repositories.users)
            //     .withBinding(this.usersProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public open (listener: any): void {
            console.log('listener open', listener)
            // this.$router.push({
            //     name: 'project',
            //     params: {
            //         connectionId: this.$route.params.connectionId,
            //         projectUuid: project.uuid
            //     }
            // })
        }

        public remove (listener: any): void {
            console.log('listener remove', listener)
            this.channel.dispatch({
                event: 'listener@delete',
                data: {
                    body: listener
                }
            })
        }

        public create (): void {
            console.log('listener create')
            this.$router.push({
                name: 'listener.create',
                params: this.$route.params
            })
        }
    }
</script>

<style lang="scss"></style>
