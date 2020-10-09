<template>
    <div class="flex flexbox-row">
        <div class="material__actions">
            <button class="btn btn--primary btn--circle" @click="create()">
                <span class="material-icons">add</span>
            </button>
        </div>
        <section class="material__container">
            <div v-for="(connection, index) of this.connections" :key="connection.name" :class="{'top-s': index > 0}">
                <double-lined-item
                    :text="connection.name"
                    :subtext="connection.username + '@' + connection.host"
                    :value="connection"
                    :contexts="['Edit', 'Remove']"
                    @select="open($event)"
                    @Edit="edit($event)"
                    @Remove="remove($event)">
                </double-lined-item>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import clipboardCopy from 'clipboard-copy'
    import { Channel, Closable, ProxyChannel } from '@wildebeest/observable'
    import Contextmenu from '../../components/contextmenu/Contextmenu.vue'
    import DoubleLinedItem from '../../components/list/double/DoubleLinedItem.vue'
    import { ViewRepository } from '../ViewRepository'
    import { ListWatcher } from '@/lib/watcher'

    @Component({
        components: {
            Contextmenu,
            DoubleLinedItem
        }
    })
    export default class ConnectionList extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() readonly repositories!: any

        public connections: Array<any> = []
        public connectionsChannel: Channel<any[]> = new ProxyChannel()

        private watcher: ListWatcher<any> = new ListWatcher()

        public created (): void {
            this.connectionsChannel.connectFn((items: any[]) => {
                this.connections = items
            })
            this.watcher.withRepository(this.repositories.connections)
                .withBinding(this.connectionsChannel)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public open (connection: any): void {
            this.$router.push('/' + connection.id)
        }

        public edit (connection: any): void {
            this.$router.push('/connection/update?id=' + connection.id)
        }

        public remove (connection: any): void {
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
