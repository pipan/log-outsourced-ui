<template>
    <div>
        <header class="material__header">
            <div>Log Outsourced</div>
        </header>
        <div class="material__body">
            <projects-container :projects="projects" @open="open($event)"></projects-container>
        </div>
    </div>
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
    }
</script>

<style lang="scss"></style>
