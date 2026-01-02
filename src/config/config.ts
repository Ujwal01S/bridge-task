import Z from "zod";

const envSchema = Z.object({
  BASE_URL: Z.string().nonempty().default("https://dummyjson.com/"),
});

const validateEnv = () => {
  try {
    return envSchema.parse({
      BASE_URL: import.meta.env.VITE_BASE_URL,
    });
  } catch (error) {
    console.log({ error: error });
    throw new Error("Enviroment validation failed");
  }
};

const env = validateEnv();

export const config = {
  BASE_URL: env.BASE_URL,
};
