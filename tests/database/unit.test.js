const tables = ["dishes", "tables", "orders"];

const dbService = require('../../src/database/database');
const db = dbService.getDbServiceInstance();


describe('Unit Testing...', () => {
    for (const table of tables) {
        const testCases = require(`./${table}.json`);
        // 定义测试块
        describe(`Testing Insert in Table ${table}...`, () => {
            testCases.Insert.forEach((testCase) => {
                test(`should handle ${testCase.name} correctly`, async () => {
                    let result;
                    switch (table) {
                        case "dishes":
                            result = await db.insertToDishes(testCase.input.name, testCase.input.price, testCase.input.description);
                            break;
                        case  "orders":
                            result = await db.insertToOrders(testCase.input.item_list, testCase.input.table_id, testCase.input.customer_num)
                            break;
                        case "tables":
                            result = await db.insertToTables(testCase.input.type, testCase.input.customer_num)
                            break;
                    }
                    expect(result).toBe(testCase.expect);
                });
            });
        });

        describe(`Testing Update in Table ${table}...`, () => {
            testCases.Update.forEach((testCase) => {
                test(`should handle ${testCase.name} correctly`, async () => {
                    let result;
                    switch (table) {
                        case "dishes":
                            result = await db.updateDish(testCase.input.id, testCase.input.name, testCase.input.price, testCase.input.description);
                            break;
                        case  "orders":
                            result = await db.updateOrder(testCase.input.id, testCase.input.item_list, testCase.input.table_id)
                            break;
                        case "tables":
                            result = await db.updateTable(testCase.input.id, testCase.input.type, testCase.input.customer_num)
                            break;
                    }
                    expect(result).toBe(testCase.expect);
                });
            });
        });
    }
    for (const table of tables.slice().reverse()) {
        const testCases = require(`./${table}.json`);

        describe(`Testing Delete in Table ${table}...`, () => {
            testCases.Del.forEach((testCase) => {
                test(`should handle ${testCase.name} correctly`, async () => {
                    let result;
                    switch (table) {
                        case "dishes":
                            result = await db.deleteByIdFromDishes(testCase.input.id);
                            break;
                        case  "orders":
                            result = await db.deleteByIdFromOrders(testCase.input.id)
                            break;
                        case "tables":
                            result = await db.deleteByIdFromTables(testCase.input.id)
                            break;
                    }
                    expect(result).toBe(testCase.expect);
                });
            });
        });
    }

})



