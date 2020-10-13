<template>
    <div>
        <header class="material__header">
            <div class="flexbox-row space-between center flex flexfix">
                <button class="btn btn--secondary btn--circle material__header__back" @click="back()"><i class="material-icons md-18">arrow_back</i></button>
                <div class="material__header__title text-h2 text-ellipsis" v-if="project">{{ project.name }}</div>
            </div>
        </header>
        <project-navigation></project-navigation>
        <div class="material__body">
            <div class="material__container">
                <router-view
                    :project="project"></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { ProjectEntity } from '@/lib/log-outsourced-api'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import ProjectNavigation from '@/components/domain/project/ProjectNavigation.vue'
    import { SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            ProjectNavigation
        }
    })
    export default class ProjectLayout extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() repositories!: any

        public project: any = null

        public projectProperty: Channel<any> = new ProxyChannel()

        private watcher = new SingleResourceWatcher()

        @Watch('$route.params.projectUuid', { immediate: true })
        public onIdChange (value: string, oldValue: string): void {
            this.watcher.withId(value)
        }

        public created (): void {
            this.projectProperty.connectFn((project: any) => {
                this.project = project
            })

            this.watcher.withRepository(this.repositories.projects)
                .withBinding(this.projectProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public back (): void {
            this.$router.push({
                name: 'project.list',
                params: this.$route.params
            })
        }
    }
</script>

<style lang="scss"></style>
