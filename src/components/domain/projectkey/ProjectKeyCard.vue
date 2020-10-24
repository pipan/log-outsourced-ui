<template>
    <div class="card">
        <form @submit.prevent="save()">
            <header class="card__header">{{ title }}</header>
            <div class="card__body">
                <string-field
                    v-if="model"
                    id="name"
                    label="Name"
                    :value="innerModel.name"
                    :error="form.error ? form.error.name : ''"
                    @change="innerModel.name = $event"></string-field>
            </div>
            <footer class="card__footer">
                <button type="button" class="btn btn--secondary right-s" @click="cancel()">CANCEL</button>
                <button type="submit" class="btn btn--primary">SAVE</button>
            </footer>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import StringField from '@/components/form/StringField.vue'
    import { Channel } from '@wildebeest/observable'

    @Component({
        components: {
            StringField
        }
    })
    export default class ProjectKeyCard extends Vue {
        @Prop() readonly title!: string
        @Prop({ default: () => { return {} } }) model!: any
        @Prop({ default: () => { return {} } }) form!: any

        public innerModel: any = {}

        @Watch('model', { immediate: true })
        public onModelChange (value: any, oldValue: any): void {
            this.innerModel = {
                key: value.key,
                name: value.name
            }
        }

        public cancel (): void {
            this.$emit('cancel')
        }

        public save (): void {
            this.$emit('submit', this.innerModel)
        }
    }
</script>

<style lang="scss"></style>
