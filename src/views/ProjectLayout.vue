<template>
    <div>
        <header class="material__header">
            <div>{{ project.getName() }}</div>
        </header>
        <div class="material__body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { ProjectEntity } from '../lib/log-outsourced'
    @Component
    export default class ProjectLayout extends Vue {
        public project: ProjectEntity = new ProjectEntity('1234', 'Ovaldo')
    }
</script>

<style lang="scss"></style>
