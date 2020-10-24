<template>
    <div class="material__body material__body--with-nav">
        <section class="material__container">
            <project-key-card
                title="Rename Access Key"
                :form="form"
                :model="key"
                @submit="save($event)"
                @cancel="cancel()"></project-key-card>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ProjectKeyCard from '@/components/domain/projectkey/ProjectKeyCard.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'
    import { Uid } from '../Uid'

    @Component({
        components: {
            ProjectKeyCard
        }
    })
    export default class ProjectKeyRename extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly store!: any
        @Prop() readonly project!: any

        public uid = Uid.next()
        public key: any = {}

        public form: any = {}
        public formWatcher = new SingleResourceWatcher()

        public created (): void {
            this.formWatcher.withRepository(this.store.forms)
                .withBindingFn(this.onFormChange.bind(this))
                .withId(this.uid)

            this.key = this.store.projectKeys.query()
                .property(this.$route.query.key)
                .imidiate()

            if (!this.key) {
                // not found
            }
        }

        public beforeDestroy (): void {
            this.formWatcher.stop()
        }

        public onFormChange (item: any): void {
            this.form = item
        }

        public cancel (): void {
            this.$router.push({
                name: 'projectkey.list',
                params: this.$route.params
            })
        }

        public save (model: any): void {
            this.channel.dispatch({
                event: 'projectKey@update',
                data: {
                    uid: this.uid,
                    body: {
                        key: model.key,
                        name: model.name
                    },
                    success: (project: any) => {
                        this.$router.push({
                            name: 'projectkey.list',
                            params: this.$route.params
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
