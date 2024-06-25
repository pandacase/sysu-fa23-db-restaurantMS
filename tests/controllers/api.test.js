const tables = ["menu", "table", "order"];

const request = {
    body: {}
}

const response = {
    json: jest.fn()
};

describe('API Testing...', () => {
    for (const table of tables) {
        const controller = require(`../../src/controllers/${table}Controllers`)
        const testCases = require(`./${table}.json`);

        // 定义测试块
        describe(`Testing Insert in ${table} API...`, () => {
            testCases.Insert.forEach((testCase) => {
                test(`should handle ${testCase.name} correctly`, async () => {
                    let result;
                    switch (table) {
                        case "menu":
                            request.body = {
                                name: testCase.input.name,
                                price: testCase.input.price,
                                description: testCase.input.description
                            }
                            result = controller.menuAdd(request, response);
                            break;
                        case  "order":
                            request.body = {
                                item_list: testCase.input.item_list,
                                table_id: testCase.input.table_id,
                                customer_num: testCase.input.customer_num
                            }
                            result = controller.orderAdd(request, response)
                            break;
                        case "table":
                            request.body = {
                                type: testCase.input.type,
                                customer_num: testCase.input.customer_num
                            }
                            result = controller.tableAdd(request, response)
                            break;
                    }
                    await result
                    expect(response.json).toHaveBeenCalled();
                    expect(response.json).toHaveBeenCalledWith({success: testCase.expect});
                });
            });
        });
    }

    for (const table of tables.slice().reverse()) {
        const controller = require(`../../src/controllers/${table}Controllers`)
        const testCases = require(`./${table}.json`);

        describe(`Testing Update in ${table} API...`, () => {
            testCases.Update.forEach((testCase) => {
                test(`should handle ${testCase.name} correctly`, async () => {
                    let result;
                    switch (table) {
                        case "menu":
                            request.body = {
                                id: testCase.input.id,
                                name: testCase.input.name,
                                price: testCase.input.price,
                                description: testCase.input.description
                            }
                            result = await controller.menuUpdate(request, response);
                            break;
                        case  "order":
                            request.body = {
                                id: testCase.input.id,
                                item_list: testCase.input.item_list,
                                table_id: testCase.input.table_id,
                                customer_num: testCase.input.customer_num
                            }
                            result = await controller.orderUpdate(request, response)
                            break;
                        case "table":
                            request.body = {
                                id: testCase.input.id,
                                type: testCase.input.type,
                                customer_num: testCase.input.customer_num
                            }
                            result = await controller.tableUpdate(request, response)
                            break;
                    }
                    expect(response.json).toHaveBeenCalled();
                    expect(response.json).toHaveBeenCalledWith({success: testCase.expect});
                });
            });
        });

        describe(`Testing Delete in ${table} API...`, () => {
            testCases.Del.forEach((testCase) => {
                test(`should handle ${testCase.name} correctly`, async () => {
                    let result;
                    switch (table) {
                        case "menu":
                            request.params = {
                                id: testCase.params.id,
                            }
                            result = controller.menuDelete(request, response);
                            break;
                        case  "order":
                            request.params = {
                                id: testCase.params.id,
                            }
                            result = controller.orderDelete(request, response)
                            break;
                        case "table":
                            request.params = {
                                id: testCase.params.id,
                            }
                            result = controller.tableDelete(request, response)
                            break;
                    }
                    await result
                    expect(response.json).toHaveBeenCalled();
                    expect(response.json).toHaveBeenCalledWith({success: testCase.expect});
                });
            });
        });
    }
})



