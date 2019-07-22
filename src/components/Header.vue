<template>
    <div class="x-custom-header">{{title}}</div>
</template>

<script>
    export default {
        name: "Header",
        props: {
            title: {
                type: String,
                default: ""
            }
        }
    }
</script>

<style scoped lang="scss">
    .x-custom-header{
        height: 50px;
        box-sizing: border-box;
        font-size: 18px;
        font-weight: bold;
        padding: 10px;
        position: relative;
        background-color: #fff;
        &:after{
            content: " ";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            border-bottom: 1px solid #ddd;
        }
    }
</style>
