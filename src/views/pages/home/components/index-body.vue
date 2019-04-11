<template>
    <div class="main">
    <firstScreen/>
    <phoneActivity/>
    <recommend/>
    </div>
</template>
<script>

import firstScreen from './first-screen'
import phoneActivity from './phone-activity'
import recommend from './recommend'
export default {
    name:'indexBody',
    data(){
        return {}
    },
    components:{
    
    firstScreen,
    phoneActivity,
    recommend,
    }
}
</script>

