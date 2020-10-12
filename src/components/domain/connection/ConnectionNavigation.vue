<template>
    <div class="material__nav">
        <navigation-item
            text="Projects"
            icon="folder_open"
            :active="$route.meta.nav === 'project'"
            @select="open('project')">
        </navigation-item>
        <navigation-item
            text="Admins"
            icon="groups"
            class="top-lonly-m"
            :active="$route.meta.nav === 'administrator'"
            @select="open('administrator')">
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
    export default class ConnectionNavigation extends Vue {
        private map: {[key: string]: string} = {
            administrator: 'administrator.list',
            project: 'project.list'
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
