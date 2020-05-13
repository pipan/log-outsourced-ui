<template>
    <section class="material__container flexbox-row start">
        <button class="btn btn--forward right-m">
            <i class="material-icons">add</i>
        </button>
        <project-list class="flex" v-bind:items="projects" @open="open($event)">
        </project-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { ProjectEntity } from '@/lib/log-outsourced'
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
    }
</script>

<style lang="scss"></style>
