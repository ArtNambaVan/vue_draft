import {uuidv4} from "../utils/cimsAppUtil.es.js";

export default class CimsChart {
    constructor(type, name, component, customData) {
        this.id = uuidv4();
        this.isType = false;
        this.type = type;
        this.name = name;
        this.component = component;
        this.customData = customData;
        this.messagess = [];
        this.filterPanel = {
            userActions: {
                FILTER_BY_DATE_CREATE: true,
                FILTER_BY_DATE_CHANGE: true,
                FILTER_BY_STATUS: true,
                FILTER_BY_FEED: true,
                FILTER_BY_USER: true,
                FILTER_BY_WORKFLLOW_STATUS: true,
                FILTER_BY_SOURCE: true,
                FILTER_BY_VIEWS: true,
            },
            cimsStatuses: [],
            workflowStatuses: [],
            fieldNames: [],
            filter: {
                statusId: 0,
                keywords: '',
                extendedKeywords: [
                    {
                        fieldName: '',
                        keyword: '',
                        containsCond: 'Contains',
                        blockCondition: "AND"
                    }
                ],
                views: [0, 100],
                source: {
                    id: 0,
                    name: ''
                },
                categoryBlocks: [],
                dateInRange: ['', ''],
                userIds: [],
                feedId: 0,
                workflowStatusId: 0,
                dateChangeRange: ['', ''],
                dateCreateRange: ['', ''],
                reseted: 0
            },

            sourceTree: [],
            categoryTree: [],
            savedUserFilters: [],
            updatedUserFilters: [],
            users: [],
            feeds: [],
        }
    }

    getComponent() {
        return this.component;
    }

    getFilter() {
        return this.filterPanel
    }
}