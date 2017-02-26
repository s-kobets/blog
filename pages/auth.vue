<template>
  <form>
  	<input type="text" name="name">
  	<input type="password" name="password">
  	<button type="submit">submit</button>
  </form>
</template>

<script>
import axios from 'axios';

// export default {
//   data () {
//     return axios.post(`/signin`)
//     	.then((res) => res.data);
//     }
// }
</script>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>