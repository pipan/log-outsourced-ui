<template>
    <div>
        <header class="material__header">
            <div class="flexbox-row space-between center flex flexfix">
                <button class="btn btn--secondary btn--circle material__header__back" @click="back()"><i class="material-icons md-18">arrow_back</i></button>
                <div class="material__header__title text-h2 text-ellipsis" v-if="project">{{ project.name }}</div>
            </div>
        </header>
        <project-navigation></project-navigation>
        <div class="material__body">
            <div class="material__container">
                <router-view
                    :project="project"></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import ProjectNavigation from '@/components/domain/project/ProjectNavigation.vue'
    import { SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            ProjectNavigation
        }
    })
    export default class ProjectLayout extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() store!: any
        @Prop() project!: any

        public back (): void {
            this.$router.push({
                name: 'project.list',
                params: this.$route.params
            })
        }
    }
</script>

<style lang="scss"></style>
