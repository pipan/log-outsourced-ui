<template>
    <projects-container :projects="projects" @open="open($event)" @create="create()"></projects-container>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ProjectsContainer from '@/components/ProjectsContainer.vue'
    import { ProjectEntity } from '../lib/log-outsourced'
    import { Channel } from '../lib/broadcast/Channel'
    @Component({
        components: {
            ProjectsContainer
        }
    })
    export default class Index extends Vue {
        @Prop() readonly channel!: Channel
        public projects: Array<ProjectEntity> = [
            new ProjectEntity('001', 'one'),
            new ProjectEntity('002', 'two')
        ]

        public open (project: ProjectEntity): void {
            this.channel.dispatch({
                event: 'alert.create',
                data: {
                    message: new Date(),
                    type: 'info'
                }
            })
        }

        public create (): void {
            this.channel.dispatch({ event: 'project.create@open' })
        }
    }
</script>

<style lang="scss"></style>
