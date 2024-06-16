import repository from "../../api/users";
import TableStoreAbstract from "@/store/tables/TableStoreAbstract";

const headers = [
    {
        field: "id",
        header: "ID",
        sortable: true,
        style: "width: 70px",
        hidden: false
    },
    {
        field: "fullname",
        header: "ФИО",
        sortable: true,
    },
    {
        field: "email",
        header: "Email(login)",
        sortable: true,
    },
    {
        field: "roles",
        header: "Роли",
        sortable: true,
        style: "width: 150px"
    },
    {
        field: "is_ldap",
        header: "Active Directory",
        sortable: true,
    },
    {
        field: "active",
        header: "Активирован",
        sortable: true,
    },
    {
        field: "created_at",
        header: "Дата создания",
        sortable: true,
    }
];

export default new TableStoreAbstract("users", headers, repository);