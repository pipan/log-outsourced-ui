<template>
    <div class="flex flexbox-row">
        <section class="material__container">
            <div class="flexbox-row center bottom-m">
                <h2 class="text-m flex">Rules</h2>
                <button class="btn btn--forward left-m" @click="create()">
                    <i class="material-icons md-18">add</i>
                </button>
            </div>
            <listener-list :items="listeners" @open="openListener($event)" @delete="deleteListener($event)"></listener-list>
        </section>
        <section class="material__container" v-if="editModel">
            <listener-create-card
            :title="listener.getName()"
            :model="editModel"
            :handler-options="handlerOptions"
            :fields="fields"
            @handlerChange="onHandlerChange($event)"
            @cancel="closeListener()"></listener-create-card>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { Channel } from '../lib/broadcast/Channel'
    import { ViewRepository } from './ViewRepository'
    import { ObservableProperty, Closable, PropertyChange, ObservableList, ListChange, ObservableMap } from '@wildebeest/observe-changes'
    import { ProjectEntity, ListenerEntity, HandlerEntity } from '../lib/log-outsourced-api'
    import ListenerList from '../components/domain/listener/ListenerList.vue'
    import ListenerCreateCard from '../components/domain/listener/ListenerCreateCard.vue'

    @Component({
        components: {
            ListenerList,
            ListenerCreateCard
        }
    })
    export default class ProjectDetail extends Vue {
        @Prop() readonly channel!: Channel
        @Prop() readonly shared!: any

        public project: ProjectEntity | null = null
        public listeners: Array<ListenerEntity> = []
        public editModel: any | null = null
        public listener: ListenerEntity | null = null
        public fields: Array<any> = []
        public handlerOptions: Array<any> = []
        private repo!: ViewRepository
        private closables: Array<Closable> = []

        public created (): void {
            this.repo = new ViewRepository(this)
        }

        public beforeDestroy (): void {
            this.repo.unbindAll()
            for (const closable of this.closables) {
                closable.close()
            }
        }

        public mounted (): void {
            this.repo.bindProperty('project', this.shared.projectActive)
            this.repo.bindList('listeners', this.shared.listeners)
            this.repo.bindProperty('editModel', this.shared.listenerEdit)
            this.repo.bindProperty('listener', this.shared.listenerActive)
            this.repo.bindList('handlerOptions', this.shared.handlerFormOptions)

            this.closables.push(
                this.shared.listenerEdit.addListenerAndCall((change: PropertyChange<any>) => {
                    if (!change.next() || !change.next().handler) {
                        this.fields = []
                        return
                    }
                    this.onHandlerChange(change.next().handler.slug)
                })
            )
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

        public closeListener (): void {
            this.channel.dispatch({ event: 'listener@close' })
        }

        public onHandlerChange (slug: string): void {
            this.fields = this.shared.handlerFormSchema.get(slug)
        }
    }
</script>

<style lang="scss"></style>
