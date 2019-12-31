import { doGetSearch } from "../../service/searchService";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { getColumnDefs } from "./ColumnDefs.js";

export default {
    components: {
        AgGridVue
    },

    data() {
        return {
            productId: "43073126",
            isLoading: false,

            isTransformBtnDisabled: true,
            isLoadBtnDisabled: true,

            columnDefs: getColumnDefs(),
            rowData: [],

            notification: ""
        };
    },

    methods: {
        onGridReady(gridOptions) {
            this.gridOptions = gridOptions;
            this.gridOptions.api.sizeColumnsToFit();
        },
        async onDisplayDataBtnClicked() {
            this.isLoading = true;
            await this.loadData();
            this.gridOptions.api.sizeColumnsToFit();
            this.isLoading = false;
        },

        async loadData() {
            const response = await doGetSearch(this.productId);
            this.rowData = response.data.reviews;
            console.log(response);
        },

        showNotification(message) {
            this.notification = message;
        }
    }
};
