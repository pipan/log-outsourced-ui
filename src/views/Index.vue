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
    import { ViewRepository } from './ViewRepository'
    import { Channel } from '@wildebeest/observable'
    @Component({
        components: {
            ProjectList
        }
    })
    export default class Index extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() public queries!: any

        public projects: Array<ProjectEntity> = []
        public repo!: ViewRepository

        public created (): void {
            this.repo = new ViewRepository(this)

            this.channel.dispatch({ event: 'project@load.all' })
        }

        public beforeDestroy (): void {
            this.repo.unbindAll()
        }

        public mounted (): void {
            this.repo.bindValue('projects', this.queries.projects)
        }

        public open (project: ProjectEntity): void {
            this.$router.push('/project?pid=' + project.identify())
        }

        public create (): void {
            this.$router.push('/create')
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
