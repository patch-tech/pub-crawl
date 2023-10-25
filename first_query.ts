import { RestaurantInsights } from "pub-crawl";
import inquirer from 'inquirer';

async function main() {
  let { locationName,
    categoryTags,
    latitude,
    longitude,
    phoneNumber,
    streetAddress,
    medianSpendPerCustomer,
    openedOn,
    closedOn } = RestaurantInsights.fields;

  let query = RestaurantInsights.select(
      categoryTags.as("Category_Tags"),
      locationName.as("Location_Name"),
      latitude.as("Latitude"),
      longitude.as("Longitude"),
      phoneNumber.as("Phone_Number"),
      streetAddress.as("Street_Address"),
      medianSpendPerCustomer.as("Median_Spend"),
      openedOn.as("Opened_On"),
      closedOn.as("Closed_On"))
    .filter(categoryTags.like('%Bar or Pub%'))
    .orderBy
    .limit(10);

  await query.execute().then((data) => console.log(data));
}

main().catch(console.error);
