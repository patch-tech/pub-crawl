import { env } from 'process';
import { input, select } from '@inquirer/prompts';
import { SfRestaurants, RestaurantInsights } from "bars-and-restaurants";

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

async function getEnv(name: string, defaultValue?: string): Promise<string> {
  const value = env[name];
  if (value === undefined) {
    if (defaultValue) {
      return defaultValue;
    } else {
      throw new Error(`Undefined env variable: ${name}`);
    }
  }

  return value;
}


async function getLatLong(location: string): Promise<LatLong | string> {
	const geocode_key = await getEnv('MAPQUEST_API_TOKEN', undefined);
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
		// console.log(result);
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


interface Bar {
	Location_Name: string
	Latitude: number,
	Longitude: number,
	Phone_Number: string,
	Street_Address: string,
	Median_Spend: number,
	dist?: number,
}

function from_ratio(a: number, r: number, c: number) {
	let d = c - a;
	return (d * r) + a;
}

async function query_by_latlon(lat0: number, lon0: number, lat1: number, lon1: number, city: string, crawl_type: string) {

	let min_lat = Math.min(lat0, lat1);
	let min_lon = Math.min(lon0, lon1);
	let max_lat = Math.max(lat0, lat1);
	let max_lon = Math.max(lon0, lon1);

	if (city == 'NYC') {
		console.log(crawl_type);
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
			closedOn.as("Closed_On"),)
			.filter(categoryTags
				.like(crawl_type)
				.and(latitude.gte(min_lat - 0.005))
				.and(latitude.lte(max_lat + 0.005))
				.and(longitude.gte(min_lon - 0.005))
				.and(longitude.lte(max_lon + 0.005))
				.and(closedOn.isNull()))
			.limit(50);

		let bars = (await query.execute()) as Bar[];

		return bars;
	} else {
		let { 
			businessAddress,
			businessLatitude,
			businessLongitude,
			businessName,
			businessPhoneNumber
		 } = SfRestaurants.fields;

		let query = SfRestaurants.select(
			businessName.as("Location_Name"),
			businessLatitude.as("Latitude"),
			businessLongitude.as("Longitude"),
			businessPhoneNumber.as("Phone_Number"),
			businessAddress.as("Street_Address")
			)
			.filter(businessLatitude.gte(min_lat - 0.01)
			.and(businessLatitude.lte(max_lat + 0.01))
			.and(businessLongitude.gte(min_lon - 0.01))
			.and(businessLongitude.lte(max_lon + 0.01)))
			.limit(50);

		let bars = (await query.execute()) as Bar[];
		for(const bar of bars) {
			bar.Median_Spend = 30.00
		}
		return bars;
	}
}

async function get_bars(xlat0: number, xlon0: number, xlat1: number, xlon1: number, city: string, crawl_type: string) {

	function calc_dist2(lat0: number, lon0: number, lat1: number, lon1: number) {
		return function(x: Bar) {
			let dy = Math.abs(((x.Latitude ?? 0) - lat0) / (lat1 - lat0));
			let dx = Math.abs(((x.Longitude ?? 0) - lon0) / (lon1 - lon0));
			x.dist = dx + dy;
			return x;
		};
	}

	let lat = xlat0;
	let lon = xlon0;
	let bars_ret: Bar[] = [];

	let n = 5;
	for (let i = 0; i < n; i++) {
		let r0 = 0.5 / (n - i);

		let lat0 = from_ratio(lat, r0, xlat1);
		let lon0 = from_ratio(lon, r0, xlon1);
		//console.log("Lat: " + lat0 + " Long: " + lon0);

		let bars = (await query_by_latlon(lat0, lon0, xlat1, xlon1, city, crawl_type));
		//console.log("These are the bars:" + bars);
		let dfn = calc_dist2(lat0, lon0, xlat1, xlon1);
		let bars0 = [...bars].map(dfn);
		bars0.sort((a: Bar, b: Bar) => ((a.dist ?? 0) - (b.dist ?? 0)));
		//console.log(bars0.length);

		if (bars0.length > 0) {

			let next_bar = bars0[0];
			//console.log("Next is: " + next_bar);

			bars_ret.push(next_bar);

			lat = next_bar.Latitude ?? 0;
			lon = next_bar.Longitude ?? 0;

		} else {
			i = n;
		}
	}

	return bars_ret;
}

function summarize(path_name: string, bars: Bar[]) {
	let spend = 0;
	console.log(`Pub crawl ${path_name}:\n`);
	for (const bar of bars) {
		spend += bar.Median_Spend;
		console.log(`Pub: ${bar.Location_Name}\nAddress: ${bar.Street_Address}\nPhone:${bar.Phone_Number}\n`);
	}
	console.log(`Your expected cost for the crawl: $${Math.floor(spend)}`);
}


async function main() {
	const crawl_name = await input({ message: "What's the name of this epic adventure?" });
	const city = await select({ 
		message: 'Where are you crawling?',
		choices: [{
			name: 'New York City',
			value: 'NYC',
			description: 'The Big Apple'
		}]
	});
	let crawl_type = "";
	if (city === "NYC") {
		crawl_type = await select({ 
			message: "Just bars? Or restaurants too?",
			choices: [{
				name: 'Bars only',
      			value: '%Bar or Pub%',
     			description: 'I thought this was a pub crawl?',
			}, {
				name: 'Bars and restaurants',
      			value: '%a%',
     			description: 'We gotta eat too!',
			}] 
		});
	}
	const start_location = await input({ message: 'What is your starting address (e.g. 166 Chambers St)?' });
	const end_location = await input({ message: 'What is your destination address?' });
 
	const start = await getLatLong(start_location + ", " + city) as LatLong;
	// console.log(start);
	const end = await getLatLong(end_location + ", " + city) as LatLong;
	// console.log(end);
	const bars = (await get_bars(start.lat, start.lng, end.lat, end.lng, city, crawl_type));

	summarize(crawl_name, bars);
}

main().catch(console.error);


// 166 Chambers St, New York, NY 10007
// 40.716110
// -74.010790

// 230 E 51st St, New York, NY 10022
// 40.755760
// -73.968979
