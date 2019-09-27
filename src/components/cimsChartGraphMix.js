import CimsChartType from "./cimsChartType";

export const MixChartGraph = {
    props: {
        chart: {},
        dashboard: {}
    },
    methods: {
        deleteChart: function () {
            this.dashboard.replaceChartById(this.chart.id, new CimsChartType(null, null, null));
        },
        togglePanel: function(panelName) {
            const thisObj = this;
            this.panels.forEach(function(e) {
                if (e == panelName) {
                    console.log(thisObj[panelName])
                    thisObj[panelName] = !thisObj[panelName]
                    console.log(thisObj[panelName])
                } else {
                    thisObj[e] = false
                    
                }
            })
            setTimeout(function() {
                if (thisObj.$refs[`myChart${thisObj.chart.id}`].chart) {
                    thisObj.$refs[`myChart${thisObj.chart.id}`].chart.setSize(null, null)
                }
            }, 450)
        }
    }
}