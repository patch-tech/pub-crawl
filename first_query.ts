import { RestaurantInsights } from "pub-crawl";
import { input } from '@inquirer/prompts';

type LatLong = {
  lat: number,
  lng: number
};

type Location = {
  latLng: LatLong
};

type Result = {
  locations: Location[]
};

type LocationResponse = {
  results: Result[]
};


async function getLatLong(location: string) {
  const geocode_key = 'AutNw4O37s8NzuL7z0FkBbzZNoAqv2rO';
  try {
    const response = await fetch('https://www.mapquestapi.com/geocoding/v1/address?key=' + geocode_key, {
      method: 'POST',
      body: JSON.stringify({
        key: geocode_key,
        location: location
      }),
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as LocationResponse;

    return result.results[0].locations[0].latLng;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      console.log('error: ', error);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

async function main() {

  const start_location = await input({ message: 'Where are you starting?' });
  const end_location = await input({ message: 'Where are you stopping?' });

  console.log(start_location);
  console.log(end_location);

  console.log(await getLatLong(start_location));
  console.log(await getLatLong(end_location));

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
    .limit(10);

  await query.execute().then((data) => console.log(data));

}

main().catch(console.error);
