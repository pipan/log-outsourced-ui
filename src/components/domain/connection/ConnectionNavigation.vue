<template>
    <div class="material__nav">
        <navigation-item
            text="Projects"
            icon="folder_open"
            :active="$route.name === 'connection'"
            @select="open('connection')">
        </navigation-item>
        <navigation-item
            text="Admins"
            icon="groups"
            class="top-lonly-m"
            :active="$route.name === 'administrators'"
            @select="open('administrators')">
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
        public open (routeName: string): void {
            if (this.$route.name === routeName) {
                return
            }
            this.$router.push({
                name: routeName,
                params: {
                    connectionId: this.$route.params.connectionId
                }
            })
        }
    }
</script>

<style lang="scss"></style>
