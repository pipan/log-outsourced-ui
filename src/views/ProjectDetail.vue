<template>
    <section class="material__container">
        <div class="flexbox-row center bottom-m">
            <h2 class="text-m flex">Rules</h2>
            <button class="btn btn--forward left-m" @click="create()">
                <i class="material-icons md-18">add</i>
            </button>
        </div>
        <listener-list :items="listeners" @open="openListener($event)" @delete="deleteListener($event)"></listener-list>
        <div v-if="listener">
            Rule detail
        </div>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { Channel } from '../lib/broadcast/Channel'
    import { ViewRepository } from './ViewRepository'
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
        @Prop() readonly projectProperty!: ObservableProperty<ProjectEntity>
        @Prop() readonly listenerList!: ObservableList<ListenerEntity>
        @Prop() readonly listenerProperty!: ObservableProperty<ListenerEntity>

        public project: ProjectEntity | null = null
        public listeners: Array<ListenerEntity> = []
        public listener: ListenerEntity | null = null
        private repo!: ViewRepository

        public created (): void {
            this.repo = new ViewRepository(this)
        }

        public beforeDestroy (): void {
            this.repo.unbindAll()
        }

        public mounted (): void {
            this.repo.bindProperty('project', this.projectProperty)
            this.repo.bindList('listeners', this.listenerList)
            this.repo.bindProperty('listener', this.listenerProperty)
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
    }
</script>

<style lang="scss"></style>
