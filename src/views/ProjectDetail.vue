<template>
    <section class="material__container">
        <div class="flexbox-row center bottom-m">
            <h2 class="text-m flex">Rules</h2>
            <button class="btn btn--forward left-m" @click="create()">
                <i class="material-icons md-18">add</i>
            </button>
        </div>
        <listener-list :items="listeners" @open="openListener($event)" @delete="deleteListener($event)"></listener-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { Channel } from '../lib/broadcast/Channel'
    import { ObservableProperty, Closable, PropertyChange, ObservableList, ListChange } from '@wildebeest/observe-changes'
    import { ProjectEntity, ListenerEntity } from '../lib/log-outsourced-api'
    import ListenerList from '../components/domain/listener/ListenerList.vue'

    @Component({
        components: {
            ListenerList
        }
    })
    export default class ProjectDetail extends Vue {
        @Prop() readonly channel!: Channel
        @Prop() readonly activeProject!: ObservableProperty<ProjectEntity>
        @Prop() readonly listenersProperty!: ObservableList<ListenerEntity>

        public project: ProjectEntity | null = null
        public listeners: Array<ListenerEntity> = []
        private closables: Array<Closable> = []

        public mounted (): void {
            this.closables.push(
                this.activeProject.addListenerAndCall(
                    this.onActiveProjectChange.bind(this)
                )
            )

            this.closables.push(
                this.listenersProperty.addListenerAndCall(
                    this.onListenersChange.bind(this)
                )
            )
        }

        public beforeDestroy (): void {
            for (const closable of this.closables) {
                closable.close()
            }
        }

        public create (): void {
            this.channel.dispatch({ event: 'listener.create@open' })
        }

        public openListener (listener: ListenerEntity): void {
            this.channel.dispatch({
                event: 'listener@open',
                data: listener
            })
        }

        public deleteListener (listener: ListenerEntity): void {
            this.channel.dispatch({
                event: 'listener@delete',
                data: listener
            })
        }

        private onActiveProjectChange (change: PropertyChange<ProjectEntity>): void {
            this.project = change.next()
        }

        private onListenersChange (): void {
            this.listeners = this.listenersProperty.all()
        }
    }
</script>

<style lang="scss"></style>
