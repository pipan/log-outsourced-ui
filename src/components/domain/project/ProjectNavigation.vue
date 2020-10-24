<template>
    <div class="material__nav">
        <navigation-item
            text="Users"
            icon="person"
            :active="$route.meta.nav === 'user'"
            @select="open('user')">
        </navigation-item>
        <navigation-item
            text="Roles"
            icon="accessibility_new"
            class="top-lonly-m"
            :active="$route.meta.nav === 'role'"
            @select="open('role')">
        </navigation-item>
        <navigation-item
            text="Logging"
            icon="receipt_long"
            class="top-lonly-m"
            :active="$route.meta.nav === 'logging'"
            @select="open('logging')">
        </navigation-item>
        <navigation-item
            text="Settings"
            icon="settings"
            class="top-lonly-m"
            :active="$route.meta.nav === 'project.settings'"
            @select="open('settings')">
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
    export default class ProjectNavigation extends Vue {
        private map: {[key: string]: string} = {
            user: 'user.list',
            role: 'role.list',
            logging: 'logging.list',
            settings: 'projectkey.list'
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
