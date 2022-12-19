<template>
  <TreeList
    :style="{
      maxHeight: '510px',
      overflow: 'auto',
    }"
    :expand-field="expandField"
    :sub-items-field="subItemsField"
    :data-items="processedData"
    :columns="columns"
    :filter="filter"
    :filterable="false"
    :sort="sort"
    :sortable="true"
    @datastatechange="handleDataStateChange"
    @expandchange="onExpandChange"
  >
    <template v-slot:myCellTemplate="{ props }">
      <td>
        <span>
          {{ props.value }}
        </span>
      </td>
    </template>
    <template v-slot:myCellEditorTemplate="{ props }">
      <td>
        <KButton :theme-color="'primary'" @click="save"> Edit </KButton>
      </td>
    </template>
    <template v-slot:zeroColumnCellTemplate="{ props }">
      <td
        :class="props.class"
        :colspan="props.colSpan"
        :aria-colindex="props['aria-colindex']"
        :aria-expanded="props['aria-expanded']"
        :aria-selected="props['aria-selected']"
        :role="props.role"
        :data-grid-col-index="props['data-grid-col-index']"
      >
        <span
          class="k-icon k-i-none"
          v-for="(iteration, index) in props.level.slice(1)"
        ></span>
        <span
          :class="[
            'k-icon',
            props['aria-expanded']
              ? 'k-i-caret-alt-down'
              : props.dataItem['employees']
              ? 'k-i-caret-alt-right'
              : '',
          ]"
          @click="
            onExpandChange({
              dataItem: props.dataItem,
              value: props['aria-expanded'],
            })
          "
          :data-prevent-selection="true"
        ></span>
        <b style="color: brown">{{ props.value }}</b>
      </td>
    </template>
  </TreeList>
</template>

<script>
import controls from './data';
import { Button } from '@progress/kendo-vue-buttons';
import {
  TreeList,
  filterBy,
  orderBy,
  mapTree,
  extendDataItem,
} from '@progress/kendo-vue-treelist';

export default {
  components: {
    TreeList,
    KButton: Button,
  },
  data() {
    return {
      controls,
      subItemsField: 'subcontrols',
      expandField: 'expanded',
      expanded: [1, 2],
      filter: [],
      sort: [
        {
          field: 'title',
          dir: 'asc',
        },
      ],
      columns: [
        {
          field: 'id',
          title: 'ID',
          width: '30px',
          editor: 'text',
          expandable: true,
        },
        {
          field: 'title',
          title: 'Title',
          width: '280px',
          editor: 'text',
          expandable: true,
          cell: 'myCellTemplate',
        },
        {
          field: 'audit',
          title: 'Actions',
          width: '80px',
          editor: 'text',
          expandable: true,
          cell: 'myCellEditorTemplate',
          filterCell: null,
        },
      ],
    };
  },
  computed: {
    processedData() {
      let data = this.controls;
      let filteredData = filterBy(data, this.filter, this.subItemsField);
      let sortedData = orderBy(filteredData, this.sort, this.subItemsField);
      return this.addExpandField(sortedData);
    },
  },
  methods: {
    getIndent(id) {
      const level = id.filter((el) => el === '.').length;
      return level;
    },
    onExpandChange(e) {
      this.expanded = e.value
        ? this.expanded.filter((id) => id !== e.dataItem.id)
        : [...this.expanded, e.dataItem.id];
    },
    createAppState: function (dataState) {
      this.sort = dataState.sort;
      this.filter = dataState.filter;
    },
    handleDataStateChange: function (event) {
      this.createAppState(event.data);
    },
    addExpandField(dataTree) {
      const expanded = this.expanded;
      return mapTree(dataTree, this.subItemsField, (item) =>
        extendDataItem(item, this.subItemsField, {
          [this.expandField]: expanded.includes(item.id),
        })
      );
    },
  },
};
</script>
