import {uuidv4} from "../utils/cimsAppUtil.es.js";

export default class CimsDashboard {
    constructor(name, serverId) {
        this.id = uuidv4();
        this.serverId = serverId,
        this.name = name;
        this.charts = [];
    }

    addChart(y, x, chart) {
        if (!this.charts[y]) {
            this.charts[y] = [];
            this.charts.splice(y, 1, []);
        }
        this.charts[y].splice(x, 0, chart);
    }

    removeChartById(id) {
        for (let x = 0; x < this.charts.length; ++x) {
            for (let y = 0; y < this.charts[x].length; ++y) {
                if (this.charts[x][y].id === id) {
                    this.removeChart(x, y);
                    break;
                }
            }
        }
    }

    replaceChartById(id, chart) {
        for (let x = 0; x < this.charts.length; ++x) {
            for (let y = 0; y < this.charts[x].length; ++y) {
                if (this.charts[x][y].id === id) {
                    this.charts[x].splice(y, 1, chart);
                    break;
                }
            }
        }
    }

    removeChart(x, y) {
        if (this.charts[x][y]) {
            this.charts[x].splice(y, 1);
            if (this.charts[x].length === 0) {
                this.charts.splice(x, 1);
            }
        }
    }

    getCharts() {
        console.log(this.charts)
        return this.charts;
    }
}