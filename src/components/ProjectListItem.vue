<template>
    <div class="list__item">
        <div class="list__item__top flexbox-row">
            <div class="flex">{{ project.name }}</div>
            <button class="btn btn--primary" @click="open()">OPEN</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { ProjectEntity } from '@/lib/log-outsourced-api'

    @Component
    export default class ProjectListItem extends Vue {
        @Prop() readonly project!: any;

        open (): void {
            this.$emit('open', this.project)
        }
    }
</script>

<style lang="scss"></style>
