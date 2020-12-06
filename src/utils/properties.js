import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


export const languages = computed(() => {
    const store = useStore()
    return store.state["languages"]
});

export const questionsIsExists = _ => {
    const router = useRouter()
    const store = useStore()
    if (store.state.questions.list.length == 0) {
        router.push({ name: 'create' })
    }
}