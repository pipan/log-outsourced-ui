<template>
    <div class="list">
        <div class="list__header">
            <h2>{{title}}</h2>
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
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component({})
    export default class FilteredList extends Vue {
        @Prop() readonly filter!: string
        @Prop() readonly title!: string

        public add (): void {
            this.$emit('add')
        }
    }
</script>

<style lang="scss"></style>
