import Lenis from "lenis";

// Brand Types
export interface Brand {
  id: number;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  cta_text: string;
  cta_url: string;
  logo: string;
  thumbnail: string;
  alt_text: string;
  display_order: number;
}

export interface BrandModalProps {
  brand: Brand | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface OurBrandsClientProps {
  brands: Brand[];
}

// Image Types
export interface ImageItem {
  id: number;
  image: string;
  mobileImage?: string;
  title: string;
}

export interface ScrollAnimatedImagesProps {
  items: ImageItem[];
}

export interface AnimatedImageItemProps {
  item: ImageItem;
  index: number;
}

export interface DesktopImageRowProps {
  items: ImageItem[];
  autoSwapInterval?: number;
}

export interface MobileImageCarouselProps {
  items: ImageItem[];
  interval?: number;
}

export interface ImageRowProps {
  items: ImageItem[];
  autoSwapInterval?: number;
}

// Component Props Types
export interface HeroSectionProps {
  slug: string;
}

export interface WhoWeAreSectionProps {
  slug: string;
}

export interface MobileMenuProps {
  logoUrl?: string;
}

export interface HeaderWrapperProps {
  logoUrl: string;
}

export interface HeaderContentProps {
  logoUrl: string;
  isScrolled?: boolean;
}

export interface LenisContextType {
  lenis: Lenis | null;
}
