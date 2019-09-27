<script src="./cimsChartBubble.js"></script>
<template>
    <div>
        <div class="chart__header">
            <ul class="chart-list chart-list--left">
                <li class="chart-list__item"  v-bind:class="{ active : isPanelActive }"
                    v-on:click="togglePanel('isPanelActive')">
                    <i class="fas fa-filter"></i>
                </li>
                <li class="chart-list__item" v-bind:class="{ active : isPanelActive2 }"
                    v-on:click="togglePanel('isPanelActive2')">
                    <i class="fas fa-cog"></i>
                </li>
                <li class="chart-list__item">
                    <i class="fas fa-sort-amount-down"></i>
                    <el-select class="analytics-select" v-model="chartSorting" placeholder="Select">
                        <el-option
                                v-for="item in chartSortingOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li class="chart-list__item">
                    <i class="far fa-chart-bar"></i>
                    <el-select class="analytics-select" v-model="chart.chartType" placeholder="Select" @change="selectChart(chart.chartType, DashIndex, graphIndex, chartIndex)">
                        <el-option
                                v-for="item in chartTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </li>
            </ul>
            <ul class="chart-list chart-list--right">
                <li class="chart-list__item">
                    <i class="fas fa-download"></i>
                </li>
                <li class="chart-list__item"
                    v-on:click="deleteChart()">
                    <i class="fas fa-trash"></i>
                </li>
            </ul>
        </div>
        <div class="chart__body">
            <div class="chart__panels">
                <div class="filters-panel filters-panel--small" v-bind:class="{ active : isPanelActive }">
                    <div class="filters-panel__btn" v-bind:class="{ active : isPanelActive }"
                        v-if="isPanelActive" v-on:click="togglePanel('isPanelActive')"
                    >
                        <span>&nbsp;</span>
                        <span class="collapse-icon-closed">
                            <i class="fas fa-chevron-left"></i>
                        </span>
                        <span class="collapse-icon-open">
                            
                        </span>
                        <span class="search-mobile">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                    <filterPanel 
                        :chart="chart"
                        :isPanelActive="isPanelActive"
                        >
                    </filterPanel>
                </div>
                <!-- ends panel -->
                <div class="filters-panel filters-panel--small" v-bind:class="{ active : isPanelActive2 }">
                    <div class="filters-panel__body">
                        <form>
                            <div class="filter-category">
                                <div class="filter-category__title">Y-Axis
                                </div>
                                <div class="filter-category__body">
                                    <div class="[ row no-gutters ] filter-category__item">
                                        <div class="col-4">
                                            <label class="filter-category__label">Breakdown by:</label>
                                        </div>
                                        <div class="col-7">
                                            <div class="select-container">
                                                <el-select v-model="yAxis.breakdownValue" placeholder="Select">
                                                    <el-option
                                                            v-for="opt in yAxis.breakdown"
                                                            :label="opt.name"
                                                            :key="opt.id"
                                                            :value="opt.name">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- SEARCH & FILTER END -->
    
                            <!-- TEXT & PERIOD FILTER STARTS -->
                            <div class="filter-category">
                                <div class="filter-category__body collapse show" aria-labelledby="textFilter"
                                        id="textFilterBody" role="tabpanel">
                                    <p class="filter-title">Select categories to be shown on the Y-Axis:</p>
                                    <div class="[ row no-gutters ] filter-category__item">
                                        <el-switch
                                            v-model="yAxis.toggleControl"
                                            active-text="Breakdown"
                                            inactive-text="Summarize">
                                        </el-switch>
                                        
                                    </div>

                                    <div v-for="(catBlock, catBlockIndex) in filter.categoryBlocks"
                                        class="filter-category__section">
                                        <div class="filter-category__item">
                                            <div class="filter-category__item" v-if="catBlockIndex > 0">
                                                <el-radio-group v-model="catBlock.blockCondition"
                                                                class="radio-group radio-group--main">
                                                    <el-radio-button label="And">And
                                                    </el-radio-button>
                                                    <el-radio-button label="Or">Or
                                                    </el-radio-button>
                                                    <el-radio-button label="Exclude">
                                                        Exclude
                                                    </el-radio-button>
                                                </el-radio-group>
    
                                            </div>
                                        </div>
    
                                        <div class="[ row no-gutters ]  filter-category__item">
                                            <div class="col-4">
                                                <label class="filter-category__label">Category</label>
                                            </div>
                                            <div class="col-7">
                                                <div aria-expanded="true" class="input-container"
                                                    v-on:click="setCategoryBlockIndex(catBlockIndex)">
                                                    <el-autocomplete
                                                            v-model="categorySearchResult"
                                                            value-key="name"
                                                            placeholder="Search category"
                                                            :trigger-on-focus="false"
                                                            @select="selectPlainCategory"
                                                    ></el-autocomplete>
                                                </div>
                                            </div>
                                            <div class="col-1">
                                                <div aria-expanded="true"
                                                    class="open-icon" role="tab"
                                                    v-on:click="selectCategory(catBlockIndex)">
                                                    <i class="fas fa-folder"></i>
                                                </div>
                                            </div>
                                        </div>
    
                                        <div class="[ row no-gutters ] filter-category__item">
                                            <div class="col-7 offset-4">
                                                <el-radio-group v-model="catBlock.categoryCondition" class="radio-group"
                                                                >
                                                    <el-radio-button label="And">And
                                                    </el-radio-button>
                                                    <el-radio-button label="Or">Or
                                                    </el-radio-button>
                                                </el-radio-group>
    
                                            </div>
                                        </div>
    
                                        <div class="filter-category__item">
                                            <ul class="category category--unrating">
                                                <li v-for="(cat, index) in catBlock.categories"
                                                    v-if="cat.visibility"
                                                    :class="'category__item category__item--' + ((cat.ratingCategory == true)?'rating':'unrating')">
                                                    <span class="category__delete"
                                                        v-on:click="removeFilterCategory(catBlockIndex, cat.id)">&#10006;</span>
                                                    <span class="category__type"><i class="icon-tag"></i></span>
                                                    <span class="category__name">{{ cat.name }}</span>
                                                </li>
                                            </ul>
                                            
                                        </div>
                                        <div class="filter-category__item category-control category-control--plus">
                                            <a href="javascript:void(0)" class="btn-link filter-btn"
                                            v-on:click="addCategoryBlock(catBlockIndex)">
                                                <i class="fas fa-plus-square"></i>
                                                Add filter group
                                            </a>
                                            <a href="javascript:void(0)" class="btn-link filter-btn"
                                            v-on:click="removeCategoryBlock(catBlockIndex)">
                                                <i class="fas fa-minus-square"></i>
                                                Remove filter group
                                            </a>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                            <!-- TEXT & PERIOD FILTER END -->
                            <div class="filter-category">
                                <div class="filter-category__body">
                                    <div class="[ row no-gutters ] filter-category__item">
                                        <div class="col-4">
                                            <label class="filter-category__label">Sort by:</label>
                                        </div>
                                        <div class="col-7">
                                            <div class="select-container">
                                                <el-select v-model="yAxis.typeSorting" placeholder="Select">
                                                    <el-option
                                                            v-for="opt in yAxis.typeSortingOptions"
                                                            :label="opt.label"
                                                            :key="opt.id"
                                                            :value="opt.label">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                            <div class="select-container">
                                                <el-select v-model="yAxis.viewSorting" placeholder="Select">
                                                    <el-option
                                                            v-for="opt in yAxis.viewSortingOptions"
                                                            :label="opt.label"
                                                            :key="opt.id"
                                                            :value="opt.label">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                            <div class="select-container">
                                                <el-select v-model="yAxis.orderSorting" placeholder="Select">
                                                    <el-option
                                                            v-for="opt in yAxis.orderSortingOptions"
                                                            :label="opt.label"
                                                            :key="opt.value"
                                                            :value="opt.value">
                                                    </el-option>
                                            </el-select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-category">
                                <div class="filter-category__body">
                                    <div class="[ row no-gutters ] filter-category__item">
                                        <div class="col-4">
                                            <label class="filter-category__label">List Results (0 = All):</label>
                                        </div>
                                        <div class="col-7">
                                            <el-input v-model="yAxis.linitResults" class="full-width input-small"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-category">
                                <div class="filter-category__body">
                                    <div class="[ row no-gutters ] filter-category__item">
                                        <div class="col-4">
                                            <label class="filter-category__label">What to count?</label>
                                        </div>
                                        <div class="col-7">
                                            <div class="select-container">
                                                <el-select v-model="yAxis.breakdownValue"
                                                            >
                                                    <el-option
                                                            v-for="opt in yAxis.breakdown"
                                                            :label="opt.name"
                                                            :key="opt.id"
                                                            :value="opt.name">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="filter-category__item">
                                        <el-switch
                                            v-model="yAxis.toggleControl"
                                            active-text="Delta vs. previous period"
                                            >
                                        </el-switch>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="filter-category">
                                <div class="filter-category__body collapse show" aria-labelledby="textFilter"
                                        id="textFilterBody" role="tabpanel">
                                    <p>Limit count to the following categories:</p>
                                    <div class="[ row no-gutters ]  filter-category__item">
                                        <div class="col-4">
                                            <label class="filter-category__label">category</label>
                                        </div>
                                        <div class="col-7">
                                            <div aria-expanded="true" class="input-container"
                                                    v-on:click="setCategoryBlockIndex(catBlockIndex)">
                                                <el-autocomplete
                                                        v-model="yAxis.categorySearchResult"
                                                        value-key="name"
                                                        placeholder="search_category"
                                                        :trigger-on-focus="false"
                                                        
                                                ></el-autocomplete>
                                            </div>
                                        </div>
                                        <div class="col-1">
                                            <div aria-expanded="true"
                                                    class="open-icon" role="tab"
                                                    v-on:click="selectCategory(catBlockIndex)">
                                                <i class="fas fa-folder"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-category">
                                <div class="filter-category__body collapse show" aria-labelledby="textFilter"
                                        id="textFilterBody" role="tabpanel">
                                    <p>Chart title</p>
                                    <div class="filter-category__item">
                                        <el-input v-model="yAxis.linitResults" placeholder="Title" class="full-width input-small"></el-input>
                                    </div>
                                    <div class="filter-category__item">
                                        <el-input v-model="yAxis.linitResults" placeholder="Subtitle" class="full-width input-small"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-container btn-container--center">
                                <a href="javascript:void(0)" class="btn-link" value="reset"
                                v-on:click="clearFilters($event)">
                                <i class="far fa-trash-alt"></i>
                                reset
                                </a>
                                <a href="javascript:void(0)" class="btn-link btn-link--primary"
                                v-on:click="doSearch($event)">
                                    <i class="fas fa-search"></i>
                                    submit
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="graph"
                v-bind:class="{ active: isPanelActive2 || isPanelActive }">
                <PieChart :ref="'myChart' + chart.id" class="graph__item" :tweetData=loadData />

                <div class="chart__panels chart__panels--bottom" >
                    <div class="filters-panel filters-panel--bottom" 
                        :ref="'panelBottom' + chart.id" v-bind:class="{ active: isPanelActive2 }"
                    >
                        <div class="filters-panel__body">
                            <form class="form-inline">
                                <div class="filter-category">
                                    <div class="filter-category__title">X-Axis
                                    </div>
                                    <div class="filter-category__body">
                                        <p class="filter-title">Breakdown by:</p>
                                        <div class="select-container select-container-md">
                                            <el-select v-model="yAxis.breakdownValue" placeholder="Select">
                                                <el-option
                                                        v-for="opt in yAxis.breakdown"
                                                        :label="opt.name"
                                                        :key="opt.id"
                                                        :value="opt.name">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <!-- SEARCH & FILTER END -->
        
                                <!-- TEXT & PERIOD FILTER STARTS -->
                                <div class="filter-category">
                                    <div class="filter-category__body collapse show" aria-labelledby="textFilter"
                                            id="textFilterBody" role="tabpanel">
                                        <p class="filter-title">Add the following categories to the X-Axis:</p>
                                        <div class="[ row no-gutters ] filter-category__item">
                                            <el-switch
                                                v-model="yAxis.toggleControl"
                                                active-text="Breakdown"
                                                inactive-text="Summarize">
                                            </el-switch>
                                            
                                        </div>

                                        <div class="[ row no-gutters ]  filter-category__item">
                                            <div class="col-4">
                                                <label class="filter-category__label">category</label>
                                            </div>
                                            <div class="col-7">
                                                <div aria-expanded="true" class="input-container"
                                                        v-on:click="setCategoryBlockIndex(catBlockIndex)">
                                                    <el-autocomplete
                                                            v-model="yAxis.categorySearchResult"
                                                            value-key="name"
                                                            placeholder="search_category"
                                                            :trigger-on-focus="false"
                                                            
                                                    ></el-autocomplete>
                                                </div>
                                            </div>
                                            <div class="col-1">
                                                <div aria-expanded="true"
                                                        class="open-icon" role="tab"
                                                        v-on:click="selectCategory(catBlockIndex)">
                                                    <i class="fas fa-folder"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- TEXT & PERIOD FILTER END -->
                                <div class="filter-category">
                                    <div class="filter-category__body">
                                        <div class="[ row no-gutters ] filter-category__item">
                                            <div class="col-4">
                                                <label class="filter-category__label">List Results (0 = All):</label>
                                            </div>
                                            <div class="col-7">
                                                <el-input v-model="yAxis.linitResults" class="full-width input-small"></el-input>
                                            </div>
                                        </div>
                                        <div class="[ row no-gutters ] filter-category__item">
                                            <div class="col-4">
                                                <label class="filter-category__label">Sort by:</label>
                                            </div>
                                            <div class="col-7">
                                                <div class="select-container">
                                                    <el-select v-model="yAxis.typeSorting" placeholder="Select">
                                                        <el-option
                                                                v-for="opt in yAxis.typeSortingOptions"
                                                                :label="opt.label"
                                                                :key="opt.id"
                                                                :value="opt.label">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                                <div class="select-container">
                                                    <el-select v-model="yAxis.viewSorting" placeholder="Select">
                                                        <el-option
                                                                v-for="opt in yAxis.viewSortingOptions"
                                                                :label="opt.label"
                                                                :key="opt.id"
                                                                :value="opt.label">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                                <div class="select-container">
                                                    <el-select v-model="yAxis.orderSorting" placeholder="Select">
                                                        <el-option
                                                                v-for="opt in yAxis.orderSortingOptions"
                                                                :label="opt.label"
                                                                :key="opt.value"
                                                                :value="opt.value">
                                                        </el-option>
                                                </el-select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>