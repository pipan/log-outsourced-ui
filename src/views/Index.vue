<template>
    <section class="material__container">
        <div class="flexbox-row center bottom-m">
            <h2 class="text-h2 flex">Projects</h2>
            <button class="btn btn--forward left-m" @click="create()">
                <i class="material-icons md-18">add</i>
            </button>
        </div>
        <project-list class="flex" v-bind:items="projects" @open="open($event)" @delete="deleteProject($event)"></project-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ProjectList from '@/components/ProjectList.vue'
    import { Channel } from '@wildebeest/observable'
    @Component({
        components: {
            ProjectList
        }
    })
    export default class Index extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() public queries!: any

        public project!: any

        public open (project: any): void {
            this.$router.push('/project?pid=' + project.identify())
        }

        public create (): void {
            this.$router.push('/create')
        }

        public deleteProject (project: any): void {
            this.channel.dispatch({
                event: 'project@delete',
                data: project
            })
        }
    }
</script>

<style lang="scss"></style>
