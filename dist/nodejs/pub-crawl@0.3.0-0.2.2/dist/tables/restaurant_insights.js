"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantInsights = void 0;
const field_1 = require("../field");
const table_1 = require("../table");
class RestaurantInsights {
    // Fields.
    static fields = {
        placekey: new field_1.StringField("PLACEKEY"),
        parentPlacekey: new field_1.StringField("PARENT_PLACEKEY"),
        locationName: new field_1.StringField("LOCATION_NAME"),
        safegraphBrandIds: new field_1.StringField("SAFEGRAPH_BRAND_IDS"),
        brands: new field_1.StringField("BRANDS"),
        topCategory: new field_1.StringField("TOP_CATEGORY"),
        subCategory: new field_1.StringField("SUB_CATEGORY"),
        naicsCode: new field_1.Field("NAICS_CODE"),
        latitude: new field_1.Field("LATITUDE"),
        longitude: new field_1.Field("LONGITUDE"),
        streetAddress: new field_1.StringField("STREET_ADDRESS"),
        city: new field_1.StringField("CITY"),
        region: new field_1.StringField("REGION"),
        postalCode: new field_1.StringField("POSTAL_CODE"),
        isoCountryCode: new field_1.StringField("ISO_COUNTRY_CODE"),
        phoneNumber: new field_1.StringField("PHONE_NUMBER"),
        categoryTags: new field_1.StringField("CATEGORY_TAGS"),
        openedOn: new field_1.StringField("OPENED_ON"),
        closedOn: new field_1.StringField("CLOSED_ON"),
        trackingClosedSince: new field_1.StringField("TRACKING_CLOSED_SINCE"),
        geometryType: new field_1.StringField("GEOMETRY_TYPE"),
        spendDateRangeStart: new field_1.StringField("SPEND_DATE_RANGE_START"),
        spendDateRangeEnd: new field_1.StringField("SPEND_DATE_RANGE_END"),
        rawTotalSpend: new field_1.Field("RAW_TOTAL_SPEND"),
        rawNumTransactions: new field_1.Field("RAW_NUM_TRANSACTIONS"),
        rawNumCustomers: new field_1.Field("RAW_NUM_CUSTOMERS"),
        medianSpendPerTransaction: new field_1.Field("MEDIAN_SPEND_PER_TRANSACTION"),
        medianSpendPerCustomer: new field_1.Field("MEDIAN_SPEND_PER_CUSTOMER"),
        spendPctChangeVsPrevMonth: new field_1.Field("SPEND_PCT_CHANGE_VS_PREV_MONTH"),
        spendPctChangeVsPrevYear: new field_1.Field("SPEND_PCT_CHANGE_VS_PREV_YEAR"),
        onlineTransactions: new field_1.Field("ONLINE_TRANSACTIONS"),
        onlineSpend: new field_1.Field("ONLINE_SPEND")
    };
    table_;
    // Singleton.
    static instance;
    constructor() {
        this.table_ = new table_1.Table({
            packageId: "07bd7fb6-3155-4e8a-9f9d-dcef2dc57273",
            datasetName: "pub-crawl",
            datasetVersion: "0.3.0",
            name: "RESTAURANT_INSIGHTS",
            source: "https://example.snowflakecomputing.com",
            fields: Object.values(RestaurantInsights.fields)
        });
    }
    static get() {
        if (!RestaurantInsights.instance) {
            RestaurantInsights.instance = new RestaurantInsights();
        }
        return RestaurantInsights.instance;
    }
    static table() {
        return this.get().table_;
    }
    static select(...selection) {
        return this.table().select(...selection);
    }
}
exports.RestaurantInsights = RestaurantInsights;
;
