<template>
    <div class="card">
        <form @submit.prevent="save()" v-if="connection">
            <header class="card__header">Login to {{ connection.name }}</header>
            <div class="card__body">
                <constant-field
                    label="User"
                    :value="getUsername()"
                    :error="errors ? errors.host : ''"></constant-field>
                <input
                    style="display: none"
                    type="text"
                    name="username"
                    :value="getUsername()" />
                <password-field
                    :autofocus="true"
                    id="password"
                    label="Password"
                    :value="model.password"
                    :error="errors ? errors.password : ''"
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
        @Prop() readonly errors!: any

        public model: any = {
            password: ''
        }

        public cancel (): void {
            this.$emit('cancel')
        }

        public getUsername (): string {
            return this.connection.username + '@' + this.connection.host
        }

        public save (): void {
            this.$emit('submit', this.model.password)
        }
    }
</script>

<style lang="scss"></style>
