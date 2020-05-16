<template>
    <div>
        <header class="material__header">
            <div class="flexbox-row space-between center flex">
                <button class="btn btn--secondary btn--square material__header__back" @click="back()"><i class="material-icons md-18">apps</i></button>
                <div class="material__header__title text-m" v-if="project">{{ project.getName() }}</div>
                <button v-if="api" class="btn btn--secondary text-ellipsis material__header__url">{{ api.url }}</button>
            </div>
        </header>
        <div class="material__body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { ProjectEntity } from '@/lib/log-outsourced-api'
    import { ObservableProperty, PropertyChange } from '@wildebeest/observe-changes'
    import { Channel } from '../lib/broadcast/Channel'
    @Component
    export default class ProjectLayout extends Vue {
        @Prop() projectProperty!: ObservableProperty<ProjectEntity>
        @Prop() channel!: Channel
        @Prop() apiProperty!: ObservableProperty<any>

        public project: ProjectEntity | null = null
        public api: any | null = null

        public mounted (): void {
            this.projectProperty.addListenerAndCall(
                this.onProjectPropertyChange
            )

            this.apiProperty.addListenerAndCall((change: PropertyChange<any>) => {
                this.api = change.next()
            })
        }

        public back (): void {
            this.channel.dispatch({
                event: 'scene@change',
                data: '/'
            })
        }

        private onProjectPropertyChange (change: PropertyChange<ProjectEntity>): void {
            this.project = change.next()
        }
    }
</script>

<style lang="scss"></style>
