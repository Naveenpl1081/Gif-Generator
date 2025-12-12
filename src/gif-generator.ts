import dotenv from "dotenv";
dotenv.config();

interface QueryParams {
  prompt?: string;
}

interface LambdaEvent {
  httpMethod?: string;
  queryStringParameters: QueryParams;
}

interface GiphyImage {
  url: string;
}

interface GiphyImages {
  original: GiphyImage;
}

interface GiphyDataItem {
  images: GiphyImages;
}

interface GiphyResponse {
  data: GiphyDataItem[];
}

const testEvent: LambdaEvent = {
  queryStringParameters: {
    prompt: "naveen",
  },
};

export const handler = async (event: LambdaEvent) => {
  try {
    console.log("events", event);

    const giphyBaseUrl = process.env.GIPHY_BASE_URL;
    const giphyAPIKey = process.env.GIPHY_API;

    if (!giphyBaseUrl || !giphyAPIKey) {
      throw new Error("Missing Giphy ENV variables");
    }

    const prompt = event.queryStringParameters?.prompt;
    console.log(prompt);

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "You must provide a prompt" }),
      };
    }

    const response = await fetch(
      `${giphyBaseUrl}?api_key=${giphyAPIKey}&q=${prompt}&limit=1`
    );

    const data: GiphyResponse = await response.json();

    const gifUrl = data.data[0]?.images.original.url;
    console.log(gifUrl);


    if (!gifUrl) {
      throw new Error("GIF URL not found");
    }

    const gifResponse = await fetch(gifUrl);
    const arrayBuffer = await gifResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-cache",
      },
      body: buffer.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};

handler(testEvent);
