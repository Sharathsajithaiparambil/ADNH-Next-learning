import { getOurBrands } from "@/app/api/api";
import OurBrandsClient from "./OurBrandsClient";
import { Brand } from "@/types";

export default async function OurBrandsSection() {
  let brands: Brand[] = [];

  try {
    const response = await getOurBrands();
    if (response?.success && response?.data) {
      brands = response.data.sort(
        (a: Brand, b: Brand) => a.display_order - b.display_order
      );
    }
  } catch (error) {
    console.error("Failed to fetch brands:", error);
  }

  if (!brands || brands.length === 0) {
    return null;
  }

  return <OurBrandsClient brands={brands} />;
}

