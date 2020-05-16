<template>
    <projects-container :projects="projects" @open="open($event)" @create="create()"></projects-container>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ProjectsContainer from '@/components/ProjectsContainer.vue'
    import { ProjectEntity } from '@/lib/log-outsourced-api'
    import { Channel } from '@/lib/broadcast/Channel'
    import { ObservableList, Closable } from '@wildebeest/observe-changes'
    @Component({
        components: {
            ProjectsContainer
        }
    })
    export default class Index extends Vue {
        @Prop() readonly channel!: Channel
        @Prop() public projectsProperty!: ObservableList<ProjectEntity>

        public projects: Array<ProjectEntity> = []
        private closables: Array<Closable> = []

        public mounted (): void {
            this.closables.push(
                this.projectsProperty.addListenerAndCall(() => {
                    this.projects = this.projectsProperty.all()
                })
            )

            this.channel.dispatch({ event: 'project@load.all' })
        }

        public beforeDestroy (): void {
            for (const closable of this.closables) {
                closable.close()
            }
        }

        public open (project: ProjectEntity): void {
            this.channel.dispatch({
                event: 'project@open',
                data: project
            })
        }

        public create (): void {
            this.channel.dispatch({ event: 'project.create@open' })
        }
    }
</script>

<style lang="scss"></style>
