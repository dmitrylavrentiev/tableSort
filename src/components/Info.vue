<template>
    <div class="info">
        <div class="info__name">name - {{item.name}}</div>
        <div class="info__location">location - {{item.location}}</div>
        <div class="info__currency">currency - {{item.currency}}</div>
    </div>
</template>

<script>
    export default {
        name: 'Info',
        props: ['item']
    }
</script>
