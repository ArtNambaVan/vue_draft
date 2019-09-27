
import DateRangePickerOptions from './DateRangePickerOptions.js';

import { MixChartGraph } from "./cimsChartGraphMix";
import * as d3 from 'd3'
import FilterPanel from './filter-panel.vue';

import Data from './data'
import PieChart from "./pieChart/pie-chart.vue";


export default {
    props: {
        dashboard: Object,
        chart: Object,
    },
    components: {
        filterPanel: FilterPanel,
        PieChart: PieChart,
    },
    mixins: [ MixChartGraph ],
    data: function () {
        return {
            loadData: [],
            filter: {
                statusId: 0,
                keywords: '',
                extendedKeywords: [
                    {
                        fieldName: '',
                        keyword: '',
                        containsCond: 'Contains',
                        blockCondition: "And"
                    }
                ],
                views: [0, 100],
                source: {
                    id: 0,
                    name: ''
                },
                categoryBlocks: [{
                    blockCondition: "And",
                    categories: [],
                    categoryCondition: "And",
                }],
                dateInRange: ['', ''],
                userIds: [],
                feedId: 0,
                workflowStatusId: 0,
                dateChangeRange: ['', ''],
                dateCreateRange: ['', ''],
                reseted: 0
            },

            selectedUserFilter: '',
            savedUserFilters: [{name: 'filter1', id: 1},{name: 'filter2', id: 2},{name: 'filter3', id: 3}],
            
            chartSorting: '',
            chartSortingOptions: [{label: 'Sort by categories (ascending)', value: 'cat,asc'}, {label: 'Sort by categories (descending)', value: 'cat,desc'},
                {label: 'Sort by total (ascending)', value: 'total,asc'}, {label: 'Sort by total (descending)', value: 'total,desc'},
                {label: 'Sort by negatives (ascending)', value: 'negatives,asc'}, {label: 'Sort by negatives (descending)', value: 'negatives,desc'},
                {label: 'Sort by neutrals (ascending)', value: 'neutrals,asc'}, {label: 'Sort by neutrals (descending)', value: 'neutrals,desc'},
                {label: 'Sort by positives (ascending)', value: 'positives,asc'}, {label: 'Sort by positives (descending)', value: 'positives,desc'},
            ],

            chartType: '',
            chartTypeOptions: [{label: 'Column Chart', value: 'column_chart'}, {label: 'Percentage Chart', value: 'percentage_chart'},
                {label: 'Bar Chart', value: 'bar_chart'}, {label: 'Bar Chart (Percentage)', value: 'bar_chart_percentage'},
                {label: 'Pie Chart', value: 'pie_chart'}, {label: 'Data table', value: 'data_table'},
            ],
            categorySearchResult: '',
            fieldNames: [],
            cimsStatuses: [],
            panels: ['isPanelActive', 'isPanelActive2'],
            isPanelActive: false,
            isPanelActive2: false,
            textarea: '',
            dateInOptions: new DateRangePickerOptions(),
            dateCreateOptions: new DateRangePickerOptions(),
            dateChangeOptions: new DateRangePickerOptions(),
            yAxis: {
                breakdown: [{name: 'Tonality', id: 1},{name: 'Categories', id: 2},{name: 'Total', id: 3},{name: 'Worldmap', id: 4},],
                breakdownValue: '',
                toggleControl: '',
                linitResults: '',
                typeSorting: '',
                typeSortingOptions: [{label: "Category", id: 1}, {label: "Total", id: 2}, {label: "Positive", id: 3}, {label: "Neutral", id: 4}, {label: "Negative", id: 5}],
                viewSorting: '',
                viewSortingOptions: [{label: "Absolute", id: 1}, {label: "Relative / Percentage", id: 2}],
                orderSorting: '',
                orderSortingOptions: [{label: "Descending", value: "desc"}, {label: "Ascending", value: "asc"},],
            }
        };
    },
    mounted() {
        console.log("App loaded");
        this.fetchData();
        
    },
    methods: {
        selectPlainCategory: function() {
            console.log(1)
        },
        onSourceNodeClick: function() {},

        getMessagess: function(obj) {
            console.log('hello from', obj)
        },
        test: function() {
            console.log(JSON.parse(this.dataJson))
        },
        async fetchData() {
            let data = await d3.json("./data.json");
            this.loadData = data;
            console.log(this.loadData)
          }
    }
}


