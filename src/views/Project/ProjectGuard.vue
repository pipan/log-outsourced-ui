<template>
    <div>
        <router-view v-if="!project.error"></router-view>
        <div class="material__body" v-if="project.error">
            <div class="material__container">
                <error-status
                    :status="project.error.status"
                    :message="project.error.message">
                </error-status>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import Contextmenu from '@/components/contextmenu/Contextmenu.vue'
    import ErrorStatus from '@/components/error/ErrorStatus.vue'
    import { PropertyWatcher, SingleResourceWatcher } from '@/lib/watcher'
    import { PropertyChange } from '@wildebeest/repository'

    @Component({
        components: {
            ErrorStatus
        }
    })
    export default class ProejctGuard extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() repositories!: any
        @Prop() properties!: any

        public project: any = null
        public projectProperty: Channel<any> = new ProxyChannel()

        private watcher = new SingleResourceWatcher()

        @Watch('$route.params.projectUuid', { immediate: true })
        public onIdChange (value: string, oldValue: string): void {
            this.watcher.withId(value)
            this.channel.dispatch({
                event: 'project@open',
                data: value
            })
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
    }
</script>

<style lang="scss"></style>
