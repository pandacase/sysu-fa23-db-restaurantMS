const request = require('supertest');
const app = require('../../src/app');

const tables = ["menu", "table", "order"];

describe('API Testing...', () => {
    for (const table of tables) {
        const testCases = require(`./${table}.json`);

        describe(`Testing Insert in ${table} Router...`, () => {
            testCases.Insert.forEach((testCase) => {
                test(`should handle ${testCase.name} correctly`, async () => {
                    let response, data;
                    switch (table) {
                        case "menu":
                            data = {
                                name: testCase.input.name,
                                price: testCase.input.price,
                                description: testCase.input.description
                            }
                            response = await request(app).post(`/${table}/add`).send(data)
                            break;
                        case  "order":
                            data = {
                                item_list: testCase.input.item_list,
                                table_id: testCase.input.table_id,
                                customer_num: testCase.input.customer_num
                            }
                            response = await request(app).post(`/${table}/add`).send(data)
                            break;
                        case "table":
                            data = {
                                type: testCase.input.type,
                                customer_num: testCase.input.customer_num
                            }
                            response = await request(app).post(`/${table}/add`).send(data)
                            break;
                    }

                    expect(response.statusCode).toBe(200);
                    expect(response.body).toHaveProperty('success');
                    expect(response.body.success).toBe(testCase.expect)
                });
            });
        });
    }

    for (const table of tables.slice().reverse()) {
        const testCases = require(`./${table}.json`);

        describe(`Testing Update in ${table} Router...`, () => {
            testCases.Update.forEach((testCase) => {
                test(`should handle ${testCase.name} correctly`, async () => {
                    let response, data;
                    switch (table) {
                        case "menu":
                            data = {
                                id: testCase.input.id,
                                name: testCase.input.name,
                                price: testCase.input.price,
                                description: testCase.input.description
                            }
                            response = await request(app).patch(`/${table}/update`).send(data)
                            break;
                        case  "order":
                            data = {
                                id: testCase.input.id,
                                item_list: testCase.input.item_list,
                                table_id: testCase.input.table_id,
                                customer_num: testCase.input.customer_num
                            }
                            response = await request(app).patch(`/${table}/update`).send(data)
                            break;
                        case "table":
                            data = {
                                id: testCase.input.id,
                                type: testCase.input.type,
                                customer_num: testCase.input.customer_num
                            }
                            response = await request(app).patch(`/${table}/update`).send(data)
                            break;
                    }

                    expect(response.statusCode).toBe(200);
                    expect(response.body).toHaveProperty('success');
                    expect(response.body.success).toBe(testCase.expect)
                });
            });
        });

        describe(`Testing Delete in ${table} Router...`, () => {
            testCases.Del.forEach((testCase) => {
                test(`should handle ${testCase.name} correctly`, async () => {
                    let response;
                    switch (table) {
                        case "menu":
                            response = await request(app).delete(`/${table}/delete/${testCase.params.id}`)
                            break;
                        case  "order":
                            response = await request(app).delete(`/${table}/delete/${testCase.params.id}`)
                            break;
                        case "table":
                            response = await request(app).delete(`/${table}/delete/${testCase.params.id}`)
                            break;
                    }

                    expect(response.statusCode).toBe(200);
                    expect(response.body).toHaveProperty('success');
                    expect(response.body.success).toBe(testCase.expect)
                });
            });
        });
    }
})