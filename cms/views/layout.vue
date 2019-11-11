<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
}
.layout-logo {
    height: 40px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 20px;
    color: #fff;
    line-height: 30px;
    text-align: center;
}
.layout-logo img {
    display: inline-block;
    vertical-align: top;
}
.layout-logo span {
    display: inline-block;
    vertical-align: middle;
    line-height: 40px;
    font-size: 15px;
    color: #fff;
}
.layout-nav {
    width: 420px;
    margin: 0 auto;
}
.layout-assistant {
    width: 300px;
    margin: 0 auto;
    height: inherit;
}
.layout-breadcrumb {
    padding: 10px 15px 0;
}
.layout-content {
    min-height: 400px;
    margin: 15px;
  
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}
.layout-content-main {
    padding: 10px;
}
.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
.layout-ceiling {
    overflow: hidden;
}
.layout-ceiling-main {
    float: right;
    margin-right: 15px;
}
.layout-ceiling-main a,  .statistic {
    color: #fff;
}
.statistic{
    padding-right: 20px;
}
/*.ivu-breadcrumb span.breadcrumb-item {
    line-height: 40px;
    height: 40px;
    display: inline-block;
    width: 80px;
    text-align: center;
    color: #a0a0a0;
    font-size: 15px;
}*/
.ivu-breadcrumb > span:last-child {
    font-weight: normal;
}
.ivu-breadcrumb > span.active {
  /*  background: #e7e7e7;*/
    color: #a0a0a0;
    font-weight: 700
}
</style>
<style type="text/css">
.layout .ivu-menu-dark {
    background: #FEA000;
}
.ivu-breadcrumb span.breadcrumb-item .ivu-breadcrumb-item-separator {
   /* display: none;*/
}
.navbar {
    margin-bottom: 5px;
    overflow: visible;
}
.navbar-inner {
    min-height: 40px;
    padding-right: 20px;
    padding-left: 20px;
    background-color: #fafafa;
    background-image: -moz-linear-gradient(top,#fff,#f2f2f2);
    background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#f2f2f2));
    background-image: -webkit-linear-gradient(top,#fff,#f2f2f2);
    background-image: -o-linear-gradient(top,#fff,#f2f2f2);
    background-image: linear-gradient(to bottom,#fff,#f2f2f2);
    background-repeat: repeat-x;
 /*   border: 1px solid #d4d4d4;*/
  /*  -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;*/
    border-bottom: 1px solid #d4d4d4;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff',endColorstr='#fff2f2f2',GradientType=0);
    -webkit-box-shadow: 0 1px 4px rgba(0,0,0,0.065);
    -moz-box-shadow: 0 1px 4px rgba(0,0,0,0.065);
    box-shadow: 0 1px 4px rgba(0,0,0,0.065);
}
.navbar .nav {
    position: relative;
    left: 0;
    display: block;
    float: left;
    margin: 0 10px 0 0;
}
.navbar .nav>li {
    float: left;
    line-height: 20px;
    list-style: none;
}

.navbar .nav>li>a {
    float: none;
    padding: 10px 15px 10px;
    color: #777;
    text-decoration: none;
    text-shadow: 0 1px 0 #fff;
}
.navbar .nav>.active>a, .navbar .nav>.active>a:hover, .navbar .nav>.active>a:focus {
    color: #555;
    text-decoration: none;
    background-color: #e5e5e5;
    -webkit-box-shadow: inset 0 3px 8px rgba(0,0,0,0.125);
    -moz-box-shadow: inset 0 3px 8px rgba(0,0,0,0.125);
    box-shadow: inset 0 3px 8px rgba(0,0,0,0.125);
}
.nav>li>a {
    display: block;
}

.avatar-menu{
    display: inline-block;
    cursor: pointer;
    color: #fff;
}


</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"><span>上海中心垂马网站后台管理系统</span></div>
             <div class="layout-ceiling">
                    <div class="layout-ceiling-main">
                        <span class="statistic">当前访问垂马网站人数总计：{{uv}}</span>
                        
                        <Dropdown trigger="click" @on-click="handelMenuClick">
                            <div class="avatar-menu">
                                <Avatar  size="large" >{{account.name}}</Avatar>
                                <Icon type="md-more" />
                            </div>
                            <DropdownMenu slot="list">
                                <DropdownItem name="password">修改密码</DropdownItem>
                                <DropdownItem name="create" v-if="createEnable">创建用户</DropdownItem>
                                <DropdownItem name="logout">退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <a href="javascript:void(0)" @click="logout"><span></span>&nbsp;&nbsp;退出登录</a> 
                    </div>
            </div>
            <div class="layout-nav">
            </div>
        </Menu>
      <!--   <Menu mode="horizontal" active-name="1">
            <div class="layout-assistant">
                <MenuItem name="1">二级导航</MenuItem>
                <MenuItem name="2">二级导航</MenuItem>
                <MenuItem name="3">二级导航</MenuItem>
            </div>
        </Menu> -->
  <!--       <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/user/list"   class="breadcrumb-item" :class="{'active':currentRouter=='user.list'}">用户</BreadcrumbItem>
                <BreadcrumbItem href="/parking/list" class="breadcrumb-item" :class="{'active':currentRouter=='parking.list'}">停车场</BreadcrumbItem>
                <BreadcrumbItem href="/parking/list" class="breadcrumb-item" :class="{'active':currentRouter=='parking.list'}">车位</BreadcrumbItem>
                <BreadcrumbItem href="/parking/list" class="breadcrumb-item" :class="{'active':currentRouter=='parking.list'}">车牌</BreadcrumbItem>
                <BreadcrumbItem href="/parking/list" class="breadcrumb-item" :class="{'active':currentRouter=='parking.list'}">订单</BreadcrumbItem>
                <BreadcrumbItem href="/parking/list" class="breadcrumb-item" :class="{'active':currentRouter=='parking.list'}">优惠</BreadcrumbItem>
                <BreadcrumbItem href="/parking/list" class="breadcrumb-item" :class="{'active':currentRouter=='parking.list'}">内容</BreadcrumbItem>
                <BreadcrumbItem href="/parking/list" class="breadcrumb-item" :class="{'active':currentRouter=='parking.list'}">设备</BreadcrumbItem>
                <BreadcrumbItem href="/parking/list" class="breadcrumb-item" :class="{'active':currentRouter=='parking.list'}">设备</BreadcrumbItem>
            </Breadcrumb>
        </div> -->

        <div class="navbar">
          <div class="navbar-inner">
            <ul class="nav">
              <li  :class="{'active':currentRouter=='content'}"><a href="#/">内容管理</a></li>
              <li  :class="{'active':currentRouter=='tournament'}"><a href="#/tournament">赛事管理</a></li>
              <li  :class="{'active':currentRouter=='users'}"><a href="#/users">用户管理</a></li>
             <!--  <li  :class="{'active':currentRouter=='setting'}"><a href="#/setting">系统设置</a></li> -->
            </ul>
          </div>
        </div>

        <div class="layout-content">
            <router-view></router-view>
        </div>
        <div class="layout-copy">
            2011-{{year}}&copy; 
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            roles: [],
            year: new Date().getFullYear(),
            uv: ''
        };
    },
    computed: {
        ...mapState({
            account: state => state.account,
            createEnable: state => state.account.role === 'admin',
        }),
        currentRouter(){
            return this.$route.name;
        }
    },
    watch:{
        // $route (to, from) {
        //     this.currentRouter=to.name;
        // }
    },
    created() {
        this.$http
            .get(
                this.$root.$options.baseURI +
                    '/shcenter/api/statistics/uv',{params : {} }
            )
            .then(response => {
                let res = response.data;
                this.uv = res.uv.toString().replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','));
                
            })
            .catch(() => {
             
            });
    },
    methods: {
        handelMenuClick(menu){
            if(menu === 'logout') {
                this.$router.push('/login');
            }
            if(menu === 'password') {
                this.$router.push('/password/change');
            }
            if(menu === 'create') {
                this.$router.push('/user/create');
            }
        },
        logout() {
            this.$router.push('/login');
        }
    }
};
</script>
