<template>
    <v-toolbar
    src='../img/toolbar.png'>
    <v-btn @click="goTo('/')">Home</v-btn>
    </v-toolbar>
</template>

<script>

export default {
    data() {
        return {
            
        }
    },
    methods: {
        goTo(path)
        {
            this.$router.push(path);
        }
    }
}
</script>