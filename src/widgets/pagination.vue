<template>
  <div v-if="page.pageNumbers && page.pageNumbers.length > 1" class="pagination">
    <a class="page-link" :class="{active: page.pageNumber == item}" @click="paging(item)"
       v-for="item in page.ellipsisPageNumbers" v-text="item == 0 ? '...' : item"></a>
  </div>
  <div v-else-if="page.totalCount == 0" class="pagination"><img src="/static/img/empty.png"></div>
</template>
<!--
  分页组件
-->
<script>
  export default {
    name: 'pagination',
    props: {
      page: { // 分页对象
        type: Object,
        requried: true
      }
    },
    methods: {
      paging (pageno) {
        // 点击当前页或略过页(页数为0表示略过页)时,不触分页事件
        if (pageno === this.page.pageNumber || pageno === 0) {
          return
        }
        this.$emit('paging', pageno)
      }
    }
  }
</script>

<style>
  .page-link {
    border: 1px solid transparent !important;
    border-radius: .25rem;
    padding: .3rem .6rem;
    margin: 0 .25rem 0 0;
    font-size: .9375rem;
    position: relative;
  }
  .page-link:focus, .page-link:hover, .page-link.active {
    background-color: #eceeef;
    text-decoration: none
  }
</style>