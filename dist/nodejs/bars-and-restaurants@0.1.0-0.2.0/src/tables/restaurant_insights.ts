

import { Field, StringField } from "../field";
import { FieldExpr } from "../field_expr";
import { Table } from "../table";


export class RestaurantInsights {
    // Fields.
    public static fields = {
        placekey: new StringField("PLACEKEY"),
	parentPlacekey: new StringField("PARENT_PLACEKEY"),
	locationName: new StringField("LOCATION_NAME"),
	safegraphBrandIds: new StringField("SAFEGRAPH_BRAND_IDS"),
	brands: new StringField("BRANDS"),
	topCategory: new StringField("TOP_CATEGORY"),
	subCategory: new StringField("SUB_CATEGORY"),
	naicsCode: new Field<number>("NAICS_CODE"),
	latitude: new Field<number>("LATITUDE"),
	longitude: new Field<number>("LONGITUDE"),
	streetAddress: new StringField("STREET_ADDRESS"),
	city: new StringField("CITY"),
	region: new StringField("REGION"),
	postalCode: new StringField("POSTAL_CODE"),
	isoCountryCode: new StringField("ISO_COUNTRY_CODE"),
	phoneNumber: new StringField("PHONE_NUMBER"),
	categoryTags: new StringField("CATEGORY_TAGS"),
	openedOn: new StringField("OPENED_ON"),
	closedOn: new StringField("CLOSED_ON"),
	trackingClosedSince: new StringField("TRACKING_CLOSED_SINCE"),
	geometryType: new StringField("GEOMETRY_TYPE"),
	spendDateRangeStart: new StringField("SPEND_DATE_RANGE_START"),
	spendDateRangeEnd: new StringField("SPEND_DATE_RANGE_END"),
	rawTotalSpend: new Field<number>("RAW_TOTAL_SPEND"),
	rawNumTransactions: new Field<number>("RAW_NUM_TRANSACTIONS"),
	rawNumCustomers: new Field<number>("RAW_NUM_CUSTOMERS"),
	medianSpendPerTransaction: new Field<number>("MEDIAN_SPEND_PER_TRANSACTION"),
	medianSpendPerCustomer: new Field<number>("MEDIAN_SPEND_PER_CUSTOMER"),
	spendPctChangeVsPrevMonth: new Field<number>("SPEND_PCT_CHANGE_VS_PREV_MONTH"),
	spendPctChangeVsPrevYear: new Field<number>("SPEND_PCT_CHANGE_VS_PREV_YEAR"),
	onlineTransactions: new Field<number>("ONLINE_TRANSACTIONS"),
	onlineSpend: new Field<number>("ONLINE_SPEND")
    };

    private table_: Table;

    // Singleton.
    private static instance: RestaurantInsights;

    private constructor() {
      this.table_ = new Table({
        packageId: "018bd006-00da-74d5-b63b-ff4a33dfbbe1",
        datasetName: "bars-and-restaurants",
        datasetVersion: "0.1.0",
        name: "RESTAURANT_INSIGHTS",
        source: "https://example.snowflakecomputing.com",
        fields: Object.values(RestaurantInsights.fields)
      });
    }

    private static get(): RestaurantInsights {
      if (!RestaurantInsights.instance) {
        RestaurantInsights.instance = new RestaurantInsights();
      }
      return RestaurantInsights.instance;
    }

    public static table(): Table {
      return this.get().table_;
    }

    public static select(...selection: ("PLACEKEY" | "PARENT_PLACEKEY" | "LOCATION_NAME" | "SAFEGRAPH_BRAND_IDS" | "BRANDS" | "TOP_CATEGORY" | "SUB_CATEGORY" | "NAICS_CODE" | "LATITUDE" | "LONGITUDE" | "STREET_ADDRESS" | "CITY" | "REGION" | "POSTAL_CODE" | "ISO_COUNTRY_CODE" | "PHONE_NUMBER" | "CATEGORY_TAGS" | "OPENED_ON" | "CLOSED_ON" | "TRACKING_CLOSED_SINCE" | "GEOMETRY_TYPE" | "SPEND_DATE_RANGE_START" | "SPEND_DATE_RANGE_END" | "RAW_TOTAL_SPEND" | "RAW_NUM_TRANSACTIONS" | "RAW_NUM_CUSTOMERS" | "MEDIAN_SPEND_PER_TRANSACTION" | "MEDIAN_SPEND_PER_CUSTOMER" | "SPEND_PCT_CHANGE_VS_PREV_MONTH" | "SPEND_PCT_CHANGE_VS_PREV_YEAR" | "ONLINE_TRANSACTIONS" | "ONLINE_SPEND" | FieldExpr)[]): Table {
      return this.table().select(...selection);
    }
    // Rest of the stuff.
};
