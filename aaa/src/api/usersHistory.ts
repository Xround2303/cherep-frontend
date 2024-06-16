import {RequestGetRows, ResponseGetRows} from "@/store/tables/TableStoreAbstract.types";
import { ITableStoreUserHistory, TRow} from "@/store/userHistory/Table.types";
import CrudAbstract from "@/store/tables/CrudAbstract";

export default new class extends CrudAbstract<TRow>{
    async requestGetRows(context: ITableStoreUserHistory, request: RequestGetRows): Promise<ResponseGetRows<TRow>> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.debug(`Делаем запрос с ид: ${context.itemId} и получаем данные для таблицы, например /users-history/${context.itemId.value}`, request);

                resolve({
                    rows: [
                        {
                            id: 1,
                            date: "23.03.2024",
                            user_name: "Иван",
                            action: "Редактирование",
                            expanded: [
                                {
                                    field: "Часовой пояс",
                                    previous_value: "test",
                                    new_value: "test"
                                },
                                {
                                    field: "Часовой пояс",
                                    previous_value: "test",
                                    new_value: "test"
                                },
                            ]
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                        {
                            id: 2,
                            date: "23.03.2024",
                            user_name: "Андрей",
                            action: "Редактирование"
                        },
                    ],
                    total: 1000
                });
            }, 450);
        });
    }
};