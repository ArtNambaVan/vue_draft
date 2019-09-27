import CimsDashboard from './cimsDashboard.js';
import CimsChartTable from './cims-chart-table.vue';
import CimsChartBubble from './cims-chart-bubble.vue';
import CimsChartColumn from './cims-chart-column.vue';
import CimsChartType from './cimsChartType.js';


export default {
    data:
        function () {
            return {
                isAdmin: false,
                dashboardsValue: '',
                editTitle: '',
                editTitleIndex: 0,
                dlgTabName: false,
                dashboards: [],
                loadingButton: false,
                point: {},
                cimsChartsType: [
                    [
                        new CimsChartType('TN1', 'Tonality_1.png', 'Tonality', CimsChartColumn),
                        new CimsChartType('TN2', 'Tonality_2.png', 'Tonality', CimsChartTable),
                        new CimsChartType('TN3', 'Tonality_3.png', 'Tonality', CimsChartTable),
                        new CimsChartType('TN4', 'Tonality_4.png', 'Tonality', CimsChartTable),
                        new CimsChartType('TN5', 'Tonality_5.png', 'Tonality', CimsChartTable),
                        new CimsChartType('TN6', 'Tonality_6.png', 'Tonality', CimsChartTable),
                        new CimsChartType('TN7', 'Tonality_7.png', 'Tonality', CimsChartTable),
                        new CimsChartType('TN8', 'Tonality_8.png', 'Tonality', CimsChartTable)
                    ],
                    [
                        new CimsChartType('CS1', 'Category_summed_up_1.png', 'Category summed up', CimsChartTable),
                        new CimsChartType('CS2', 'Category_summed_up_2.png', 'Category summed up', CimsChartTable),
                        new CimsChartType('CS3', 'Category_summed_up_3.png', 'Category summed up', CimsChartTable),
                        new CimsChartType('CS4', 'Category_summed_up_4.png', 'Category summed up', CimsChartTable),
                        new CimsChartType('CS5', 'Category_summed_up_5.png', 'Category summed up', CimsChartTable)
                    ],
                    [
                        new CimsChartType('CB1', 'Category_breakdown_1.png', 'Category breakdown', CimsChartTable),
                        new CimsChartType('CB2', 'Category_breakdown_2.png', 'Category breakdown', CimsChartTable),
                        new CimsChartType('CB3', 'Category_breakdown_3.png', 'Category breakdown', CimsChartTable),
                        new CimsChartType('CB4', 'Category_breakdown_4.png', 'Category breakdown', CimsChartTable),
                        new CimsChartType('CB5', 'Category_breakdown_5.png', 'Category breakdown', CimsChartTable),
                        new CimsChartType('CB6', 'Category_breakdown_6.png', 'Category breakdown', CimsChartTable),
                        new CimsChartType('CB7', 'Category_breakdown_7.png', 'Category breakdown', CimsChartTable)
                    ],
                    [
                        new CimsChartType('WM1', 'Wordmap_1.png', 'Worldmap', CimsChartTable)
                    ],
                    [
                        new CimsChartType('BB1', 'Bubble_1.png', 'Bubble', CimsChartBubble)
                    ]
                ]
            }
        },
    created() {

    },
    beforeDestroy() {
    },
    mounted() {
    },
    computed: {},
    watch: {},
    methods: {
        removeDashbord: function (id) {
            for (let i = 0; i < this.dashboards.length; ++i) {
                if (this.dashboards[i].id === id) {
                    this.dashboards.splice(i, 1);
                    break;
                }
            }
        },

        saveDashboard: function() {
        },

        addDashbord: function (db) {
            this.dashboards.push(db);
        },

        newDashboard: function () {
            let db = new CimsDashboard('New page ' + (this.dashboards.length + 1), null);
            this.dashboards.push(db);
            let thisObj = this;
            setTimeout(function () {
                thisObj.dashboardsValue = db.id;
            }, 100);
            return db;
        },

        selectTypeChart: function (cht, dashIdx, rowIdx, chartIdx) {
            let chart = cht.getInstance(rowIdx, chartIdx);
            this.dashboards[dashIdx].getCharts()[rowIdx].splice(chartIdx, 1, chart);
            return chart;
        },

        addGraphics: function (idx, num) {
            let dashboard = this.dashboards[idx];
            let y = dashboard.getCharts().length;
            for (let x = 0; x < num; x++) {
                dashboard.addChart(y, x, new CimsChartType(null, null, null, null, {y: y, x: x}));
            }
        },

        editTabName: function (idx) {
            this.editTitle = this.dashboards[idx].name;
            this.editTitleIndex = idx;
            this.dlgTabName = true;
        },

        saveTabName: function () {
            this.dashboards[this.editTitleIndex].name = this.editTitle;
            this.dlgTabName = false;
        }
    }
}