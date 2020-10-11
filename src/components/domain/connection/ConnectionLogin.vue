<template>
    <div class="card">
        <form @submit.prevent="save()" v-if="connection">
            <header class="card__header">Login to {{ connection.name }}</header>
            <div class="card__body">
                <constant-field
                    label="User"
                    :value="connection.username + '@' + connection.host"></constant-field>
                <password-field
                    id="password"
                    label="Password"
                    :value="model.password"
                    :error="auth.error.message"
                    @change="model.password = $event"></password-field>
            </div>
            <footer class="card__footer">
                <button type="button" class="btn btn--secondary right-s" @click="cancel()">CANCEL</button>
                <button type="submit" class="btn btn--primary">LOGIN</button>
            </footer>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import PasswordField from '@/components/form/PasswordField.vue'
    import ConstantField from '@/components/form/ConstantField.vue'

    @Component({
        components: {
            PasswordField,
            ConstantField
        }
    })
    export default class ConnectionLogin extends Vue {
        @Prop() readonly connection!: any
        @Prop() readonly auth!: any

        public model: any = {
            password: ''
        }

        public cancel (): void {
            this.$emit('cancel')
        }

        public save (): void {
            this.$emit('submit', this.model.password)
        }
    }
</script>

<style lang="scss"></style>
