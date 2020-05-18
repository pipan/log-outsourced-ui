<template>
    <div class="list">
        <project-list-item v-for="item of items" :key="item.getUuid()" :project="item" @open="open($event)" @delete="$emit('delete', $event)"></project-list-item>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { ProjectEntity } from '@/lib/log-outsourced-api'
    import ProjectListItem from './ProjectListItem.vue'

    @Component({
        components: {
            ProjectListItem
        }
    })
    export default class ProjectList extends Vue {
        @Prop() readonly items!: Array<ProjectEntity>;

        public open (project: ProjectEntity): void {
            this.$emit('open', project)
        }
    }
</script>

<style lang="scss"></style>
