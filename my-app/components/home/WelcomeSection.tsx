import { getSliderData } from "@/app/api/api";
import DesktopImageRow from "./DesktopImageRow";
import MobileImageCarousel from "./MobileImageCarousel";
import { HiArrowRight } from "react-icons/hi";
import { HeroSectionProps } from "@/types";

export default async function WelcomeSection({ slug }: HeroSectionProps) {
  let sliderData = null;

  try {
    const response = await getSliderData(slug);
    if (response?.success) {
      sliderData = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch slider data:", error);
  }

  if (!sliderData) {
    return null;
  }

  const { title, description, items } = sliderData;

  return (
    <section id="home" className="py-12 bg-slate-100">
      <div className="container mx-auto px-4 container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="space-y-6 lg:col-span-2 lg:pr-20 lg:pt-20">
            <h1 className="text-4xl lg:text-5xl font-serif text-secondary font-normal">
              Welcome to
            </h1>
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-primary">
              {title.replace("Welcome to ", "")}
            </h2>
            <div
              className="text-xl leading-relaxed  space-y-4 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            
            <div className="flex flex-col sm:flex-row gap-6 pt-0 items-start">
              <button className="btn-primary text-white px-6 py-3 rounded-lg text-xl font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:scale-95 whitespace-nowrap flex items-center gap-2">
                Get In Touch
                <HiArrowRight className="text-xl" />
              </button>
              <button
                className="text-primary  px-6 py-3 rounded-lg text-xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-95 font-semibold hover:text-secondary transition-colors flex items-center gap-2"
              >
                Explore More
                <HiArrowRight className="text-xl" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            {/* Desktop: DesktopImageRow with expand/collapse */}
            <div className="hidden lg:block">
              <DesktopImageRow
                items={items
                  ?.sort((a: any, b: any) => a.display_order - b.display_order)
                  .map((item: any) => ({
                    id: item.id,
                    image: item.image,
                    mobileImage: item.mobile_image,
                    title: item.title,
                  })) || []}
              />
            </div>

            {/* Mobile: Carousel with auto-switch */}
            <div className="lg:hidden">
              <MobileImageCarousel
                items={items
                  ?.sort((a: any, b: any) => a.display_order - b.display_order)
                  .map((item: any) => ({
                    id: item.id,
                    image: item.image,
                    mobileImage: item.mobile_image,
                    title: item.title,
                  })) || []}
                interval={3000}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

