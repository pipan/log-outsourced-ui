<template>
    <section class="material__container">
        <div class="flexbox-row center bottom-m">
            <h2 class="text-m flex">Projects</h2>
            <button class="btn btn--forward left-m" @click="create()">
                <i class="material-icons md-18">add</i>
            </button>
        </div>
        <project-list class="flex" v-bind:items="this.projects" @open="open($event)" @delete="deleteProject($event)"></project-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ProjectList from '@/components/ProjectList.vue'
    import { ProjectEntity } from '@/lib/log-outsourced-api'
    import { Channel } from '@/lib/broadcast/Channel'
    import { ObservableList } from '@wildebeest/observe-changes'
    import { ViewRepository } from './ViewRepository'
    @Component({
        components: {
            ProjectList
        }
    })
    export default class Index extends Vue {
        @Prop() readonly channel!: Channel
        @Prop() public projectList!: ObservableList<ProjectEntity>

        public projects: Array<ProjectEntity> = []
        public repo!: ViewRepository

        public created (): void {
            this.repo = new ViewRepository(this)
        }

        public beforeDestroy (): void {
            this.repo.unbindAll()
        }

        public mounted (): void {
            this.repo.bindList('projects', this.projectList)
        }

        public open (project: ProjectEntity): void {
            this.channel.dispatch({
                event: 'project@open',
                data: project.getUuid()
            })
        }

        public create (): void {
            this.channel.dispatch({ event: 'project.create@open' })
        }

        public deleteProject (project: ProjectEntity): void {
            this.channel.dispatch({
                event: 'project@delete',
                data: project
            })
        }
    }
</script>

<style lang="scss"></style>
