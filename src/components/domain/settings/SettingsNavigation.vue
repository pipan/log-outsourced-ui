<template>
    <div class="material__nav">
        <navigation-item
            text="Project"
            icon="folder_open"
            :active="$route.meta.nav === 'project'"
            @select="open('project')">
        </navigation-item>
        <navigation-item
            text="User"
            icon="person"
            class="top-lonly-m"
            :active="$route.meta.nav === 'user'"
            @select="open('user')">
        </navigation-item>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import NavigationItem from '@/components/navigation/NavigationItem.vue'

    @Component({
        components: {
            NavigationItem
        }
    })
    export default class SettingsNavigation extends Vue {
        private map: {[key: string]: string} = {
            user: 'settings.user',
            project: 'settings.project'
        }

        public open (navName: string): void {
            if (this.$route.meta.nav === navName) {
                return
            }
            this.$router.push({
                name: this.map[navName],
                params: this.$route.params
            })
        }
    }
</script>

<style lang="scss"></style>
