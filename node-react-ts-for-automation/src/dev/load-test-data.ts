import { connectClient, stopClient } from "../server/db";

async function main() {
  const client = await connectClient();
  await client.collection("contests").deleteMany({});

  const resp = await client.collection("contests").insertMany([
    {
      id: "test-building",
      categoryName: "Business/Company",
      contestName: "Building Bricks",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      names: [
        {
          id: "mind-assembly",
          name: "Mind Assembly",
          timestamp: new Date(),
        },
        {
          id: "brain-scaffold",
          name: "Brain Scaffold",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "educating-people-about-sustainable",
      categoryName: "Magazine/Newsletter",
      contestName:
        "Educating people about sustainable food production",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      names: [],
    },
  ]);

  console.info("Inserted Contests: ", resp.insertedCount);
  stopClient();
}

main();
