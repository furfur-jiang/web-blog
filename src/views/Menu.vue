<template>
  <div class="head">
    <Menu mode="horizontal" :theme="theme1" active-name="1" style="display:flex">
        <img alt="logo" src="../assets/offer (2).svg" style="padding:10px">
        <MenuItem name="1">
            <Icon type="ios-paper" />
            内容管理
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people" />
            用户管理
        </MenuItem>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats" />
                统计分析
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="ios-construct" />
            综合设置
        </MenuItem>
    </Menu>
    <div class="content">
     <Tabs value="name1"  style="width:960px;overflow-y:auto">
        <TabPane label="标签一" name="name1">标签一的内容</TabPane>
        <TabPane label="标签二" name="name2">标签二的内容</TabPane>
        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
    </Tabs>
    </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                
            }
        }
    }
</script>
<style lang="css" scoped>
.menu:after{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #dcdee2;
    position: absolute;
    bottom: 0;
    left: 0;
}
/deep/ .ivu-menu-item-active{
  border-bottom:0px!important;
}
/deep/ .ivu-menu-item-selected{
  border-bottom:0px!important;
}
.content{
  display: flex;
    flex-direction: column;
    align-items: center;
    
}
</style>
