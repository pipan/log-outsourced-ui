<template>
    <field :id="_uid" :label="label">
        <div class="flex flexbox-row end">
            <button type="button" class="btn btn--border" :class="getClass()" @click="$emit('action', $event)">{{ text }}</button>
        </div>
    </field>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import StringInput from './StringInput.vue'
    import Field from './Field.vue'

    @Component({
        components: {
            Field,
            StringInput
        }
    })
    export default class ButtonField extends Vue {
        @Prop({ default: '' }) readonly label!: string;
        @Prop({ default: '' }) readonly text!: string;
        @Prop({ default: '' }) readonly level!: string;

        public getClass (): any {
            if (this.level === '') {
                return []
            }
            return ['btn--' + this.level]
        }
    }
</script>

<style lang="scss"></style>
