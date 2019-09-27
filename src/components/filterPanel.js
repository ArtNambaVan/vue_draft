
import { MixChartGraph } from "./cimsChartGraphMix";
import DateRangePickerOptions from './DateRangePickerOptions.js';

export default {
    props: {
        chart: Object,
        isPanelActive: Boolean,
    },
    mixins: [MixChartGraph],
    data: function () {
        return {
            userActions: this.chart.filterPanel.userActions,
            cimsStatuses: this.chart.filterPanel.cimsStatuses,
            workflowStatuses: this.chart.filterPanel.workflowStatuses,
            fieldNames: this.chart.filterPanel.fieldNames,
            savedUserFilters: this.chart.filterPanel.savedUserFilters,
            selectedUserFilter: this.chart.filterPanel.selectedUserFilter,
            updatedUserFilters: this.chart.filterPanel.updatedUserFilters,
            users: this.chart.filterPanel.users,
            feeds: this.chart.filterPanel.feeds,
            filter: this.chart.filterPanel.filter,
            sourceTree: this.chart.filterPanel.sourceTree,
            categoryTree: this.chart.filterPanel.sourceTree,
            filterName: '',
            filterEmail: '',
            
            appliedFilter: null,
            defaultFilterChecker: false,
            defaultFilter: null,
            filterEditMode: null,
            viewsMin: 0,
            viewsMax: 100,
            inputViewsMin: 0,
            inputViewsMax: 0,

            plainSources: [],
            
            sourceTreeProps: {
                children: 'children',
                label: 'name',
            },

            currentOrgExpandedSources: {
                organizationId: null,
                sourceIds: []
            },

            currentOrgExpandedCategories: {
                organizationId: null,
                categoryIds: []
            },

            dlgSourceVisible: false,
            dlgSourceSearchText: '',
            dlgSource: {
                selectedSource: null,
                sourceBlockIndex: null,
                afterSelect: null,
                parentNodes: null
            },
            dlgSourceCurrentIndex: 0,

            plainCategories: [],
            
            categoryTreeProps: {
                children: 'children',
                label: 'name',
                checkbox: false
            },

            dlgFilterVisible: false,
            dlgSavedFiltersList: false,
            dlgTonalityVisible: false,
            dlgTonality: {
                categoryId: null,
                categoryName: null,
                tonalityType: null,
                tonality: null,
                afterSelect: null
            },

            categorySearchResult: '',
            plainCategory: {
                selectedCategory: null,
                categoryBlockIndex: null,
                afterSelect: null
            },

            dlgCategoryVisible: false,
            dlgCategorySearchText: '',
            dlgCategory: {
                selectedCategory: null,
                categoryBlockIndex: null,
                afterSelect: null,
                parentNodes: null
            },
            dlgCategoryCurrentIndex: 0,

            baseHref: '',
            pageHref: '',
            

            uiFilterKey: 0,
            uiMessageListKey: 0,
            uiViewsKey: 0,
            configDialogFormVisible: false,
            dateInFormat: 'dd.MM.yy HH:mm',
            urlTmp: null,
            editWin: null,

            dlgCategoriesDeleteVisible: false,
            msgDeleteFlag: false,
            messageDeleteList: [],
            userFilterCategories: [],

            dateInOptions: new DateRangePickerOptions(),
            dateCreateOptions: new DateRangePickerOptions(),
            dateChangeOptions: new DateRangePickerOptions(),
        };
    },
    computed: {
        filterMinViews: {
            get: function () {
                if (this.inputViewsMin !== 0) {
                    return this.inputViewsMin;
                } else {
                    return this.filter.views[0];
                }
            },
            set: function (val) {
                if (val && val != null && !isNaN(val)) {
                    this.filter.views[0] = Number(val);
                } else {
                    this.filter.views[0] = this.viewsMin;
                }

            }
        },
        filterMaxViews: {
            get: function () {
                if (this.inputViewsMax !== 0) {
                    return this.inputViewsMax;
                } else {
                    return this.filter.views[1];
                }
            },
            set: function (val) {
                if (val && val != null && !isNaN(val)) {
                    this.filter.views[1] = Number(val);
                } else {
                    this.filter.views[1] = this.viewsMax;
                }

            }
        },
    },
    created() {
        
    },
    updated() {
        
    },
    methods: {
        openFilterListDlg: function () {
            this.dlgSavedFiltersList = true;
        },
        testFunc: function(e) {
            e.preventDefault();
            console.log(this.chart)
        },
        selectPlainCategory: function() {
            console.log(1)
        },
        onSourceNodeClick: function() {},

        getMessagess: function(obj) {
            console.log('hello from', obj)
        }
    }
}
