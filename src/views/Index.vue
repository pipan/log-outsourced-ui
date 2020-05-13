<template>
    <projects-container :projects="projects" @open="open($event)" @create="create()"></projects-container>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ProjectsContainer from '@/components/ProjectsContainer.vue'
    import { ProjectEntity } from '../lib/log-outsourced'
    import { Broadcast } from '../lib/broadcast'
    @Component({
        components: {
            ProjectsContainer
        }
    })
    export default class Index extends Vue {
        @Prop() readonly broadcast!: Broadcast
        public projects: Array<ProjectEntity> = [
            new ProjectEntity('001', 'one'),
            new ProjectEntity('002', 'two')
        ]

        public open (project: ProjectEntity): void {
            this.broadcast.channel('project.open')
                .dispatch(project)
        }

        public create (): void {
            this.broadcast.channel('project.create')
                .dispatch()
        }
    }
</script>

<style lang="scss"></style>
