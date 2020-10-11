<template>
    <contextmenu
        ref="contextmenu"
        :relative="relative"
        v-if="items.length > 0">
        <button
            class="context__menu__item bottom-s"
            v-for="item of items"
            :key="item"
            @click="emit(item, $event)">{{ item }}</button>
    </contextmenu>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import Contextmenu from './Contextmenu.vue'

    @Component({
        components: {
            Contextmenu
        }
    })
    export default class SimpleContextmenu extends Vue {
        @Prop({ default: false }) public relative!: boolean
        @Prop({ default: () => [] }) public items!: any[]
        @Prop() public value!: any

        public emit (item: string, event: any): void {
            (this.$refs.contextmenu as Contextmenu).close()
            event.stopPropagation()
            const snakeCase = item.toLowerCase().replaceAll(' ', '_')
            this.$emit('select', {
                name: snakeCase,
                value: this.value
            })
        }
    }
</script>

<style lang="scss"></style>
