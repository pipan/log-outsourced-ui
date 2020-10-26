<template>
    <section>
        <project-card
            title="Create Project"
            :form="form"
            @submit="save($event)"
            @cancel="cancel()"></project-card>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ProjectCard from '@/components/domain/project/ProjectCard.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import { SingleResourceWatcher } from '@/lib/watcher'
    import { Uid } from '../Uid'

    @Component({
        components: {
            ProjectCard
        }
    })
    export default class ProjectCreate extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly store!: any

        private uid = Uid.next()

        public form: any = {}
        public formWatcher = new SingleResourceWatcher()

        public created (): void {
            this.formWatcher.withRepository(this.store.forms)
                .withBindingFn(this.onFormChange.bind(this))
                .withId(this.uid)
        }

        public beforeDestroy (): void {
            this.formWatcher.stop()
        }

        public onFormChange (item: any): void {
            this.form = item
        }

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
                    uid: this.uid,
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
