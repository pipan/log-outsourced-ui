<template>
    <div class="nav__item" :class="{'nav__item--active': active}">
        <button class="btn btn--secondary btn--square btn-sonly--small btn-monly--small btn--fullwidth" @click="select()">
            <i class="material-icons">{{ icon }}</i>
            <div class="text text--small top-lonly-s">{{ text }}</div>
        </button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component({})
    export default class NavigationItem extends Vue {
        @Prop() icon!: string
        @Prop() text!: any
        @Prop({ default: false }) active!: boolean

        public select (): void {
            this.$emit('select')
        }
    }
</script>

<style lang="scss"></style>
