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
    import { ViewRepository } from './ViewRepository'
    @Component
    export default class ProjectLayout extends Vue {
        @Prop() channel!: Channel
        @Prop() shared!: any

        public project: ProjectEntity | null = null
        public api: any | null = null
        private repo!: ViewRepository

        public created (): void {
            this.repo = new ViewRepository(this)
        }

        public beforeDestroy (): void {
            this.repo.unbindAll()
        }

        public mounted (): void {
            this.repo.bindProperty('api', this.shared.api)
            this.repo.bindProperty('project', this.shared.projectActive)
        }

        public back (): void {
            this.channel.dispatch({ event: 'project@close' })
        }
    }
</script>

<style lang="scss"></style>
