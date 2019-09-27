import CimsChart from './cimsChart.js';
import {uuidv4} from "../utils/cimsAppUtil.es.js";
export default class CimsChartType {
    constructor(name, icon, group, component, customData, title = '', desc = '', ) {
        this.id = uuidv4();
        this.isType = true;
        this.name = name;
        this.icon = icon;
        this.group = group;
        this.component = component;
        this.customData = customData;
        this.title = title;
        this.desc = desc;
    }

    getInstance(y, x) {
        return new CimsChart(this.name, this.name, this.component, {y:y, x:x});
    }
}