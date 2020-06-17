<template>
    <div>
        <header class="material__header">
            <div class="flexbox-row space-between center flex flexfix">
                <button class="btn btn--secondary btn--square material__header__back" @click="back()"><i class="material-icons md-18">apps</i></button>
                <div class="material__header__title text-m text-ellipsis" v-if="project">{{ project.getName() }}</div>
                <diV class="flexbox-row">
                    <button v-if="api" class="btn btn--secondary btn--square text-ellipsis material__header__url right-m" @click="copyUrl()">
                        <span class="hide-s left-s right-s">{{ api.url }}</span>
                        <span class="hide show-s material-icons md-18">content_copy</span>
                    </button>
                    <contextmenu :relative="true" ref="contextmenu">
                        <button class="context__menu__item top-s" @click="openSettings()">Settings</button>
                    </contextmenu>
                </diV>
            </div>
        </header>
        <div class="material__body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { ProjectEntity } from '@/lib/log-outsourced-api'
    import { ViewRepository } from './ViewRepository'
    import clipboardCopy from 'clipboard-copy'
    import { Channel } from '@wildebeest/observable'
    import Contextmenu from '../components/contextmenu/Contextmenu.vue'

    @Component({
        components: {
            Contextmenu
        }
    })
    export default class ProjectLayout extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() queries!: any

        public project: ProjectEntity | null = null
        public api: any | null = null
        private repo!: ViewRepository

        @Watch('$route.query.pid', { immediate: true })
        public onUuidChange (value: string, oldValue: string): void {
            this.channel.dispatch({
                event: 'project@open',
                data: value
            })
        }

        public created (): void {
            this.repo = new ViewRepository(this)
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

        public openSettings (): void {
            (this.$refs.contextmenu as Contextmenu).close()
            this.$router.push({
                path: '/project/settings',
                query: {
                    pid: this.$route.query.pid
                }
            })
        }
    }
</script>

<style lang="scss"></style>
