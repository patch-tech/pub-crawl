import { RestaurantInsights } from "pub-crawl";

async function main() {
  let { categoryTags  } = RestaurantInsights.fields;

  let query = RestaurantInsights.select(
    categoryTags.as("Category_Tags"),
  ).filter()
    .limit(10);

  await query.compile().then((data)=> console.log("Compiled query: ", data));
  await query.execute().then((data)=> console.log(data));
}

main().catch(console.error);
