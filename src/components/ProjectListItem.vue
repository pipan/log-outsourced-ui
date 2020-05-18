<template>
    <div class="list__item">
        <div class="list__item__top">
            <div>{{ project.getName() }}</div>
        </div>
        <contextmenu>
            <button class="context__menu__item top-s" @click="$emit('delete', project)">Delete</button>
        </contextmenu>
        <div class="list__item__bottom flexbox-row end center">
            <button class="btn btn--primary" @click="open()">OPEN</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { ProjectEntity } from '@/lib/log-outsourced-api'
    import Contextmenu from './contextmenu/Contextmenu.vue'

    @Component({
        components: {
            Contextmenu
        }
    })
    export default class ProjectListItem extends Vue {
        @Prop() readonly project!: ProjectEntity;

        open (): void {
            this.$emit('open', this.project)
        }
    }
</script>

<style lang="scss"></style>
