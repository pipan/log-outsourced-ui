<template>
    <div class="card">
        <form @submit.prevent="save()">
            <header class="card__header">{{ title }}</header>
            <div class="card__body">
                <string-field
                    v-if="model"
                    id="name"
                    label="Name"
                    :value="model.name"
                    :error="form.error ? form.error.name : ''"
                    @change="model.name = $event"></string-field>
            </div>
            <footer class="card__footer">
                <button type="button" class="btn btn--secondary right-s" @click="cancel()">CANCEL</button>
                <button type="submit" class="btn btn--primary">SAVE</button>
            </footer>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import StringField from '@/components/form/StringField.vue'
    import { Channel } from '@wildebeest/observable'

    @Component({
        components: {
            StringField
        }
    })
    export default class ProjectCard extends Vue {
        @Prop() readonly title!: string
        @Prop({ default: () => { return {} } }) model!: any
        @Prop({ default: () => { return {} } }) form!: any

        public cancel (): void {
            this.$emit('cancel')
        }

        public save (): void {
            this.$emit('submit', this.model)
        }
    }
</script>

<style lang="scss"></style>
