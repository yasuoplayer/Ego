<template>
  <div class="personal">
    <tooBar/>
    <personalConntent/>
    <foot/>
  </div>
</template>
<script>
import tooBar from "../../../components/tool-bar";
import foot from "../../../components/foot";
import personalConntent from "./components/personal-content";
export default {
  name: "personal",
  data() {
    return {};
  },
  components: {
    tooBar,
    foot,
    personalConntent
  }
};
</script>
<style lang="scss" scoped>
</style>


