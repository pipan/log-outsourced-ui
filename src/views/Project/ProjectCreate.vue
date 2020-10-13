<template>
    <section>
        <project-card
            title="Create project"
            @submit="save($event)"
            @cancel="cancel()"></project-card>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ProjectCard from '@/components/domain/project/ProjectCard.vue'
    import { Channel } from '@wildebeest/observable'

    @Component({
        components: {
            ProjectCard
        }
    })
    export default class ProjectCreate extends Vue {
        @Prop() readonly channel!: Channel<any>

        public cancel (): void {
            this.$router.push({
                name: 'project.list',
                params: this.$route.params
            })
        }

        public save (model: any): void {
            this.channel.dispatch({
                event: 'project@create',
                data: {
                    body: {
                        name: model.name
                    },
                    success: (project: any) => {
                        this.$router.push({
                            name: 'user.list',
                            params: {
                                connectionId: this.$route.params.connectionId,
                                projectUuid: project.uuid
                            }
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
