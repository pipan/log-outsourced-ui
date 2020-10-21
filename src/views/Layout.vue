<template>
    <div class="material">
        <header class="material__header">
            <div class="text-h2 material__header__title text-lonly--center">Outsourced</div>
        </header>
        <div class="material__body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component
    export default class Layout extends Vue {}
</script>

<style lang="scss"></style>
