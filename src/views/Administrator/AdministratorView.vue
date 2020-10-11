<template>
    <section>
        <filtered-list
            title="Administrators"
            @add="create()">
        </filtered-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import FilteredList from '@/components/list/filtered/FilteredList.vue'
    import SimpleListItem from '@/components/list/simple/SimpleListItem.vue'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            FilteredList,
            SimpleListItem
        }
    })
    export default class AdministratorView extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() repositories!: any

        public back (): void {
            this.$router.push('/')
        }

        public create (): void {
            console.log('create admin')
        }
    }
</script>

<style lang="scss"></style>
