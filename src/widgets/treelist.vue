<template>
  <ul class="treelist">
    <li class="parent" v-if="root.children.length" v-for="root in treenodes" type="root">
      <span class="treeitem" @click.stop="toggle">
        <span class="indicator"></span>
        <i v-if="root.icon" :class="root.icon"></i>
        <span>{{root.name}}</span>
        <label class="md-checkbox ml-auto">
          <input type="checkbox" name="items" :value="root.id" :disabled="root.name=='通知管理'" :checked="checked.includes(root.id) " @change="change"><i class="bg-themedark"></i> 全部
        </label>
      </span>
      <children :parent="root" :checked="checked"></children>
    </li>
    <li v-else>
      <label class="treeitem" >
        <label class="md-checkbox mr-1">
          <input type="checkbox" name="items" :value="root.id" :checked="checked.includes(root.id)" @change="change"><i class="bg-themedark"></i>
        </label>
        <i v-if="root.icon" :class="root.icon"></i>
        <span>{{root.name}}</span>
      </label>
    </li>
  </ul>
</template>
<!--
  树形列表, 目前用于权限树展示 (是否还有其它用途?)
-->
<script>
  import {closest} from '../misc/utils'
  /* 展开/收缩子元素 */
  function toggle (e) {
    e.currentTarget.parentNode.classList.toggle('open')
     var rheight=$("#right").height()
//     console.log(rheight +":1111111111111111")
      if($("#left").height() > $("#right").height()){
          $("#right").css("height",$("#left").height());
      }else{
          let  heihht_l=$("#right").height()+50;
          $("#left").css("height",heihht_l);
      }
  }
  /* 选中状态改变回调 */
  function change (e) {
    var checked = e.currentTarget.checked, parent = closest(e.currentTarget, 'li')
    parent.querySelectorAll('input').forEach(i => i.checked = checked) // 设置所有子节点为相同状态
    check_ancestors(parent, checked);
  }
  /****子input找最近的父input***/
//  function childFindPar(child){
//     return $(child).closest('li').find('input')[0];
//  }
  /* 递归设置祖先元素状态 */
  function check_ancestors (parent, checked) {
    if (parent.type == 'root') return  // 当前元素不为根元素时, 还需处理祖先节点的选中状态
    var siblings = parent.parentNode.childNodes, len = 0;
    siblings.forEach(s => s.querySelector('input').checked && len++)
    parent = closest(parent, 'li')
    parent.querySelector('input').checked = len >0?true:false;
    check_ancestors(parent, checked)
  }
  export default {
    name: 'treeview',
    props: {
      treenodes: Array,
      checked: {type: Array, default: () => []}
    },
    methods: {toggle, change},
    components: {
      children: {
        name: 'children',
        props: ['parent', 'checked'],
        template: `<ul>
          <li class="parent" v-if="child.children.length"  v-for="child in parent.children">
            <span class="treeitem" @click.stop="toggle">
              <span class="indicator"></span>
              <i v-if="child.icon" :class="child.icon"></i>
              <span>{{child.name}}</span>
              <label class="md-checkbox ml-auto">
              <input type="checkbox" name="items" :value="child.id" :checked="checked.includes(child.id)" @change="change"><i class="bg-themedark"></i> 全部
              </label>
            </span>
            <children :parent="child" :checked="checked"></children>
          </li>
          <li v-else>
            <label class="treeitem">
              <label class="md-checkbox mr-1">
                <input type="checkbox" name="items" :value="child.id" :disabled="child.name=='查看通知' || child.name=='编辑通知'" :checked="checked.includes(child.id)" @change="change"><i class="bg-themedark"></i>
              </label>
              <i v-if="child.icon" :class="child.icon"></i>
              <span>{{child.name}}</span>
            </label>
          </li>
        </ul>`,
        methods: {toggle, change}
      }
    }
  }
</script>