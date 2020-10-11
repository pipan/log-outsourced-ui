<template>
    <section>
        <div class="card">
            <form @submit.prevent="save()">
                <header class="card__header">Invite administrator</header>
                <div class="card__body">
                    <string-field
                        v-if="model"
                        id="username"
                        label="Username"
                        :value="model.username"
                        @change="model.username = $event"></string-field>
                </div>
                <footer class="card__footer">
                    <button type="button" class="btn btn--secondary right-s" @click="cancel()">CANCEL</button>
                    <button type="submit" class="btn btn--primary">INVITE</button>
                </footer>
            </form>
        </div>
    </section>
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
    export default class AdministratorCreate extends Vue {
        @Prop() readonly channel!: Channel<any>

        public model: any = {}

        public cancel (): void {
            this.$router.push({
                name: 'administrator.list',
                params: this.$route.params
            })
        }

        public save (): void {
            this.channel.dispatch({
                event: 'administrator@invite',
                data: {
                    body: {
                        username: this.model.username
                    },
                    success: (admin: any) => {
                        this.$router.push({
                            name: 'administrator.list',
                            params: this.$route.params
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
