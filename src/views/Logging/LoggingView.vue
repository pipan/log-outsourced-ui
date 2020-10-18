<template>
    <section>
        <filtered-list
            title="Logging Rules"
            @add="create()">
            <icon-double-item
                v-for="item of listeners"
                :key="item.uuid"
                :text="item.name"
                :icon="getHandlerBySlug(item.handler_slug).meta.meta.icon"
                :subtext="item.rules.join(', ')"
                :value="item"
                :contexts="['Delete', 'Test']"
                @select="open($event)"
                @delete="remove($event)">
            </icon-double-item>
        </filtered-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import Contextmenu from '@/components/contextmenu/Contextmenu.vue'
    import FilteredList from '@/components/list/filtered/FilteredList.vue'
    import IconDoubleItem from '@/components/list/double/IconDoubleItem.vue'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            Contextmenu,
            FilteredList,
            IconDoubleItem
        }
    })
    export default class LoggingView extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() store!: any
        @Prop() project!: any

        public listeners: any[] = []
        public listenersProperty: Channel<any> = new ProxyChannel()
        private watcher = new ListWatcher()

        public handlers: any[] = []
        public handlersProperty: Channel<any> = new ProxyChannel()
        private handlerWatcher = new ListWatcher()

        public created (): void {
            this.channel.dispatch({
                event: 'listener@load',
                data: this.project.uuid
            })
            this.channel.dispatch({
                event: 'handler@load'
            })

            this.listenersProperty.connectFn((items: any[]) => {
                this.listeners = items
            })
            this.watcher.withRepository(this.store.listeners)
                .withBinding(this.listenersProperty)

            this.handlersProperty.connectFn((items: any[]) => {
                this.handlers = items
            })
            this.handlerWatcher.withRepository(this.store.handlers)
                .withBinding(this.handlersProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
            this.handlerWatcher.stop()
        }

        public getHandlerBySlug (slug: string): any {
            for (const handler of this.handlers) {
                if (handler.slug !== slug) {
                    continue
                }
                return handler
            }
            return {
                meta: {
                    meta: {
                        icon: ''
                    }
                }
            }
        }

        public open (listener: any): void {
            this.$router.push({
                name: 'logging.edit',
                params: this.$route.params,
                query: {
                    uuid: listener.uuid
                }
            })
        }

        public remove (listener: any): void {
            this.channel.dispatch({
                event: 'listener@delete',
                data: {
                    body: listener
                }
            })
        }

        public create (): void {
            this.$router.push({
                name: 'logging.create',
                params: this.$route.params
            })
        }
    }
</script>

<style lang="scss"></style>
