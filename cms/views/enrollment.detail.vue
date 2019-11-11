<template>
    <div>
        <div style="overflow:hidden;background: #f5f7f9;padding-bottom:10px;padding-left:15px;">
            <router-link :to="{path:'/enrollment/list',query:{rid:race_id}}"><span style="color: #777;">报名管理</span>&nbsp;/</router-link>
            <a  style="color: #777;">报名详情</a>
        </div>
        <div style="padding:20px;" v-if="test">
           
            <Card style="width:550px" v-for="(athlete,index) in athletes" :key="index">
                <p slot="title">
                    <Icon type="ios-list" />
                     报名信息
                </p>
                <ul class="form-item-list">
                    <li>
                        <a>姓名</a>
                        <span>{{athlete.athlete_name}}</span>
                    </li>
                    <li>
                        <a>证件类型</a>
                        <span>{{identity_type_list[athlete.identity_type]}}</span>
                    </li>
                    <li>
                        <a>证件编号</a>
                        <span>{{athlete.identity_number}}</span>
                    </li>
                    <li>
                        <a>性别</a>
                        <span>{{gender_list[athlete.gender]}}</span>
                    </li>
                    <li>
                        <a>生日</a>
                        <span>{{athlete.athlete_name}}</span>
                    </li>
                    <li>
                        <a>手机号码</a>
                        <span>{{athlete.phone}}</span>
                    </li>
                    <li>
                        <a>紧急联系人</a>
                        <span>{{athlete.emergency_contact_name}}</span>
                    </li>
                    <li>
                        <a>紧急联系人电话</a>
                        <span>{{athlete.emergency_contact_phone}}</span>
                    </li>
                    <li>
                        <a>衣服尺寸</a>
                        <span>{{athlete.dress_size}}</span>
                    </li>
                    <li v-if="group_type == 1">
                        <a>完赛证明</a>
                        <span v-if="certificate"><a @click="certificate_visible = true">查看</a></span>
                        <span v-else>-</span>
                    </li>
                </ul>
            </Card>
        </div>
        <Modal title="完赛证明" v-model="certificate_visible">
            <img :src="certificate" v-if="certificate" style="width: 100%">
        </Modal>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                athletes:[],
                group_type: -1,
                certificate: '',
                race_id: '',
                certificate_visible: false,
                spinLoadingText: 'Loading',
                spinConfig:{
                    render: h => {
                        return h('div', [
                            h('Icon', {
                                class: 'demo-spin-icon-load',
                                props: {
                                    type: 'load-c',
                                    size: 18
                                }
                            }),
                            h('div', this.spinLoadingText)
                        ]);
                    }
                },
                gender_list:{
                    'male': '男',
                    'female': '女',
                },
                identity_type_list:{
                    '0': '身份证',
                    '1': '护照',
                    '2': '台胞证',
                    '3': '港澳通行证',
                },
                test: true
            };
        },
        computed: {
            eid(){
                return this.$route.query['id'];
            }
        },
        mounted() {
            if(this.eid){
                this.getDetail();
            }
        },
        methods: {
            getDetail(){
                this.spinLoadingText = 'Loading';
                this.$Spin.show(this.spinConfig);
                this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/sport/enrollment/detail',{params: {id: this.eid}}
                )
                .then(response => {
                    let res = response.data;
                    this.athletes = res.athletes || [];

                    this.group_type = res.group_type;
                    this.certificate = res.certificate;
                    this.race_id  = res.race_id;
                   
                    this.$Spin.hide();
                })
                .catch(() => {
                    this.$Spin.hide();
                });
            },

           
        }
    };
</script>
<style>
    .form-item-list {
        list-style: none;
    }
    .form-item-list li span {
        float: right;
        
    }
</style>