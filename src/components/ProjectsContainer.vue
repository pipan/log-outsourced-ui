<template>
    <section class="material__container">
        <button class="btn btn--forward bottom-m" @click="create()">
            <i class="material-icons md-18">add</i>
        </button>
        <project-list class="flex" v-bind:items="projects" @open="open($event)"></project-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { ProjectEntity } from '@/lib/log-outsourced-api'
    import ProjectList from './ProjectList.vue'

    @Component({
        components: {
            ProjectList
        }
    })
    export default class ProjectsContainer extends Vue {
        @Prop() readonly projects!: Array<ProjectEntity>;

        public open (project: ProjectEntity): void {
            this.$emit('open', project)
        }

        public create (): void {
            this.$emit('create')
        }
    }
</script>

<style lang="scss"></style>
