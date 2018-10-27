<template>
    <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <slot name="bread"></slot>
            </nav>
        </div>
    </div>    
</template>

<style scope>
    
</style>

<script>
    export default {
        data(){
            return {
                msg: "面包屑组件"
            }
        }
    }
</script>