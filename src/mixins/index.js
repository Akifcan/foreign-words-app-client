export const globalMixin = {
    computed: {
        user() {
            return this.$store.getters['Auth/user']
        },
        authMessage() {
            return this.$store.getters['Auth/message']
        }
    }
}