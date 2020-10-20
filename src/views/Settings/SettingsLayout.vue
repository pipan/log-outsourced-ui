<template>
    <div>
        <header class="material__header">
            <div class="flexbox-row space-between center flex flexfix">
                <button class="btn btn--secondary btn--circle material__header__back" @click="back()"><i class="material-icons md-18">arrow_back</i></button>
                <div class="material__header__title text-lonly--center">
                    <div class="text-h2 text-ellipsis">{{ project.name }}</div>
                    <div class="text--small text-ellipsis">{{ connection.username + '@' + connection.name }}</div>
                </div>
            </div>
        </header>
        <settings-navigation></settings-navigation>
        <router-view
            :project="project"></router-view>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import SettingsNavigation from '@/components/domain/settings/SettingsNavigation.vue'
    import { SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            SettingsNavigation
        }
    })
    export default class SettingsLayout extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() store!: any
        @Prop() project!: any
        @Prop() connection!: any

        public back (): void {
            this.$router.push({
                name: 'user.list',
                params: this.$route.params
            })
        }
    }
</script>

<style lang="scss"></style>
