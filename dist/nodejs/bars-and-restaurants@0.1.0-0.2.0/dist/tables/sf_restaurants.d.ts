import { Field, StringField } from "../field";
import { FieldExpr } from "../field_expr";
import { Table } from "../table";
export declare class SfRestaurants {
    static fields: {
        businessId: Field<number>;
        businessName: StringField;
        businessAddress: StringField;
        businessCity: StringField;
        businessState: StringField;
        businessPostalCode: StringField;
        businessLatitude: Field<number>;
        businessLongitude: Field<number>;
        businessLocation: StringField;
        businessPhoneNumber: Field<number>;
        inspectionId: StringField;
        inspectionDate: StringField;
        inspectionScore: Field<number>;
        inspectionType: StringField;
        violationId: StringField;
        violationDescription: StringField;
        riskCategory: StringField;
        neighborhoods: Field<number>;
    };
    private table_;
    private static instance;
    private constructor();
    private static get;
    static table(): Table;
    static select(...selection: ("BUSINESS_ID" | "BUSINESS_NAME" | "BUSINESS_ADDRESS" | "BUSINESS_CITY" | "BUSINESS_STATE" | "BUSINESS_POSTAL_CODE" | "BUSINESS_LATITUDE" | "BUSINESS_LONGITUDE" | "BUSINESS_LOCATION" | "BUSINESS_PHONE_NUMBER" | "INSPECTION_ID" | "INSPECTION_DATE" | "INSPECTION_SCORE" | "INSPECTION_TYPE" | "VIOLATION_ID" | "VIOLATION_DESCRIPTION" | "RISK_CATEGORY" | "NEIGHBORHOODS" | FieldExpr)[]): Table;
}
