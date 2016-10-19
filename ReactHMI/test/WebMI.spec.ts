import * as mocha from "mocha";
import { assert } from "chai";
import { mockedWebMI } from "./mock/webMI";
import * as WebMI from "../src/model/WebMI";

// Disable any logging by WebMI wrapper
WebMI.setLogger(() => {});

describe("WebMI Wrapper", function() {
    
    it("can read data", function() {
        // Mock data.read
        mockedWebMI.data = {
            read(nodeIDs, callback) {
                assert.deepEqual(nodeIDs, ["myDataPoint"], "datapoint argument for data.read");
                const results = nodeIDs.map(id => ({
                    error: 0,
                    value: 111
                }));
                callback(results);
            }
        }
        // Test
        return WebMI.readData(["myDataPoint"]).then(results => {
            assert.equal(results.length, 1, "number of results");
            assert.equal(results[0].value, 111, "value of first result");
        });
    });

    it("can handle errors when reading data", function() {
        mockedWebMI.data = {
            read(nodeIDs, callback) {
                callback([{
                    errorstring: "AnError"
                }]);
            }
        }
        return WebMI.readData(["myDataPoint"]).then(results => {
            assert(false, "shouldn't treat result as success");
        }).catch(errors => {
            assert.equal(errors.length, 1, "number of errors");
            assert.equal(errors[0].errorstring, "AnError", "returned error string")
        });
    });

    it("can subscribe to a datapoint", function() {
        mockedWebMI.data = {
            subscribe(nodeID, callback) {
                callback({
                    value: 111
                }, false);
                return 9;
            }
        }
        const subscriptionID = WebMI.subscribe("MyDatapoint", (result, error) => {
            assert.equal(result, 111, "value result");
        });
        assert.equal(subscriptionID, 9, "subscriptionID");
    });

    it("can report errors on subscriptions", function() {
        mockedWebMI.data = {
            subscribe(nodeID, callback) {
                callback({
                    value: undefined
                }, false);
                return 9;
            }
        }
        WebMI.subscribe("MyDatapoint", (value, error) => {
            assert.equal(error, true, "error value");
        });
    });

    it("can unsubscribe from a datapoint", function() {
        mockedWebMI.data = {
            unsubscribe(id) {
                assert.equal(id, 9, "value of subscription ID");
            },
        }
        WebMI.unsubscribe(9);
    });

    it("can subscribe to a group of datapoints", function() {
        let expected = ["dp1", "dp2"];
        mockedWebMI.data = {
            subscribe(nodeID, callback) {
                const i = expected.indexOf(nodeID);
                assert(i > -1, `did not expect ${nodeID}`);
                expected.splice(i, 1);
            }
        }
        WebMI.subscribeGroup(["dp1", "dp2"], () => {});
        assert.equal(expected.length, 0, "not all expected nodeIDs have subscriptions");
    });

    it("can unsubscribe from a group of datapoints", function() {
        let uniqueID = 0;
        let expected = [1, 2];
        mockedWebMI.data = {
            subscribe(nodeID, callback) {
                return ++uniqueID;
            },
            unsubscribe(subscriptionID) {
                const i = expected.indexOf(subscriptionID);
                assert(i > -1, `did not expect ${subscriptionID}`);
                expected.splice(i, 1);                
            }
        }
        const subscription = WebMI.subscribeGroup(["dp1", "dp2"], () => {});
        subscription.unsubscribe();
        assert.equal(expected.length, 0, "did not unsubscribe from all subscriptions");
    });

    it("group subscription will call callback only if all values are set", function() {
        let callbacks: ((result: any)=> void)[] = [];
        mockedWebMI.data = {
            subscribe(nodeID, callback) {
                callbacks.push(callback);
            }
        } 
        WebMI.subscribeGroup(["dp1", "dp2"], (values, error) => {
            // Should only be called once when all values are ready
            assert.equal(values.length, 2, "number of values");
            assert.equal(values[0], 1, "first value");
            assert.equal(values[1], 2, "second value");
        });
        // Call the registered callbacks one after the other
        callbacks.forEach((cb, index) => cb({value:index+1}));
    });
});