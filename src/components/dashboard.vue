<template>
    <!--物理师首页-->
    <div class="card p-2" v-if="roleName=='物理师'">
        <div class="row" style="margin: 20px 0 0;">
            <div class="col-md-6">
                <div class="card" id="secondCardw" style="border: 1px solid #5abfdd;margin-bottom: 10px;">
                    <div class="card-header card-inverse card-info" style="font-weight: bolder;padding: 4px;">
                        <div class="row">
                            <div class="col-md-5" style="line-height: 38px">靶区勾画任务</div>
                            <div class="col-md-7  input-group">
                                <input name="target_keyword" v-model="target_keyword" class="form-control"
                                       placeholder="请输入病历号或者姓名" style="font-weight: normal"
                                       @keyup.enter="targetquery(1)">
                                <span class="input-group-btn">
                        <button class="btn  btn-success rounded ml-auto" type="button" v-on:click="targetquery(1)"><i
                                class="fa fa-search"></i> 查询</button>
                      </span>
                            </div>
                        </div>
                    </div>
                    <div class="card-block" style="padding: 0;margin: 6px;">
                        <div class="layer-loading" v-show="target_loading"><i></i><i></i><i></i></div>
                        <table class="table table-advanced table-hover treetable table-bordered"
                               ref="treetable">
                            <thead>
                            <tr>
                                <th @click="targetsort('patientHospno')">病历号<i
                                        :class="{fa:true,'fa-arrow-up':target_sortType=='asc'&&target_sortField=='patientHospno','fa-arrow-down':target_sortType=='desc'&&target_sortField=='patientHospno'}"></i>
                                </th>
                                <th @click="targetsort('patientName')">姓名<i
                                        :class="{fa:true,'fa-arrow-up':target_sortType=='asc'&&target_sortField=='patientName','fa-arrow-down':target_sortType=='desc'&&target_sortField=='patientName'}"></i>
                                </th>
                                <th @click="targetsort('applyName')">靶区勾画人<i
                                        :class="{fa:true,'fa-arrow-up':target_sortType=='asc'&&target_sortField=='applyName','fa-arrow-down':target_sortType=='desc'&&target_sortField=='applyName'}"></i>
                                </th>
                                <th @click="targetsort('t.status')">当前状态<i
                                        :class="{fa:true,'fa-arrow-up':target_sortType=='asc'&&target_sortField=='t.status','fa-arrow-down':target_sortType=='desc'&&target_sortField=='t.status'}"></i>
                                </th>
                                <th class="text-xs-center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in targetPage.items" :key="item.id" :id="item.id">
                                <td>
                                    <router-link :to="'/patient/' + item.patientId">
                                        <div class="shorterNo">{{item.patientHospno | to-short }}</div>
                                    </router-link>
                                </td>
                                <td>
                                    <div class="shorterName">{{item.patientName | to-short}}</div>
                                </td>
                                <td>{{item.applyName | to-short}}</td>
                                <td>
                                    <span v-show="item.status==0">新增</span>
                                    <span v-show="item.status==1">已保存</span>
                                    <span v-show="item.status==2 && item.applyDocid == current">待接收</span>
                                    <span v-show="item.status==2 && item.applyDocid != current">已提交</span>
                                    <span v-show="item.status==3">已接收</span>
                                    <span v-show="item.status==4">已拒绝</span>
                                    <span v-show="item.status==5">待审核</span>
                                    <span v-show="item.status==6">审核不通过</span>
                                    <span v-show="item.status==7">已完成</span>
                                </td>
                                <td class="text-xs-center">
                                    <router-link :to="'/target/detail/' + item.id" v-show="item.receiveOrNot==1"
                                                 :id="'look_'+item.id"><i class="fa fa fa-eye"></i>查看
                                    </router-link>
                                    <!--<a  @click="reveiveTarget()" v-show="item.receiveOrNot==0" style="color: red"><i class="fa fa-check" ></i>接受 </a>-->
                                    <a :id="'receive_'+item.id" data-toggle="modal"
                                       @click="reveiveTarget(item.id)" data-target="#receiveOrRefuse" href=""
                                       style="color: red" :data-id="item.id" v-show="item.receiveOrNot==0"> <i
                                            class="fa fa-check"></i>接受 </a>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                        <v-pagination :cur.sync="target_cur" :all.sync="target_all" :count.sync="target_count"
                                      :curIndex_s.sync="curIndex_s" @listen="targetpaging"></v-pagination>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card" id="thirdCardw" style="border: 1px solid #5abfdd;margin-bottom: 10px;">
                    <div class="card-header card-inverse card-info" style="font-weight: bolder;padding: 4px;">
                        <div class="row">
                            <div class="col-md-5" style="line-height: 38px">计划设计任务</div>
                            <div class="col-md-7  input-group">
                                <input name="planning_keyword" v-model="planning_keyword" class="form-control"
                                       placeholder="请输入病历号或者姓名" style="font-weight: normal"
                                       @keyup.enter="planningquery(1)">
                                <span class="input-group-btn">
                        <button class="btn  btn-success rounded ml-auto" type="button" v-on:click="planningquery(1)"><i
                                class="fa fa-search"></i> 查询</button>
                      </span>
                            </div>
                        </div>
                    </div>
                    <div class="card-block" style="padding: 0;margin: 6px;">
                        <div class="layer-loading" v-show="planning_loading"><i></i><i></i><i></i></div>
                        <table class="table table-advanced table-hover treetable table-bordered"
                               ref="treetable">
                            <thead>
                            <tr>
                                <th @click="planningsort('patientHospno')">病历号<i
                                        :class="{fa:true,'fa-arrow-up':planning_sortType=='asc'&&planning_sortField=='patientHospno','fa-arrow-down':planning_sortType=='desc'&&planning_sortField=='patientHospno'}"></i>
                                </th>
                                <th @click="planningsort('patientName')">姓名<i
                                        :class="{fa:true,'fa-arrow-up':planning_sortType=='asc'&&planning_sortField=='patientName','fa-arrow-down':planning_sortType=='desc'&&planning_sortField=='patientName'}"></i>
                                </th>
                                <th @click="planningsort('physicsName')">计划设计人<i
                                        :class="{fa:true,'fa-arrow-up':planning_sortType=='asc'&&planning_sortField=='physicsName','fa-arrow-down':planning_sortType=='desc'&&planning_sortField=='physicsName'}"></i>
                                </th>
                                <th @click="planningsort('t.status')">当前状态<i
                                        :class="{fa:true,'fa-arrow-up':planning_sortType=='asc'&&planning_sortField=='t.status','fa-arrow-down':planning_sortType=='desc'&&planning_sortField=='t.status'}"></i>
                                </th>
                                <th class="text-xs-center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in planPage.items" :key="item.id">
                                <td>
                                    <router-link :to="'/patient/' + item.patientId">
                                        <div class="shorterNo">{{item.patientHospno | to-short }}</div>
                                    </router-link>
                                </td>
                                <td>
                                    <div class="shorterName">{{item.patientName | to-short }}</div>
                                </td>
                                <td>{{item.physicsName | to-short }}</td>
                                <td>
                                    <span v-show="item.status==0">新增</span>
                                    <span v-show="item.status==1">已保存</span>
                                    <span v-show="item.status==2 && item.physicsId == current">待接收</span>
                                    <span v-show="item.status==2 && item.physicsId != current">已提交</span>
                                    <span v-show="item.status==3">已接收 </span>
                                    <span v-show="item.status==4">待上级评估</span>
                                    <span v-show="item.status==5">待验证</span>
                                    <span v-show="item.status==6">已完成</span>
                                    <span v-show="item.status==7">已拒绝</span>
                                    <span v-show="item.status==8">已作废</span>
                                    <span v-show="item.status==9">待本院评估</span>
                                    <span v-show="item.status==15">审核不通过</span>
                                    <span v-show="item.status==16">验证不通过</span>
                                </td>
                                <td class="text-xs-center">
                                    <router-link :to="'/planning/detail/' + item.id+'?suid='+item.suid+'&nowImageId='+item.imageId+''"><i class="fa fa-eye"></i>查看计划
                                    </router-link>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                        <v-pagination :cur.sync="planning_cur" :all.sync="planning_all"
                                      :count.sync="planning_count" :curIndex_s.sync="curIndex_s"
                                      @listen="planningpaging"></v-pagination>
                    </div>
                </div>
            </div>

            <!-- 接受   拒绝    取消 -->
            <div id="receiveOrRefuse" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button class="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-title" style="text-align: center;font-size: 16px">
                            <!--<h3 class="text-center">您是否负责该患者的质控管理？</h3>-->
                            您是否负责该患者的质控管理？
                        </div>
                        <div class="modal-body">
                            <form class="form-group" @submit.prevent="done">
                                <div class="form-group">
                                </div>
                                <div class="form-group">
                                </div>
                                <div style="text-align: center">
                                    <a class="btn btn-primary btn-sm" style="font-size: 16px" data-toggle="modal"
                                       data-target="#receive" href=""> <span style="color: white">接受</span></a>
                                    <!--<button class="btn btn-primary" type="submit">接受</button>-->
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <a class="btn btn-danger btn-sm" style="font-size: 16px" data-toggle="modal"
                                       data-target="#refuse" href=""> <span style="color: white">拒绝</span></a>
                                    <!--<a class="btn btn-danger"  @click="refuse()"><span style="color: white">拒绝</span></a>-->
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <button class="btn btn-danger btn-sm" style="font-size: 16px" data-dismiss="modal">
                                        取消
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div id="receive" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button class="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-title" style="text-align: center;font-size: 16px">
                            请确认您将负责该患者的指控管理，<br>确认后患者治疗各个节点，您将收到短信提醒。
                        </div>
                        <div class="modal-body">
                            <form class="form-group" @submit.prevent="done">
                                <div class="form-group">
                                </div>
                                <div class="form-group">
                                </div>
                                <div style="text-align: center">
                                    <a class="btn btn-primary btn-sm" @click="receive()" style="font-size: 16px"><span
                                            style="color: white">接受</span></a>
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <button class="btn btn-danger btn-sm" style="font-size: 16px" data-dismiss="modal">
                                        取消
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div id="refuse" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button class="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-title" style="text-align: center;font-size: 20px">
                            请确认您将拒绝该患者的指控管理，<br>
                            确认后该患者的质控管理工作将分配至其他物理师。
                        </div>
                        <div class="modal-body">
                            <form class="form-group" @submit.prevent="done">
                                <div class="form-group">
                                </div>
                                <div class="form-group">
                                </div>
                                <div style="text-align: center">
                                    <a class="btn btn-primary btn-sm" @click="refuse()"><span
                                            style="color: white">拒绝</span></a>
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <button class="btn btn-danger btn-sm" data-dismiss="modal">取消</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--管理员首页-->
    <div class="card p-3" v-else-if="roleName.indexOf('管理员') > 0">
        <div class="row adminRow" style="margin: 20px 0 0; height: 57%; min-height: 310px">
            <div class="col-md-4" style="font-size: 16px; border-right: 1px solid #999;" v-if="hosInfo.hosType != 0">
                <!--<h4 style="text-align: center">这里显示各医院情况</h4>-->
                <span style="width: 100%; display: inline-block; text-align: center; margin-top: 2px; font-size: 20px">
                    医院统计数据
                </span><br/><br/>
                <div class="row" style="font-weight:bold;color:#666;">
                    <span>医院数量</span>
                </div>
                <div class="row" style="padding:10px 0;">
                    <div class="col-md-6" v-if="this.hosInfo.hosType == 2">
                        <span>上级医院: {{hosInfo.unionNum}}个</span>
                    </div>
                    <div class="col-md-6">
                        <span>下级医院: {{hosInfo.lowerNum}}个</span>
                    </div>
                </div>
                <div class="row" style="font-weight:bold;color:#666;">
                    <span>医生数据</span>
                </div>
                <div class="row" style="padding:10px 0;" v-if="this.hosInfo.hosType == 2">
                    <div class="col-md-6">
                        <span>上级医生: {{hosInfo.unionDoc}}人</span>
                    </div>
                    <div class="col-md-6">
                        <span>上级物理师: {{hosInfo.unionPhy}}人</span>
                    </div>
                </div>
                <div class="row" style="padding:10px 0;" v-if="this.hosInfo.hosType == 1">
                    <div class="col-md-6">
                        <span>本院医生: {{hosInfo.localDoc}}人</span>
                    </div>
                    <div class="col-md-6">
                        <span>本院物理师: {{hosInfo.localPhy}}人</span>
                    </div>
                </div>
                <div class="row" style="padding:10px 0;">
                    <div class="col-md-6">
                        <span>下级医生: {{hosInfo.lowerDoc}}人</span>
                    </div>
                    <div class="col-md-6">
                        <span>下级物理师: {{hosInfo.lowerPhy}}人</span>
                    </div>
                </div>
            </div>
            <div class="col-md-4" style="font-size: 16px;" v-else>
                <span style="width: 100%; display: inline-block; text-align: center; margin-top: 2px;font-size: 20px;">
                    医院统计数据
                </span><br/><br/>
                <div class="row" style="height: 55px;">
                    <span>上级医院</span>
                </div>
                <div class="row" style="height: 55px">
                    <div class="col-md-12">
                        <span>医院名: {{hosInfo.upperName}}</span>
                    </div>
                </div>
                <div class="row" style="height: 55px">
                    <span>医生数据</span>
                </div>
                <div class="row" style="height: 55px">
                    <div class="col-md-6">
                        <span>本院医生: {{hosInfo.localDoc}}人</span>
                    </div>
                    <div class="col-md-6">
                        <span>本院物理师: {{hosInfo.localPhy}}人</span>
                    </div>
                </div>
                <div class="row" style="height: 55px">
                    <div class="col-md-6">
                        <span>上级医生: {{hosInfo.upperDoc}}人</span>
                    </div>
                    <div class="col-md-6">
                        <span>上级物理师: {{hosInfo.upperPhy}}人</span>
                    </div>
                </div>
            </div>

            <div class="col-md-4" style="">
                <span style="width: 100%; display: inline-block; text-align: left;margin-left:50px; margin-top: 2px; font-size: 20px">
                    放疗设计进行中患者数量
                </span>
                <div style="width: 340px; height: 280px; display: inline-block; text-align: center" v-if="total2 == 0">
                    <div style="height: 43%"></div>
                    <span style="font-size: 22px">没有放疗设计进行中的患者!</span>
                </div>
                <div id="planCount" :style="{width: '340px', height: '280px'}" v-else></div>
            </div>
            <div class="col-md-4" style="">
                <span style="width: 100%; display: inline-block; text-align: left;margin-left:50px; margin-top: 2px; font-size: 20px">
                     放疗设计已完成患者数量
                </span>
                <div style="width: 340px; height: 280px; display: inline-block; text-align: center" v-if="total == 0">
                    <div style="height: 43%"></div>
                    <span style="font-size: 22px">没有放疗设计已完成的患者!</span>
                </div>
                <div id="patientPlan" :style="{width: '340px', height: '280px'}" v-else></div>
            </div>
        </div>
        <div class="row adminRow" style="margin-left: 0;margin-right: 0;margin-bottom: 0; height: 42%">
            <div class="col-md-12">
                <div id="weekCount" :style="{width: '1080px', height: '290px'}"></div>
            </div>
        </div>
    </div>
    <!--医生及其它-->
    <div class="card p-2" v-else>
        <div class="row" style="margin: 20px 0 0;">
            <div class="col-md-6">
                <div class="card" id="secondCard" style="border: 1px solid #5abfdd;margin-bottom: 10px;">
                    <div class="card-header card-inverse card-info" style="font-weight: bolder;padding: 4px;">
                        <div class="row">
                            <div class="col-md-5" style="line-height: 38px">靶区勾画任务</div>
                            <div class="col-md-7  input-group">
                                <input name="target_keyword" v-model="target_keyword" class="form-control"
                                       placeholder="请输入病历号或者姓名" style="font-weight: normal"
                                       @keyup.enter="targetquery(1)">
                                <span class="input-group-btn">
                        <button class="btn  btn-success rounded ml-auto" type="button" v-on:click="targetquery(1)"><i
                                class="fa fa-search"></i> 查询</button>
                      </span>
                            </div>
                        </div>
                    </div>
                    <div class="card-block" style="padding: 0;margin: 6px;">
                        <div class="layer-loading" v-show="target_loading"><i></i><i></i><i></i></div>
                        <table class="table table-advanced table-hover treetable table-bordered"
                               ref="treetable">
                            <thead>
                            <tr>
                                <th @click="targetsort('patientHospno')">病历号<i
                                        :class="{fa:true,'fa-arrow-up':target_sortType=='asc'&&target_sortField=='patientHospno','fa-arrow-down':target_sortType=='desc'&&target_sortField=='patientHospno'}"></i>
                                </th>
                                <th @click="targetsort('patientName')">姓名<i
                                        :class="{fa:true,'fa-arrow-up':target_sortType=='asc'&&target_sortField=='patientName','fa-arrow-down':target_sortType=='desc'&&target_sortField=='patientName'}"></i>
                                </th>
                                <th @click="targetsort('applyName')">靶区勾画人<i
                                        :class="{fa:true,'fa-arrow-up':target_sortType=='asc'&&target_sortField=='applyName','fa-arrow-down':target_sortType=='desc'&&target_sortField=='applyName'}"></i>
                                </th>
                                <th @click="targetsort('t.status')">当前状态<i
                                        :class="{fa:true,'fa-arrow-up':target_sortType=='asc'&&target_sortField=='t.status','fa-arrow-down':target_sortType=='desc'&&target_sortField=='t.status'}"></i>
                                </th>
                                <th class="text-xs-center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in targetPage.items" :key="item.id">
                                <td>
                                    <router-link :to="'/patient/' + item.patientId">
                                        <div class="shorterNo">{{item.patientHospno | to-short }}</div>
                                    </router-link>
                                </td>
                                <td>
                                    <div class="shorterName">{{item.patientName | to-short}}</div>
                                </td>
                                <td>{{item.applyName | to-short}}</td>
                                <td>
                                    <span v-show="item.status==0">新增</span>
                                    <span v-show="item.status==1">已保存</span>
                                    <span v-show="item.status==2 && item.applyDocid == current">待接收</span>
                                    <span v-show="item.status==2 && item.applyDocid != current">已提交</span>
                                    <span v-show="item.status==3">已接收</span>
                                    <span v-show="item.status==4">已拒绝</span>
                                    <span v-show="item.status==5">待审核</span>
                                    <span v-show="item.status==6">审核不通过</span>
                                    <span v-show="item.status==7">已完成</span>
                                </td>
                                <td class="text-xs-center">
                                    <router-link :to="'/target/detail/' + item.id+'?suid='+item.suid"><i class="fa fa fa-eye"></i>查看
                                    </router-link>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                        <v-pagination :cur.sync="target_cur" :all.sync="target_all" :count.sync="target_count"
                                      :curIndex_s.sync="curIndex_s" @listen="targetpaging"></v-pagination>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card" id="thirdCard" style="border: 1px solid #5abfdd;margin-bottom: 10px;">
                    <div class="card-header card-inverse card-info" style="font-weight: bolder;padding: 4px;">
                        <div class="row">
                            <div class="col-md-5" style="line-height: 38px">计划设计任务</div>
                            <div class="col-md-7  input-group">
                                <input name="planning_keyword" v-model="planning_keyword" class="form-control"
                                       placeholder="请输入病历号或者姓名" style="font-weight: normal"
                                       @keyup.enter="planningquery(1)">
                                <span class="input-group-btn">
                        <button class="btn  btn-success rounded ml-auto" type="button" v-on:click="planningquery(1)"><i
                                class="fa fa-search"></i> 查询</button>
                      </span>
                            </div>
                        </div>
                    </div>
                    <div class="card-block" style="padding: 0;margin: 6px;">
                        <div class="layer-loading" v-show="planning_loading"><i></i><i></i><i></i></div>
                        <table class="table table-advanced table-hover treetable table-bordered"
                               ref="treetable">
                            <thead>
                            <tr>
                                <th @click="planningsort('patientHospno')">病历号<i
                                        :class="{fa:true,'fa-arrow-up':planning_sortType=='asc'&&planning_sortField=='patientHospno','fa-arrow-down':planning_sortType=='desc'&&planning_sortField=='patientHospno'}"></i>
                                </th>
                                <th @click="planningsort('patientName')">姓名<i
                                        :class="{fa:true,'fa-arrow-up':planning_sortType=='asc'&&planning_sortField=='patientName','fa-arrow-down':planning_sortType=='desc'&&planning_sortField=='patientName'}"></i>
                                </th>
                                <th @click="planningsort('physicsName')">计划设计人<i
                                        :class="{fa:true,'fa-arrow-up':planning_sortType=='asc'&&planning_sortField=='physicsName','fa-arrow-down':planning_sortType=='desc'&&planning_sortField=='physicsName'}"></i>
                                </th>
                                <th @click="planningsort('t.status')">当前状态<i
                                        :class="{fa:true,'fa-arrow-up':planning_sortType=='asc'&&planning_sortField=='t.status','fa-arrow-down':planning_sortType=='desc'&&planning_sortField=='t.status'}"></i>
                                </th>
                                <th class="text-xs-center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in planPage.items" :key="item.id">
                                <td>
                                    <router-link :to="'/patient/' + item.patientId">
                                        <div class="shorterNo">{{item.patientHospno | to-short }}</div>
                                    </router-link>
                                </td>
                                <td>
                                    <div class="shorterName">{{item.patientName | to-short }}</div>
                                </td>
                                <td>{{item.physicsName | to-short }}</td>
                                <td>
                                    <span v-show="item.status==0">新增</span>
                                    <span v-show="item.status==1">已保存</span>
                                    <span v-show="item.status==2 && item.physicsId == current">待接收</span>
                                    <span v-show="item.status==2 && item.physicsId != current">已提交</span>
                                    <span v-show="item.status==3">已接收 </span>
                                    <span v-show="item.status==4">待上级评估</span>
                                    <span v-show="item.status==5">待验证</span>
                                    <span v-show="item.status==6">已完成</span>
                                    <span v-show="item.status==7">已拒绝</span>
                                    <span v-show="item.status==8">已作废</span>
                                    <span v-show="item.status==9">待本院评估</span>
                                    <span v-show="item.status==15">审核不通过</span>
                                    <span v-show="item.status==16">验证不通过</span>
                                </td>
                                <td class="text-xs-center">
                                    <router-link :to="'/planning/detail/' + item.id+'?suid='+item.suid+'&nowImageId='+item.imageId+''"><i class="fa fa-eye"></i>查看计划
                                    </router-link>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                        <v-pagination :cur.sync="planning_cur" :all.sync="planning_all"
                                      :count.sync="planning_count" :curIndex_s.sync="curIndex_s"
                                      @listen="planningpaging"></v-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    import $ from 'jquery'
    import {mapState} from 'vuex'
    import {Patient, Target, Planning, User, Notice, Fills, Image, Plan} from '../resources'
    import changelog from '../assets/changelog'
    import paginations from '../widgets/paginations.vue'
    import {debounce, pause, showResponse} from '../misc/utils'
    import swal from 'sweetalert'
    import $store from '../vuex/store'
    let storage = localStorage;

    export default {
        data: () => ({
            page: {},


            colors: ['success', 'info', 'danger', 'primary', 'warning', ''],
            changelog: changelog,

            current: User.current().id,
            roleName: User.current().roleName,

            patient_cur: 1,
            curIndex_s: 1,
            num_count: 0,
            patient_sortField: null,
            patient_sortType: null,
            patient_loading: 0,
            patient_keyword: '',

            target_sortField: null,
            target_sortType: null,
            target_loading: 0,
            target_keyword: '',
            target_cur: 1,

            planning_sortField: null,
            planning_sortType: null,
            planning_loading: 0,
            planning_keyword: '',
            planning_cur: 1,
            //放疗设计进行中患者数量
            getOptionPatientPlan: {
                title: {
                    text: '总人数',
                    subtext: '',
                    subtextStyle:{
                        color:'#1775ea',
                        fontWeight:'bold',
                        fontSize:'15px'
                    },
                    x: 'center',
                    y: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                    textStyle: {
                        fontSize: 20
                    }
                },
                color: ['#48cda6', '#fd87ab', '#11abff', '#ffdf33', '#968ade', '#c64fcd', '#202FCD'],
                legend: {
                    bottom: '5px',
                    data: [],
                    type: 'scroll'
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    top: '20px',
                    right:'20px',
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true,
                            optionToContent: function(opt) {
//                                console.log((opt));
                                var axisData = opt.series[0].data;
                                var table = '<table style="width:100%;text-align:left"><tbody><tr>'
                                    + '<th>医院</th>'
                                    + '<th>人数</th>'
                                    + '</tr>';
                                for (var i = 0, l = axisData.length; i < l; i++) {
                                    var value=axisData[i].value==undefined?0:axisData[i].value;
                                    table += '<tr>'
                                        + '<td>' + axisData[i].name + '</td>'
                                        + '<td>' + value + '</td>'
                                        + '</tr>';
                                }
                                table += '</tbody></table>';
                                return table;
                            }
                        },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'center',
                                    max: 1548
                                }
                            }
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                series: [{
                    name: '数据来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        },
                    },
                    data: []
                }]
            },
            //进行中计划患者数量
            getOptionPlanCount: {
                title: {
                    text: '总计划数',
                    subtext: '',
                    subtextStyle:{
                        color:'#1775ea',
                        fontWeight:'bold',
                        fontSize:'15px'
                    },
                    x: 'center',
                    y: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                    textStyle: {
                        fontSize: 20
                    }
                },
                color: ['#48cda6', '#fd87ab', '#11abff', '#ffdf33', '#968ade', '#c64fcd', '#202FCD'],
                legend: {
//                    orient: 'vertical',
//                    x: 'left',
                    bottom: '5px',
                    data: [],
                    type:'scroll'
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    top: '20px',
                    right:'20px',
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true,
                            optionToContent: function(opt) {
//                                console.log((opt));
                                var axisData = opt.series[0].data;
                                var table = '<table style="width:100%;text-align:left"><tbody><tr>'
                                    + '<th>医院</th>'
                                    + '<th>人数</th>'
                                    + '</tr>';
                                for (var i = 0, l = axisData.length; i < l; i++) {
                                    var value=axisData[i].value==undefined?0:axisData[i].value;
                                    table += '<tr>'
                                        + '<td>' + axisData[i].name + '</td>'
                                        + '<td>' + value + '</td>'
                                        + '</tr>';
                                }
                                table += '</tbody></table>';
                                return table;
                            }
                        },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'center',
                                    max: 1548
                                }
                            }
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                series: [{
                    name: '数据来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        },
                    },
                    data: []
                }]
            },
            //本周已完成计划数量
            getOptionWeekCount: {
                title: {
                    text: '本周已完成任务数量',
                    left: '42%',
                    textStyle: {
                        fontSize: 20,
                        fontWeight: 'lighter'
                    }
                },
                color: ["#283AFF","orange"],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    top: '10px',
                    right: '5%',
                    data: []
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    top: '10%',
                    right:'20px',
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true,
                            optionToContent: function (opt) {
                                let axisData = opt.xAxis[0].data;
                                let series = opt.series;
                                //表头
                                let table = '<table style="width:100%;text-align:center"><tbody><tr>'
                                    + '<td>日期</td>';
                                for (let i = 0; i < series.length - 1; i++) {
                                    table += '<td>' + series[i].name + '</td>';
                                }
                                table += '<td>' + series[series.length - 1].name + '</td>'
                                    + '</tr>';
                                //表中数据
                                for (let i = 0, l = axisData.length; i < l; i++) {
                                    table += '<tr>'
                                        + '<td>' + axisData[i] + '</td>';
                                    for (let j = 0; j < series.length - 1; j++) {
                                        table += '<td>' + series[j].data[i] + '</td>';
                                    }
                                    table += '<td>' + series[series.length - 1].data[i] + '</td>'
                                        + '</tr>';
                                }
                                table += '</tbody></table>';
                                return table;
                            }
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']

                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }],
                yAxis: [
                    {
                        type: 'value',
                        minInterval:1
                    }
                ],
                series: []
            },
            //医院统计数据
            hosInfo: {
                hosType: '',
                unionNum: '',
                lowerNum: '',
                unionDoc: '',
                unionPhy: '',
                lowerDoc: '',
                lowerPhy: '',
                upperName: '',
                localDoc: '',
                localPhy: '',
                upperDoc: '',
                upperPhy: ''
            },
            //完成计划总数
            total: 0,
            total2: 0,
            selectedTargetId: 0,
            patient: {},
            barGaps:['30%']
        }),

        beforeRouteEnter(to, from, next) {
            next(() => {
                var windowHeight = $(window).height();
                var firstHeight = windowHeight - 80;
                var secondHeight = (windowHeight - 105) / 2;
                $("#secondCard").css({
                    "height": secondHeight,
                    "max-height": secondHeight,
                    "min-height":"300px",
                    "overflow-y": "hidden",
                    "overflow-x": "hidden"
                });
                $("#thirdCard").css({
                    "height": secondHeight,
                    "max-height": secondHeight,
                    "min-height":"300px",
                    "overflow-y": "hidden",
                    "overflow-x": "hidden"
                });
                $("#firstCardw").css({
                    "height": firstHeight,
                    "min-height": secondHeight,
                    "overflow-y": "auto",
                    "overflow-x": "hidden"
                });
                $("#secondCardw").css({
                    "height": secondHeight,
                    "max-height": secondHeight,
                    "min-height":"300px",
                    "overflow-y": "hidden",
                    "overflow-x": "hidden"
                });
                $("#thirdCardw").css({
                    "height": secondHeight,
                    "max-height": secondHeight,
                    "min-height":"300px",
                    "overflow-y": "hidden",
                    "overflow-x": "hidden"
                });
                $("#thirthCard").css({
                    "height": firstHeight,
                    "max-height": firstHeight,
                    "overflow-y": "auto",
                    "overflow-x": "hidden"
                });
            })
        },
      computed:{
        ...mapState([
          'patientPage',
          'patient_all',
          'patient_count',
          'target_all',
          'target_count',
          'targetPage',
          'planning_all',
          'planning_count',
          'planPage',
        ])
      },
        mounted() {
            this.$store.state.isLoading = false
            //绑定模态框展示的方法
            $('#exampleModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget) // 触发事件的按钮
                var recipient = button.data('whatever') // 解析出whatever内容
                var modal = $(this)  //获得模态框本身
                modal.find('.modal-title').text('Message To ' + recipient)  //更改将title的text
                modal.find('.modal-body input').val(recipient)
            })
        },

        created() {
            Notice.getUnreadCount().then(data => {
                $store.state.noticeCount = data.data.data;
                if (storage.getItem('count') == null) {
                    storage.setItem('count', $store.state.noticeCount);
                }
            });
            var vm = this;
            if (this.roleName.indexOf("管理员") > 0) {
                this.getHosInfo();
                this.getPlanCount();
                this.getPatientPlan();
                this.getWeekPlanCount();
            } else {
                // if (this.roleName != "物理师") {
//                Patient.query().then(response => {
//                    vm.patientPage = response.data
//                    vm.patient_all = parseInt(vm.patientPage.totalCount % vm.patientPage.pageSize == 0 ? vm.patientPage.totalCount / vm.patientPage.pageSize : vm.patientPage.totalCount / vm.patientPage.pageSize + 1)
//                    vm.patient_count = vm.patientPage.totalCount
//
//                    vm.$nextTick(() => vm.$store.state.isLoading = false)
//                })
//                Target.query({status: 100, ps: 3}).then(response => {
//                    vm.targetPage = response.data
//                    vm.target_all = parseInt(vm.targetPage.totalCount % vm.targetPage.pageSize == 0 ? vm.targetPage.totalCount / vm.targetPage.pageSize : vm.targetPage.totalCount / vm.targetPage.pageSize + 1)
//                    vm.target_count = vm.targetPage.totalCount
//
//
//                    vm.$nextTick(() => vm.$store.state.isLoading = false)
//                })
//                //}
//                Planning.query({status: 100, ps: 3}).then(response => {
//                    vm.planPage = response.data
//                    vm.planning_all = parseInt(vm.planPage.totalCount % vm.planPage.pageSize == 0 ? vm.planPage.totalCount / vm.planPage.pageSize : vm.planPage.totalCount / vm.planPage.pageSize + 1)
//                    vm.planning_count = vm.planPage.totalCount
//
//
//                    vm.$nextTick(() => vm.$store.state.isLoading = false)
//                })
            }
        },

        methods: {

            patientpaging(pn, cb) {  // 分页查询
              let this$1 = this
              this$1.patient_loading = 1
                Patient.query({
                    keyword: this$1.patient_keyword,
                    pn: pn || 1,
                    sort: (this$1.patient_sortField != undefined && this$1.patient_sortField != null && this$1.patient_sortField != '') ? (this$1.patient_sortField + ' ' + this$1.patient_sortType) : ''
                }).then(response => {
                  let patientPage = response.data
                  let patient_all = parseInt(patientPage.totalCount % patientPage.pageSize == 0 ? patientPage.totalCount / patientPage.pageSize : patientPage.totalCount / patientPage.pageSize + 1)
                  let patient_count = patientPage.totalCount
                  this$1.$store.dispatch('updatePatientPage',{patientPage})
                  this$1.$store.dispatch('updatePatient_all',{patient_all})
                  this$1.$store.dispatch('updatePatient_count',{patient_count})
                  this$1.patient_loading = 0
                  this$1.curIndex_s = this$1.curIndex_ss
                    cb && cb()
                })
            },

          targetpaging(pn, cb) {  // 分页查询
            let this$1 = this
            this$1.target_loading = 1
            Target.query({
              keyword: this$1.target_keyword,
              status: 100,
              pn: pn || 1,
              ps: 3,
              sort: (this$1.target_sortField != undefined && this$1.target_sortField != null && this$1.target_sortField != '') ? (this$1.target_sortField + ' ' + this$1.target_sortType) : ''
            }).then(response => {
              let targetPage = response.data
              let target_all = parseInt(targetPage.totalCount % targetPage.pageSize == 0 ? targetPage.totalCount / targetPage.pageSize : targetPage.totalCount / targetPage.pageSize + 1)
              let target_count = targetPage.totalCount
              this$1.$store.dispatch('updateTargetPage',{targetPage})
              this$1.$store.dispatch('updateTarget_all',{target_all})
              this$1.$store.dispatch('updateTarget_count',{target_count})
              this$1.target_loading = 0
              cb && cb()
            })
          },
          planningpaging(pn, cb) {  // 分页查询
            let this$1 = this
            this$1.planning_loading = 1
            Planning.query({
              keyword: this.planning_keyword,
              status: 100,
              pn: pn || 1,
              ps: 3,
              sort: (this$1.planning_sortField != undefined && this$1.planning_sortField != null && this$1.planning_sortField != '') ? (this$1.planning_sortField + ' ' + this$1.planning_sortType) : ''
            }).then(response => {
              let planPage = response.data
              let planning_all = parseInt(planPage.totalCount % planPage.pageSize == 0 ? planPage.totalCount / planPage.pageSize : planPage.totalCount / planPage.pageSize + 1)
              let planning_count = planPage.totalCount
              this$1.$store.dispatch('updatePlanPage',{planPage})
              this$1.$store.dispatch('updatePlanning_all',{planning_all})
              this$1.$store.dispatch('updatePlanning_count',{planning_count})
              this$1.planning_loading = 0
              cb && cb()
            })
          },
            patientsort(field) {
                this.patient_sortField = field;
                this.patient_sortType = this.patient_sortType == 'asc' ? 'desc' : 'asc';
                this.patientpaging(1);
            },
            targetsort(field) {
                this.target_sortField = field;
                this.target_sortType = this.target_sortType == 'asc' ? 'desc' : 'asc';
                this.targetpaging(1);
            },
            planningsort(field) {
                this.planning_sortField = field;
                this.planning_sortType = this.planning_sortType == 'asc' ? 'desc' : 'asc';
                this.planningpaging(1);
            },

            patientquery(id) {
                this.patient_cur = 1
                this.patient_loading = 1
                this.curIndex_ss = id
                this.patientpaging(1)
                this.num_count = this.num_count + 1
                let patient_keyword = this.patient_keyword
                var checkedYeMa = document.getElementById("activedYeMa")
                var checkedYeMaValue = checkedYeMa.getAttribute("value")
                if (checkedYeMaValue > 0) {
                    let nowCheckedYeMa = "yema" + checkedYeMaValue
                    let nowCheckedYeMaId = checkedYeMaValue
                    $(".active").removeClass("active");
                    let frontYeMas = document.getElementById("frontYeMa")
                    frontYeMas.setAttribute("class", "page-button-disabled");
                    let yemaId = document.getElementById("yema1")
                    yemaId.setAttribute("class", "active")

                }
                if (patient_keyword == '') {
                    let yemaId = document.getElementById("yema1")
                    yemaId.setAttribute("class", "active")
                }
//              if( this.num_count>=2){
//                  let yemaId=document.getElementById("yema1")
//                  yemaId.setAttribute("class","active")
//                  console.log("++++++++++++++++++++333333333333333333333+++++++++++++++++++++++++++++===")
//              }

            },
            targetquery(id) {
                this.target_cur = 1

                this.target_loading = 1
                this.curIndex_s = id
                this.targetpaging(1)

            },
            planningquery(id) {
                this.planning_cur = 1

                this.planning_loading = 1
                this.curIndex_s = id
                this.planningpaging(1)

            },
            remove(id, index) {
                pause(this, Patient, id, this.patientPage.items, index, '停用')
            },
            renew(id, index) {
                pause(this, Patient, id, this.patientPage.items, index, '激活')
            },

            //新需求首页报表部分

            //医院统计数据
            getHosInfo() {
                Fills.getHosInfo().then((res) => {
                    let info = res.data.data;
                    this.hosInfo.hosType = info.hosType;
                    if (info.hosType === 0) {
                        //下级医院
                        this.hosInfo.upperName = info.upperName;
                        this.hosInfo.localDoc = info.localDoc;
                        this.hosInfo.localPhy = info.localPhy;
                        this.hosInfo.upperDoc = info.upperDoc;
                        this.hosInfo.upperPhy = info.upperPhy;
                    } else if (info.hosType === 1) {
                        //上级医院
                        this.hosInfo.lowerNum = info.lowerNum;
                        this.hosInfo.localDoc = info.localDoc;
                        this.hosInfo.localPhy = info.localPhy;
                        this.hosInfo.lowerDoc = info.lowerDoc;
                        this.hosInfo.lowerPhy = info.lowerPhy;
                    } else {
                        //系统管理员
                        this.hosInfo.unionNum = info.unionNum;
                        this.hosInfo.lowerNum = info.lowerNum;
                        this.hosInfo.unionDoc = info.unionDoc;
                        this.hosInfo.unionPhy = info.unionPhy;
                        this.hosInfo.lowerDoc = info.lowerDoc;
                        this.hosInfo.lowerPhy = info.lowerPhy;
                    }
                })
            },
            //本年度已完成计划患者数量
            getPatientPlan() {
                Fills.getHosCircle({userId: User.current().id}).then((res) => {
                    let array = res.data.data.data;
                    this.getOptionPatientPlan.title.subtext = res.data.data.total;
                    this.total = res.data.data.total;
                    console.log('res=========',res);
                    if (res.data.data.total != 0 && array.value != 0) {
                        for (let i = 0; i < array.length; i++) {
                            this.getOptionPatientPlan.series[0].data.push(array[i]);
                            this.getOptionPatientPlan.legend.data.push(array[i].name)
                        }
                    }
                    this.$nextTick(function () {
                        this.drawPatientPlan()
                    })
                })
            },
            //本年度进行中计划患者数量
            getPlanCount() {
                Fills.getHosCircle1().then((res) => {
                    let array = res.data.data.data;
                    this.getOptionPlanCount.title.subtext = res.data.data.total;
                    this.total2 = res.data.data.total;
                    console.log(res,'rrrrrrrrrrrrrrrrrreeeeeeeeeeeeeessssssssssss')
                    if (res.data.data.total != 0) {
                        for (let i = 0; i < array.length; i++) {
                            this.getOptionPlanCount.series[0].data.push(array[i]);
                            this.getOptionPlanCount.legend.data.push(array[i].name)
                        }
                    }
                    this.$nextTick(function () {
                        this.drawPlanCount()
                    })
                })
            },
            //本周已完成计划数量
            getWeekPlanCount() {
                Fills.getWeekCount().then((res) => {
                    console.log("当前周数据-----------------" + JSON.stringify(res))
                    let array = res.data.data.data
                    console.log('array---------',array)
                    this.getOptionWeekCount.xAxis[0].data=res.data.data.xAxis;
                    for (let i = 0; i < array.length; i++) {
                        array[i].stack='';
                        this.getOptionWeekCount.series.push(array[i])
                        this.getOptionWeekCount.legend.data.push(array[i].name)
                    }
                    this.$nextTick(function () {
                        this.drawWeekCount()
                    })
                })
            },

            drawPatientPlan() {//已完成
                let patientPlan = document.getElementById("patientPlan");
                if (patientPlan) {
                    let myChart1 = window.echarts.init(patientPlan);
//                    myChart1.setOption(this.getOptionPlanCount);
                    myChart1.setOption(this.getOptionPatientPlan);
                }
            },

            drawPlanCount() {//进行中
                let planCount = document.getElementById("planCount");
                if (planCount) {
                    let myChart2 = window.echarts.init(planCount);
                    myChart2.setOption(this.getOptionPlanCount);
//                    myChart2.setOption(this.getOptionPatientPlan);
                }
            },

            drawWeekCount() {
                let weekCount = document.getElementById("weekCount");
                if (weekCount) {
                    let myChart3 = window.echarts.init(weekCount);
                    myChart3.setOption(this.getOptionWeekCount);
                }
            },

            showImages(item) {
                Image.patientImages({hospno: item.hospno}).then(res => {
                    let imageIds = res.data;
                    //暂时默认一个病人只有一个影像文件，一对多待添加
                    if (imageIds.length > 0) {
                        let imageId = imageIds[0];
                        return this.$router.push('/image/detail/' + imageId)
                    } else {
                        swal('该病人没有影像!', '没有影像文件', 'error')
                    }
                })
            },

            done() {
                swal({
                    type: 'success',
                    title: '请确认您将负责该患者的指控管理，确认后患者治疗各个节点，您将收到短信提醒。',
                    text: '',
                    showCancelButton: true,
                    confirmButtonText: '接受',
                    cancelButtonText: '取消',
                    confirmButtonColor: '#DD6B55',
                    showLoaderOnConfirm: true,
                    closeOnConfirm: false
                }, confirmed => {
                    if (confirmed) {
                        vm.loading = true
                        resource.delete(id).then(response => {
                            vm.loading = false
                            console.log(JSON.stringify(response.data))
                            if (response.data.success) {
                                swal({type: 'success', title: '已删除!', text: '您指定的记录已被删除.'}, confirmed => {
                                    if (confirmed) {
                                        return vm.$router.back()
                                    }
                                })
                            } else {
                                swal('删除失败!', response.data.msg, 'error')
                            }
                        }, response => {
                            swal('操作失败', response.data.msg, 'error')
                            vm.loading = false
                        }).catch(error => {
                            swal('操作失败', error, 'error')
                            vm.loading = false
                        })
                    }
                })
            },
            refuse() {
                Target.refuse(this.selectedTargetId).then(response => {
                    this.cancelPopups();
                    console.log(response)
                    showResponse(response, () => window.location.reload())
                })

            },
            receive() {
                Target.phyreceive(this.selectedTargetId).then(response => {
                    this.cancelPopups();
                    if (response.data.success) {
                        return swal({type: 'success', title: '操作成功', text: '您的操作已经执行成功!'}, () => {
                            var id1 = "look_" + this.selectedTargetId
                            var id2 = "receive_" + this.selectedTargetId
                            $("#" + id1).css("display", "block");
                            $("#" + id2).css("display", "none");
                            this.$router.push("/")
                        })
                    }
                    if (response.data.errors) {
                        toastr.warning(Object.keys(response.data.errors).map(k => response.data.errors[k]).join('<br>'))
                    }
                    if (response.data.msg) {
                        swal('操作失败', response.data.msg, 'error')
                    }
                    fail && fail()
                })
            },
            cancelPopups() {
                $(".modal-backdrop").css("opacity", "0");
                $(".modal-backdrop").css("display", "none");
                $("#receiveOrRefuse").css("display", "none");
                $("#receive").css("display", "none");
                $("#refuse").css("display", "none");
            },
            reveiveTarget(id) {
                this.selectedTargetId = id;
            },
            openPatient(patient) {
                this.patient = patient;
            },
            goImageDetail(suid) {
                Image.getBySuid({suid: suid}).then(response => {
                    let image = response.data;
                    let imageId = image.id;
                    if (imageId != 0) {
                        this.$router.push('/image/detail/' + imageId);
                    } else {
                        swal("没有影像", "该靶区勾画没有对应的影像", "error");
                    }
                    $(".modal-backdrop").css('display', 'none')
                })
            },
            goPlanDetail(suid) {
                Plan.getBySuid({suid: suid}).then(response => {
                    let planId = response.data;
                    if (planId != 0) {
                        this.$router.push('/plan/detail/' + planId);
                    } else {
                        swal("没有计划", "计划尚未生成", "error");
                    }
                    $(".modal-backdrop").css('display', 'none')
                })
            }
        },


        components: {'v-pagination': paginations}

    }
</script>
