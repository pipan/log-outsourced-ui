<template>
    <div class="list__item" :class="{'list__item--active': active}" @click="select()">
        <div>{{ this.text }}</div>
        <simple-contextmenu
            :items="contexts"
            :value="value"
            @select="$emit($event.name, $event.value)">
        </simple-contextmenu>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import SimpleContextmenu from '../../contextmenu/SimpleContextmenu.vue'

    @Component({
        components: {
            SimpleContextmenu
        }
    })
    export default class SimpleListItem extends Vue {
        @Prop() readonly text!: string
        @Prop() readonly value!: any
        @Prop({ default: () => [] }) readonly contexts!: Array<string>
        @Prop({ default: false }) readonly active!: boolean

        select (): void {
            this.$emit('select', this.value)
        }
    }
</script>

<style lang="scss"></style>
