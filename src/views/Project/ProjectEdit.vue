<template>
    <section>
        <project-card
            title="Edit project"
            :model="project"
            @submit="save($event)"
            @cancel="cancel()"></project-card>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import ProjectCard from '@/components/domain/project/ProjectCard.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import { SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            ProjectCard
        }
    })
    export default class ProjectEdit extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly repositories!: any

        public project: any

        public projectProperty: Channel<any> = new ProxyChannel()

        private watcher = new SingleResourceWatcher()

        @Watch('$route.query.uuid', { immediate: true })
        public onUuidChange (value: string, oldValue: string): void {
            this.watcher.withId(value)
        }

        public created (): void {
            this.projectProperty.connectFn((item: any) => {
                this.project = item
            })

            this.watcher.withRepository(this.repositories.projects)
                .withBinding(this.projectProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public cancel (): void {
            this.$router.push({
                name: 'project.list',
                params: this.$route.params
            })
        }

        public save (model: any): void {
            this.channel.dispatch({
                event: 'project@update',
                data: {
                    body: model,
                    success: (project: any) => {
                        this.$router.push({
                            name: 'project.list',
                            params: this.$route.params
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
