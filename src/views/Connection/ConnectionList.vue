<template>
    <section class="material__container">
        <simple-list
            title="Connections"
            @add="create()">
            <double-lined-item
                v-for="connection of this.connections"
                :key="connection.id"
                :text="connection.name"
                :subtext="connection.username + '@' + connection.host"
                :value="connection"
                :contexts="['Edit', 'Remove']"
                @select="open($event)"
                @edit="edit($event)"
                @remove="remove($event)">
            </double-lined-item>
        </simple-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import Contextmenu from '../../components/contextmenu/Contextmenu.vue'
    import DoubleLinedItem from '../../components/list/double/DoubleLinedItem.vue'
    import SimpleList from '../../components/list/simple/SimpleList.vue'
    import { ListWatcher } from '@/lib/watcher'
    import { QueryResult } from '@wildebeest/repository'

    @Component({
        components: {
            Contextmenu,
            DoubleLinedItem,
            SimpleList
        }
    })
    export default class ConnectionList extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() readonly store!: any

        public connections: Array<any> = []

        private query!: QueryResult<any>

        public created (): void {
            this.query = this.store.connections.query()
                .orderBy('name')
                .list()
                .connectFn((items: any[]) => {
                    this.connections = items
                })
        }

        public beforeDestroy (): void {
            if (this.query) {
                this.query.close()
            }
        }

        public open (connection: any): void {
            this.$router.push('/' + connection.id)
        }

        public edit (connection: any): void {
            this.$router.push({
                name: 'connection.edit',
                query: {
                    id: connection.id
                }
            })
        }

        public remove (connection: any): void {
            const consent = confirm('You are about to delete connection: ' + connection.username + '@' + connection.host)
            if (!consent) {
                return
            }

            this.channel.dispatch({
                event: 'connection@delete',
                data: connection
            })
        }

        public create (): void {
            this.$router.push('/connection/create')
        }
    }
</script>

<style lang="scss"></style>
