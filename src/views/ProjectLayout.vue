<template>
    <div>
        <header class="material__header">
            <div class="flexbox-row space-between center flex">
                <button class="btn btn--secondary btn--square material__header__back" @click="back()"><i class="material-icons md-18">apps</i></button>
                <div class="material__header__title text-m" v-if="project">{{ project.getName() }}</div>
                <button v-if="api" class="btn btn--secondary text-ellipsis material__header__url" @click="copyUrl()">{{ api.url }}</button>
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
    import { ViewRepository } from './ViewRepository'
    import clipboardCopy from 'clipboard-copy'
    import { Channel } from '@wildebeest/observable'

    @Component
    export default class ProjectLayout extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() queries!: any

        public project: ProjectEntity | null = null
        public api: any | null = null
        private repo!: ViewRepository

        public created (): void {
            this.repo = new ViewRepository(this)
            this.channel.dispatch({
                event: 'project@open',
                data: this.$route.query.pid
            })
        }

        public beforeDestroy (): void {
            this.repo.unbindAll()
            this.channel.dispatch({ event: 'project@close' })
        }

        public mounted (): void {
            this.repo.bindProperty('api', this.queries.api)
            this.repo.bindProperty('project', this.queries.projectActive)
        }

        public back (): void {
            this.channel.dispatch({ event: 'project@close' })
            this.$router.push('/')
        }

        public copyUrl (): void {
            clipboardCopy(this.api.url)
            this.channel.dispatch({
                event: 'alert@create',
                data: {
                    message: 'URL copied to clipboard',
                    type: 'info'
                }
            })
        }
    }
</script>

<style lang="scss"></style>
