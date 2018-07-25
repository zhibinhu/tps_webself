<template>
    <ul class="treelist">
        <li :class="{'parent': root.children.length}" v-for="root in treenodes" type="root">
      <span class="treeitem" @click.stop="active">
        <i v-if="root.icon" :class="root.icon"></i>
        <span class="mr-2">{{root.name}}</span>
        <span class="mr-auto text-muted">{{root.code}}</span>
        <span class="indicator" @click.stop="toggle"></span>
      </span>
            <children v-if="root.children.length" :parent="root"></children>
        </li>
    </ul>
</template>
<!--
  权限树形列表
-->
<script>
    import {closest} from '../../misc/utils'

    function active(e) {
        var parent = closest(e.currentTarget, 'ul.treelist');
        parent.querySelectorAll('.treeitem').forEach(c => {
            c.classList.remove('active')
        });
        e.currentTarget.classList.add('active')
    }

    /* 展开/收缩子元素 */
    function toggle(e) {
        e.currentTarget.parentNode.parentNode.classList.toggle('open')
    }

    function go(item, ctx) {
        console.log(ctx)
    }

    export default {
        name: 'treeview',
        props: ['treenodes'],
        methods: {active, toggle, go},
        components: {
            children: {
                name: 'children',
                props: ['parent', 'checked'],
                template: `<ul>
          <li :class="{'parent': child.children.length}" v-for="child in parent.children">
            <span class="treeitem" @click.stop="active">
              <i v-if="child.icon" :class="child.icon"></i>
              <span class="mr-2">{{child.name}}</span>
              <span class="mr-auto text-muted">{{child.code}}</span>
              <span class="indicator" @click.stop="toggle"></span>
            </span>
            <children v-if="child.children.length" :parent="child"></children>
          </li>
        </ul>`,
                methods: {active, toggle, go}
            }
        }
    }
</script>

<style>
    .treeitem.active {
        background: #efefef;
    }

    .column {
        display: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none
    }

    .treeitem:hover .column {
        display: block
    }
</style>