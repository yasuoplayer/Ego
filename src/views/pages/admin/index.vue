<template>
  <div class="admin">
    <tooBar/>
    <adminContent/>
    <foot/>
  </div>
</template>
<script>
import tooBar from "../../../components/tool-bar";
import foot from "../../../components/foot";
import adminContent from "./components/admin-content";
export default {
  name: "admin",
  data() {
    return {};
  },
  components: {
    tooBar,
    foot,
    adminContent
  },
  mounted()
  {
    console.log(!this.$store.state.userMsg.root)
    if(!this.$store.state.userMsg.root)
    {
      this.$router.push('/')
    }
  }
};
</script>
<style lang="scss" scoped>
</style>


