<template>
    <inline-context-menu
        ref="filterContext"
        icon="filter_list"
        :relative="true"
        :attantion="value !== ''">
        <input
            type="text"
            v-autofocus="true"
            @keydown.esc="onEsc()"
            :value="value"
            class="field__input field__input--auto left-s"
            @input="$emit('filter', $event.target.value)" />
    </inline-context-menu>
</template>

<script lang="ts">
    import InlineContextMenu from '@/components/contextmenu/InlineContextMenu.vue'
    import { Autofocus } from '@/directives/form/Autofocus'
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component({
        components: {
            InlineContextMenu
        },
        directives: {
            autofocus: new Autofocus()
        }
    })
    export default class FilterContextMenu extends Vue {
        @Prop({ default: '' }) readonly value!: string

        public add (): void {
            this.$emit('add')
        }

        public onEsc (): void {
            (this.$refs.filterContext as InlineContextMenu).close()
        }
    }
</script>

<style lang="scss"></style>
