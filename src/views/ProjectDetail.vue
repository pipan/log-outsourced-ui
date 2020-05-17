<template>
    <section class="material__container">
        <div class="flexbox-row center bottom-m">
            <h2 class="text-m flex">Rules</h2>
            <button class="btn btn--forward left-m" @click="create()">
                <i class="material-icons md-18">add</i>
            </button>
        </div>
        <listener-list :listners="[]"></listener-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { Channel } from '../lib/broadcast/Channel'
    import { ObservableProperty, Closable, PropertyChange } from '@wildebeest/observe-changes'
    import { ProjectEntity } from '../lib/log-outsourced-api'
    import ListenerList from '../components/listener/ListenerList.vue'

    @Component({
        components: {
            ListenerList
        }
    })
    export default class ProjectDetail extends Vue {
        @Prop() readonly channel!: Channel
        @Prop() readonly activeProject!: ObservableProperty<ProjectEntity>

        public project: ProjectEntity | null = null
        private closables: Array<Closable> = []

        public mounted (): void {
            this.closables.push(
                this.activeProject.addListenerAndCall(
                    this.onActiveProjectChange.bind(this)
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

        private onActiveProjectChange (change: PropertyChange<ProjectEntity>): void {
            this.project = change.next()
            // this.channel.dispatch({
            //     event: 'project@load',
            //     data: this.project
            // })
        }
    }
</script>

<style lang="scss"></style>
