<template>
    <div class="material">
        <header class="material__header">
            <div>Log Outsourced</div>
        </header>
        <div class="material__body">
            <projects-container :projects="projects" @open="open($event)"></projects-container>
            <section class="material__container">
                <div class="card">
                    <header class="card__header">Title</header>
                    <div class="card__body"></div>
                    <footer class="card__footer">
                        <button class="btn btn--secondary right-s">CANCEL</button>
                        <button class="btn btn--primary">SAVE</button>
                    </footer>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ProjectsContainer from '@/components/ProjectsContainer.vue'
    import { ProjectEntity } from '../lib/log-outsourced'

    @Component
    export default class ProjectDetail extends Vue {}
</script>

<style lang="scss"></style>
