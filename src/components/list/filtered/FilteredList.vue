<template>
    <div class="list">
        <div class="list__header">
            <h2>{{title}}</h2>
            <filter-context-menu
                v-if="filterAvailable"
                :value="filterValue"
                class="top-s"
                @filter="onFilter($event)"></filter-context-menu>
        </div>
        <slot></slot>
        <div class="list__footer">
            <button class="btn btn--secondary btn--square btn--small" @click="add()">
                <span class="material-icons">add</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import FilterContextMenu from '@/components/contextmenu/FilterContextMenu.vue'
    import { Autofocus } from '@/directives/form/Autofocus'
    import { Press } from '@/directives/form/Press'
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component({
        components: {
            FilterContextMenu
        },
        directives: {
            autofocus: new Autofocus(),
            press: new Press()
        }
    })
    export default class FilteredList extends Vue {
        @Prop() readonly filter!: string
        @Prop() readonly title!: string
        @Prop({ default: false }) readonly filterAvailable!: boolean

        public filterValue = ''

        public add (): void {
            this.$emit('add')
        }

        public onFilter (value: string): void {
            this.filterValue = value
            this.$emit('filter', value)
        }
    }
</script>

<style lang="scss"></style>
