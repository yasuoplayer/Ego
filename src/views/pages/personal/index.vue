<template>
  <div class="personal">
    <tooBar/>
    <personalContent/>
    <foot/>
  </div>
</template>
<script>
import tooBar from "../../../components/tool-bar";
import foot from "../../../components/foot";
import personalContent from "./components/personal-content";
export default {
  name: "personal",
  data() {
    return {};
  },
  components: {
    tooBar,
    foot,
    personalContent
  },
    mounted()
  {
    if(!this.$store.state.userMsg.root!=0)
    {
      this.$router.push('/')
    }
  }
};
</script>
<style lang="scss" scoped>
</style>


