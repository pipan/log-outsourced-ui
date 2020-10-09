<template>
    <div class="list">
        <project-list-item
            v-for="item of projects"
            :key="item.uuid"
            :project="item"
            @open="$emit('open', $event)"
            @delete="$emit('delete', $event)">
        </project-list-item>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { ProjectEntity } from '@/lib/log-outsourced-api'
    import clipboardCopy from 'clipboard-copy'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import Contextmenu from '@/components/contextmenu/Contextmenu.vue'
    import ProjectListItem from '@/components/ProjectListItem.vue'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            Contextmenu,
            ProjectListItem
        }
    })
    export default class ProjectLayout extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() repositories!: any

        public projects: any[] = []

        public projectProperty: Channel<any> = new ProxyChannel()

        private watcher = new ListWatcher()

        public created (): void {
            this.channel.dispatch({
                event: 'project@load'
            })

            this.projectProperty.connectFn((items: any[]) => {
                this.projects = items
            })

            this.watcher.withRepository(this.repositories.projects)
                .withBinding(this.projectProperty)
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
