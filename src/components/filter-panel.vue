<script src="./filterPanel.js"></script>
<template>
    <div class="filters-panel__body">
        <form>
            <!-- SEARCH & FILTER STARTS -->
            <div class="filter-category">
                <div class="filter-category__title">search_and_filter
                    <el-tooltip class="item" effect="dark" content="search_and_filter_tooltip" placement="right">
                        <i style="position: relative; z-index: 2;" class="cims-tooltip fas fa-question-circle"></i>
                    </el-tooltip>
                </div>
                <div class="filter-category__body">
                    <div class="[ row no-gutters ] filter-category__item">
                        <div class="col-7 offset-4">
                            <div class="select-container">
                                <el-select v-model="selectedUserFilter"
                                            placeholder="select_saved_filter"
                                            @change="selectSavedFilter(selectedUserFilter, $event)"
                                            >
                                    <el-option
                                            v-for="opt in savedUserFilters"
                                            :label="opt.name"
                                            :key="opt.id"
                                            :value="opt.name">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="open-icon" aria-expanded="true" v-on:click="openFilterListDlg">
                                <i class="fas fa-cog"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- SEARCH & FILTER ENDS -->

            <!-- TEXT & PERIOD FILTER STARTS -->
            <div class="filter-category">
                <a class="filter-category__head collapse-icon"
                    aria-expanded="true" data-toggle="collapse" :href="'#textFilterBody' + chart.id"
                    role="tab">
                    <span class="filter-category__title">text_and_period_filter</span>
                    <span class="collapse-icon-closed">
                        <i class="fas fa-chevron-down"></i>
                    </span>
                    <span class="collapse-icon-open">
                        <i class="fas fa-chevron-up"></i>
                    </span>
                </a>
                <div class="filter-category__body collapse show"
                    :id="'textFilterBody' + chart.id" role="tabpanel">
                    <div class="[ row no-gutters ] filter-category__item">
                        <div class="col-4">
                            <label class="filter-category__label">posted</label>
                        </div>

                        <div class="col-7">
                            <div class="select-container select-container--icon-right">
                                <el-date-picker
                                        v-model="filter.dateChangeRange"
                                        type="daterange"
                                        language="en"
                                        start-placeholder="start_date"
                                        end-placeholder="end_date"
                                        :default-time="['00:00:00', '23:59:59']"
                                        unlink-panels
                                        :picker-options="dateInOptions"
                                        :format="dateInOptions.dateInFormat"
                                        v-on:change="dateInOptions.onChange($event)">
                                    <template v-slot:range-separator>
                                        <span v-if="dateInOptions.rangeSeparator == '-'">{{ dateInOptions.rangeSeparator }}</span>
                                        <div v-if="dateInOptions.rangeSeparator != '-'"
                                                style="position: absolute; left: 3px;">{{ dateInOptions.rangeSeparator }}
                                        </div>
                                    </template>
                                </el-date-picker>
                            </div>
                        </div>

                    </div>

                    <div class="[ row no-gutters ] filter-category__item">
                        <div class="col-4">
                            <label class="filter-category__label">text_search</label>
                        </div>

                        <div class="col-7">
                            <input type="text" class="cims-input filter-category__control"
                                    placeholder="search_title_or_message" v-model="filter.keywords">
                        </div>
                    </div>
                </div>
            </div><!-- TEXT & PERIOD FILTER END -->

            <!-- EXTENDED TEXT SEARCH STARTS -->
            <div class="filter-category">

                <a class="filter-category__head collapse-icon" aria-controls="extendedTextSearchBody"
                aria-expanded="true" data-toggle="collapse" :href="'#extendedTextSearchBody' + chart.id"
                id="extendedTextSearch" role="tab">
                    <span class="filter-category__title">extended_text_search</span>
                    <el-tooltip class="item" effect="dark" content="extended_text_search_tooltip" placement="right">
                        <i class="cims-tooltip fas fa-question-circle"></i>
                    </el-tooltip>
                    <span class="collapse-icon-closed">
                        <i class="fas fa-chevron-down"></i>
                    </span>
                    <span class="collapse-icon-open">
                        <i class="fas fa-chevron-up"></i>
                    </span>
                </a>

                <div class="filter-category__body collapse show" aria-labelledby="extendedTextSearch"
                    :id="'extendedTextSearchBody' + chart.id" role="tabpanel">
                    <div class="filter-category__section"
                        v-for="(extItem, extIndex) in filter.extendedKeywords">
                        <div class="filter-category__item" v-if="extIndex > 0">
                            <el-radio-group v-model="extItem.blockCondition"
                                            class="radio-group radio-group--main">
                                <el-radio-button label="And">and
                                </el-radio-button>
                                <el-radio-button label="Or">or
                                </el-radio-button>
                                <el-radio-button label="Exclude">
                                    exclude
                                </el-radio-button>
                            </el-radio-group>

                        </div>

                        <div class="[ row no-gutters ]  filter-category__item">
                            <div class="col-4">
                                <label class="filter-category__label">field</label>
                            </div>

                            <div class="col-7">
                                <div class="select-container">
                                    <el-select v-model="extItem.fieldName"
                                                placeholder="">
                                            <el-option
                                                    v-for="opt in fieldNames"
                                                    :label="opt.label"
                                                    :key="opt.fieldName"
                                                    :value="opt.fieldName">
                                            </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>

                        <div class="[ row no-gutters ] filter-category__item">
                            <div class="col-7 offset-4">
                                <el-radio-group v-model="extItem.containsCond" class="radio-group">
                                    <el-radio-button label="Contains">
                                        contains
                                    </el-radio-button>
                                    <el-radio-button label="Not_contains">
                                        not_contains
                                    </el-radio-button>
                                </el-radio-group>

                            </div>
                        </div>

                        <div class="[ row no-gutters ]  filter-category__item">
                            <div class="col-4">
                                <label class="filter-category__label">search_term</label>
                            </div>

                            <div class="col-7">
                                <input type="text" class="cims-input filter-category__control"
                                    v-model="extItem.keyword">
                            </div>
                        </div>
                        <div class="filter-category__item category-control category-control--plus">
                            <a href="javascript:void(0)" class="btn-link filter-btn"
                            v-on:click="addExtendedKeyword(extIndex)">
                                <i class="fas fa-plus-square"></i>
                                add_extended_group
                            </a>
                            <a href="javascript:void(0)" class="btn-link filter-btn"
                            v-on:click="removeExtendedKeyword(extIndex)">
                                <i class="fas fa-minus-square"></i>
                                remove_extended_group
                            </a>
                        </div>
                    </div>
                </div>
            </div><!-- EXTENDED TEXT SEARCH ENDS -->

            <!-- CATEGORY FILTER START -->
            <div class="filter-category">

                <a class="filter-category__head collapse-icon" aria-controls="categoryFilterBody"
                aria-expanded="true" data-toggle="collapse" :href="'#categoryFilterBody' + chart.id"
                id="categoryFilter " role="tab">
                    <span class="filter-category__title">category_filter</span>
                    <el-tooltip class="item" effect="dark" content="category_filter_tooltip" placement="right">
                        <i class="cims-tooltip fas fa-question-circle"></i>
                    </el-tooltip>
                    <span class="collapse-icon-closed">
                        <i class="fas fa-chevron-down"></i>
                    </span>
                    <span class="collapse-icon-open">
                        <i class="fas fa-chevron-up"></i>
                    </span>
                </a>

                <div class="filter-category__body collapse show" aria-labelledby="categoryFilter"
                    :id="'categoryFilterBody' + chart.id" role="tabpanel">
                    <div v-for="(catBlock, catBlockIndex) in filter.categoryBlocks"
                        class="filter-category__section" :key="uiFilterKey">
                        <div class="filter-category__item">
                            <div class="filter-category__item" v-if="catBlockIndex > 0">
                                <el-radio-group v-model="catBlock.blockCondition"
                                                class="radio-group radio-group--main">
                                    <el-radio-button label="And">and
                                    </el-radio-button>
                                    <el-radio-button label="Or">or
                                    </el-radio-button>
                                    <el-radio-button label="Exclude">
                                        exclude
                                    </el-radio-button>
                                </el-radio-group>

                            </div>
                        </div>

                        <div class="[ row no-gutters ]  filter-category__item">
                            <div class="col-4">
                                <label class="filter-category__label">category</label>
                            </div>
                            <div class="col-7">
                                <div aria-expanded="true" class="input-container"
                                    v-on:click="setCategoryBlockIndex(catBlockIndex)">
                                    <el-autocomplete
                                            v-model="categorySearchResult"
                                            :fetch-suggestions="categorySearch"
                                            value-key="name"
                                            placeholder="$translate.getLocaleCimsText('search_category')"
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
                                                v-show="(catBlock.categories.length > 1)">
                                    <el-radio-button label="And">and
                                    </el-radio-button>
                                    <el-radio-button label="Or">or
                                    </el-radio-button>
                                </el-radio-group>

                            </div>
                        </div>

                        <div class="filter-category__item">
                            <ul class="category category--unrating">
                                <li v-for="(cat, index) in getFilterCategories(catBlockIndex, false)"
                                    v-if="cat.visibility"
                                    :class="'category__item category__item--' + ((cat.ratingCategory == true)?'rating':'unrating')">
                                    <span class="category__delete"
                                        v-on:click="removeFilterCategory(catBlockIndex, cat.id)">&#10006;</span>
                                    <span class="category__type"><i class="icon-tag"></i></span>
                                    <span class="category__name">{{ cat.name }}</span>
                                </li>
                            </ul>
                            <ul class="category category--rating">
                                <li v-for="(cat, index) in getFilterCategories(catBlockIndex, true)"
                                    v-if="cat.visibility"
                                    :class="'category__item category__item--' + ((cat.ratingCategory == true)?'rating':'unrating')">
                                    <span class="category__delete"
                                            v-on:click="removeFilterCategory(catBlockIndex, cat.id)">&#10006;</span>
                                    <span class="category__type"><i class="icon-star"></i></span>
                                    <span class="category__name">{{ cat.name }}</span>
                                    <div class="category__value"
                                            v-if="cat.ratingCategory && hasTonality(cat)">
                                        <label :class="tonalityClasses(cat)"
                                                v-on:click="selectTonality(cat, catBlockIndex)"></label>
                                        <span class="category__delete"
                                                v-on:click="clearTonality(index, catBlockIndex)">&#10006;</span>
                                    </div>
                                    <div class="category__value"
                                            v-if="cat.ratingCategory && !hasTonality(cat)">
                                        <a href="javascript:void(0)" class="btn-link add-tonality"
                                            v-on:click="selectTonality(cat, catBlockIndex)">
                                            <i class="fas fa-plus-square"></i>
                                            add_tonality
                                        </a>
                                    </div>
                                </li>
                            </ul>
                            
                        </div>
                        <div class="filter-category__item category-control category-control--plus">
                            <a href="javascript:void(0)" class="btn-link filter-btn"
                            v-on:click="addCategoryBlock(catBlockIndex)">
                                <i class="fas fa-plus-square"></i>
                                add_filter_group
                            </a>
                            <a href="javascript:void(0)" class="btn-link filter-btn"
                            v-on:click="removeCategoryBlock(catBlockIndex)">
                                <i class="fas fa-minus-square"></i>
                                remove_filter_group
                            </a>
                        </div>
                    </div>
                </div>
            </div><!-- CATEGORY FILTER END -->

            <div class="btn-container btn-container--center">
                <a href="javascript:void(0)" class="btn-link" value="reset"
                    v-on:click="clearFilters($event)">
                    <i class="far fa-trash-alt"></i>
                    reset
                </a>
            </div>
        </form>
    </div>
    <!-- ends panel -->
</template>