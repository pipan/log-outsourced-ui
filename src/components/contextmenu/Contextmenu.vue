<template>
    <div class="context context--right">
        <button class="btn btn--secondary btn--circle" type="button" @click="openContextmenu()">
            <i class="material-icons">more_vert</i>
        </button>
        <div class="context__menu" v-if="visible">
            <div class="context__menu__close">
                <button class="btn btn--secondary btn--circle" type="button" @click="closeContextmenu()">
                    <i class="material-icons">more_vert</i>
                </button>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component
    export default class Contextmenu extends Vue {
        public visible = false

        openContextmenu (): void {
            this.visible = true
        }

        closeContextmenu (): void {
            this.visible = false
        }
    }
</script>

<style lang="scss"></style>
