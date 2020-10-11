<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { ProjectEntity } from '@/lib/log-outsourced-api'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import Contextmenu from '@/components/contextmenu/Contextmenu.vue'
    import { SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            Contextmenu
        }
    })
    export default class ProjectLayout extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() repositories!: any

        public project: any = null

        public projectProperty: Channel<any> = new ProxyChannel()

        private watcher = new SingleResourceWatcher()

        @Watch('$route.params.projectUuid', { immediate: true })
        public onUuidChange (value: string, oldValue: string): void {
            this.channel.dispatch({
                event: 'project@open',
                data: value
            })
        }

        public created (): void {
            this.projectProperty.connectFn((project: any) => {
                this.project = project
            })

            this.watcher.withRepository(this.repositories.projects)
                .withBinging(this.projectProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public back (): void {
            this.$router.push('/')
        }
    }
</script>

<style lang="scss"></style>
