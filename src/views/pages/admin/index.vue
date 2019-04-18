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
  }
};
</script>
<style lang="scss" scoped>
</style>


