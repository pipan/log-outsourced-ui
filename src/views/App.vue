<template>
    <div class="material">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import ProjectsContainer from '@/components/ProjectsContainer.vue'
    import { ProjectEntity } from '@/lib/log-outsourced'
    @Component({
        components: {
            ProjectsContainer
        }
    })
    export default class App extends Vue {
        public projects: Array<ProjectEntity> = [
            new ProjectEntity('001', 'one'),
            new ProjectEntity('002', 'two')
        ]
    }
</script>

<style lang="scss">
@import "../assets/scss/root.scss";
@import "../assets/scss/layout.scss";
@import "../assets/scss/card.scss";
@import "../assets/scss/list.scss";
@import "../assets/scss/button.scss";
@import "../assets/scss/composition.scss";
</style>
