import getHeaderImage from "@/app/api/api";
import HeaderWrapper from "./HeaderWrapper";

export default async function Header() {
  let logoUrl = "";
  const fallbackLogo = "/images/Icon/logo_dark_logo-dark_1769083126 (2).svg";

  try {
    const result = await getHeaderImage();
    if (result?.success && result?.data?.logo_dark) {
      const logoPath = result.data.logo_dark;
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      logoUrl = `${baseUrl}/storage/${logoPath}`;
    }
  } catch (error) {
    console.error("Failed to fetch header settings:", error);
  }
  const displayLogoUrl = logoUrl || fallbackLogo;

  return <HeaderWrapper logoUrl={displayLogoUrl} />;
}

