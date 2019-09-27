<script src="./analytics.js"></script>
<template>
    <div>
        <div class="analytics">
            <el-tabs class="analytics-dashbord" 
                     v-model="dashboardsValue" type="card" @tab-remove="removeDashbord">
                <el-tab-pane closable
                             v-for="(dash, dashIdx) in dashboards"
                             :key="dash.id"
                             :name="dash.id">
                    <span class="analytics-dashbord__tab-name" slot="label">
                        {{dash.name}}
                        <div class="analytics-dashbord__edit-name" @click="editTabName(dashIdx)">
                            edit
                        </div>
                    </span>
                    <div class="chart" v-for="(row, rowIdx) in dash.getCharts()">
                        <div class="chart__container">
                            <div class="chart__item" v-for="(chart, chartIdx) in row">
                                <template v-if="chart.isType">
                                    <div class="chart__header">
                                        <ul class="chart-list chart-list--right">
                                            <li class="chart-list__item"
                                                v-on:click="dash.removeChartById(chart.id);">
                                                <i class="fas fa-trash"></i>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="chart__body">
                                        <div class="chart-type">
                                            <div class="chart-type__row" v-for="ctg in cimsChartsType">
                                                <div class="chart-type__name"><span>{{ctg[0].group}}</span></div>
                                                <div class="chart-type__items">
                                                    <div class="chart-type__item" v-for="(cht, chIdx) in ctg"
                                                         @click="selectTypeChart(cht, dashIdx, rowIdx, chartIdx)">
                                                        <div class="chart-type__img"
                                                             > {{cht.name}} </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <component :is="chart.getComponent()" @point-click="point = $event.point" :chart="chart" :dashboard="dashboards[dashIdx]"></component>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="btn-container chart__btn">
                        <button class="cims-btn cims-btn--primary cims-btn--lg" @click="addGraphics(dashIdx, 1)">
                            Addlarge graphic (screen wide)
                        </button>
                        <button class="cims-btn cims-btn--primary cims-btn--lg" @click="addGraphics(dashIdx, 2)">
                            Add 2small graphics (half screen each)
                        </button>
                    </div>
                </el-tab-pane>
                <el-tab-pane>
                    <div class="tab-row" slot="label" >
                        <div class="add-dashbord" @click="newDashboard">
                            <i class="far fa-plus-square"></i>
                        </div>
                        <div class="add-dashbord" @click="saveDashboard">
                            Save dashboards
                        </div>
                    </div>
                    
                </el-tab-pane>
            </el-tabs>
            <div v-if="dashboards.length === 0" class="btn-analytics" @click="newDashboard">
                <span class="btn-analytics__title">Add chart</span>
            </div>

        </div>
        <el-dialog title="Change dashboard name" :visible.sync="dlgTabName"
                   custom-class="popup-sm">
            <div class="dialog-body">
                <el-input
                        class="input-small full-width"
                        v-model="editTitle">
                </el-input>

            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dlgTabName = false">
                    Cancel
                </el-button>
                <el-button size="small" type="primary" @click="saveTabName">
                    Confirm
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>