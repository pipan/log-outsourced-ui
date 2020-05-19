<template>
    <section class="material__container">
        <div class="flexbox-row center bottom-m">
            <h2 class="text-m flex">Projects</h2>
            <button class="btn btn--forward left-m" @click="$emit('create')">
                <i class="material-icons md-18">add</i>
            </button>
        </div>
        <project-list class="flex" v-bind:items="projects" @open="$emit('open', $event)" @delete="$emit('delete', $event)"></project-list>
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
    }
</script>

<style lang="scss"></style>
