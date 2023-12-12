"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SfRestaurants = void 0;
const field_1 = require("../field");
const table_1 = require("../table");
class SfRestaurants {
    // Fields.
    static fields = {
        businessId: new field_1.Field("BUSINESS_ID"),
        businessName: new field_1.StringField("BUSINESS_NAME"),
        businessAddress: new field_1.StringField("BUSINESS_ADDRESS"),
        businessCity: new field_1.StringField("BUSINESS_CITY"),
        businessState: new field_1.StringField("BUSINESS_STATE"),
        businessPostalCode: new field_1.StringField("BUSINESS_POSTAL_CODE"),
        businessLatitude: new field_1.Field("BUSINESS_LATITUDE"),
        businessLongitude: new field_1.Field("BUSINESS_LONGITUDE"),
        businessLocation: new field_1.StringField("BUSINESS_LOCATION"),
        businessPhoneNumber: new field_1.Field("BUSINESS_PHONE_NUMBER"),
        inspectionId: new field_1.StringField("INSPECTION_ID"),
        inspectionDate: new field_1.StringField("INSPECTION_DATE"),
        inspectionScore: new field_1.Field("INSPECTION_SCORE"),
        inspectionType: new field_1.StringField("INSPECTION_TYPE"),
        violationId: new field_1.StringField("VIOLATION_ID"),
        violationDescription: new field_1.StringField("VIOLATION_DESCRIPTION"),
        riskCategory: new field_1.StringField("RISK_CATEGORY"),
        neighborhoods: new field_1.Field("NEIGHBORHOODS")
    };
    table_;
    // Singleton.
    static instance;
    constructor() {
        this.table_ = new table_1.Table({
            packageId: "018bd006-00da-74d5-b63b-ff4a33dfbbe1",
            datasetName: "bars-and-restaurants",
            datasetVersion: "0.1.0",
            name: "SF_RESTAURANTS",
            source: "https://example.snowflakecomputing.com",
            fields: Object.values(SfRestaurants.fields)
        });
    }
    static get() {
        if (!SfRestaurants.instance) {
            SfRestaurants.instance = new SfRestaurants();
        }
        return SfRestaurants.instance;
    }
    static table() {
        return this.get().table_;
    }
    static select(...selection) {
        return this.table().select(...selection);
    }
}
exports.SfRestaurants = SfRestaurants;
;
