import { fromIni } from "@aws-sdk/credential-provider-ini";

export const dynamoConfig = (): object => {
  console.log(process.env.ENVIRONMENT);
  if (process.env.ENVIRONMENT === "local") {
    return {
      region: "us-east-1",
      credentials: fromIni({ profile: process.env.PROFILE }),
    };
  }

  return {};
};

export const getCorsOrigin = (): string => {
  const [local, dev] = process.env.ORIGIN?.split("|") as [string, string];

  if (process.env.ENVIRONMENT === "dev") {
    return dev;
  }
  return local;
};
