<template>
    <div class="material__body material__body--with-nav">
        <section class="material__container" :class="{'hide-m': listener}">
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
                    :active="listener && item.uuid === listener.uuid"
                    @select="open($event)"
                    @delete="remove($event)"
                    @test="sendTestLog($event)">
                </icon-double-item>
            </filtered-list>
        </section>
        <router-view
            :channel="channel"
            :store="store"
            :project="project"
            :listener="listener"></router-view>
    </div>
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

        public listener!: any
        public listenerProperty: Channel<any> = new ProxyChannel()
        private listenerWatcher = new SingleResourceWatcher()

        public listeners: any[] = []
        public listenersProperty: Channel<any> = new ProxyChannel()
        private watcher = new ListWatcher()

        public handlers: any[] = []
        public handlersProperty: Channel<any> = new ProxyChannel()
        private handlerWatcher = new ListWatcher()

        @Watch('$route.query.uuid', { immediate: true })
        public onUuidChange (value: string, oldValue: string): void {
            if (!value) {
                this.listener = null
            }
            this.listenerWatcher.withId(value)
        }

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

            this.listenerProperty.connectFn((item: any) => {
                this.listener = item
            })
            this.listenerWatcher.withRepository(this.store.listeners)
                .withBinding(this.listenerProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
            this.handlerWatcher.stop()
            this.listenerWatcher.stop()
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

        public sendTestLog (listener: any): void {
            this.channel.dispatch({
                event: 'log@test',
                data: {
                    projectUuid: this.$route.params.projectUuid,
                    rules: listener.rules
                }
            })
        }
    }
</script>

<style lang="scss"></style>
