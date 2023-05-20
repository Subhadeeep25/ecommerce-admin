import Commerce from "@chec/commerce.js";
const uri = process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY;
if (!process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY) {
    throw new Error('Invalid/Missing environment variable: "CHEC_PUBLIC_KEY"');
  }
export const commerce=new Commerce(uri,true);
