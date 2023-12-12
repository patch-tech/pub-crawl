

import { Field, StringField } from "../field";
import { FieldExpr } from "../field_expr";
import { Table } from "../table";


export class SfRestaurants {
    // Fields.
    public static fields = {
        businessId: new Field<number>("BUSINESS_ID"),
	businessName: new StringField("BUSINESS_NAME"),
	businessAddress: new StringField("BUSINESS_ADDRESS"),
	businessCity: new StringField("BUSINESS_CITY"),
	businessState: new StringField("BUSINESS_STATE"),
	businessPostalCode: new StringField("BUSINESS_POSTAL_CODE"),
	businessLatitude: new Field<number>("BUSINESS_LATITUDE"),
	businessLongitude: new Field<number>("BUSINESS_LONGITUDE"),
	businessLocation: new StringField("BUSINESS_LOCATION"),
	businessPhoneNumber: new Field<number>("BUSINESS_PHONE_NUMBER"),
	inspectionId: new StringField("INSPECTION_ID"),
	inspectionDate: new StringField("INSPECTION_DATE"),
	inspectionScore: new Field<number>("INSPECTION_SCORE"),
	inspectionType: new StringField("INSPECTION_TYPE"),
	violationId: new StringField("VIOLATION_ID"),
	violationDescription: new StringField("VIOLATION_DESCRIPTION"),
	riskCategory: new StringField("RISK_CATEGORY"),
	neighborhoods: new Field<number>("NEIGHBORHOODS")
    };

    private table_: Table;

    // Singleton.
    private static instance: SfRestaurants;

    private constructor() {
      this.table_ = new Table({
        packageId: "018bd006-00da-74d5-b63b-ff4a33dfbbe1",
        datasetName: "bars-and-restaurants",
        datasetVersion: "0.1.0",
        name: "SF_RESTAURANTS",
        source: "https://example.snowflakecomputing.com",
        fields: Object.values(SfRestaurants.fields)
      });
    }

    private static get(): SfRestaurants {
      if (!SfRestaurants.instance) {
        SfRestaurants.instance = new SfRestaurants();
      }
      return SfRestaurants.instance;
    }

    public static table(): Table {
      return this.get().table_;
    }

    public static select(...selection: ("BUSINESS_ID" | "BUSINESS_NAME" | "BUSINESS_ADDRESS" | "BUSINESS_CITY" | "BUSINESS_STATE" | "BUSINESS_POSTAL_CODE" | "BUSINESS_LATITUDE" | "BUSINESS_LONGITUDE" | "BUSINESS_LOCATION" | "BUSINESS_PHONE_NUMBER" | "INSPECTION_ID" | "INSPECTION_DATE" | "INSPECTION_SCORE" | "INSPECTION_TYPE" | "VIOLATION_ID" | "VIOLATION_DESCRIPTION" | "RISK_CATEGORY" | "NEIGHBORHOODS" | FieldExpr)[]): Table {
      return this.table().select(...selection);
    }
    // Rest of the stuff.
};
