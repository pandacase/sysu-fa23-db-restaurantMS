<script>
// @ is an alias to /src
import SearchBox from '@/components/SearchBox.vue'

export default {
  name: 'OrderMSView',
  components: {
    SearchBox
  }
}
</script>

<template>
  <div class="orderMS">
    <SearchBox/>
  </div>
</template>
