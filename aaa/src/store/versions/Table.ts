import repository from "../../api/versions";
import TableStoreAbstract from "@/store/tables/TableStoreAbstract";
import { i18n } from "@/plugins/i18n";

const headers = [
    {
        field: "name",
        //@ts-ignore
        header: i18n.global.t('Common.versionsModal.name'),
        sortable: false,
    },
    {
        field: "version",
        //@ts-ignore
        header: i18n.global.t('Common.version'),
        sortable: false,
    },
];

export default new TableStoreAbstract("versions", headers, repository);