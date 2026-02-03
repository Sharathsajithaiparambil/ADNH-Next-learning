import { getSliderData } from "@/app/api/api";
import ScrollAnimatedImages from "./ScrollAnimatedImages";
import { WhoWeAreSectionProps } from "@/types";

export default async function WhoWeAreSection({ slug }: WhoWeAreSectionProps) {
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

  const { title, description, short_description, items } = sliderData;

  return (
    <section id="about-us" className="py-16 bg-[#fcfaf7] relative overflow-hidden">

      <div className="container mx-auto px-4 container-padding relative z-10">
        <div className="w-full mx-auto">
          {short_description && (
            <div className="flex justify-center mb-8">
              <button className="border border-gray-300 text-gray-700 px-5 py-1 rounded-lg text-sm font-medium  transition-colors">
                {short_description}
              </button>
            </div>
          )}

          {/* Title */}
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-4xl xl:text-4xl font-serif">
              <span className="text-secondary font-bold">The Story Behind</span>
              <span className="text-primary font-bold">{title.replace("The Story Behind ", " ")}</span>
            </h3>
            {/* Underline decoration */}
            <div className="flex justify-center mt-4">
              <div className="w-24 h-0.5 bg-secondary"></div>
            </div>
          </div>

          {/* Description */}
          <div
            className="text-lg lg:text-xl text-gray-800 leading-relaxed space-y-6 text-center prose prose-lg max-w-none prose-p:text-gray-800 prose-p:text-center"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {/* Images with scroll animation */}
          {items && items.length > 0 && (
            <ScrollAnimatedImages
              items={items
                ?.sort((a: any, b: any) => a.display_order - b.display_order)
                .map((item: any) => ({
                  id: item.id,
                  image: item.image,
                  mobileImage: item.mobile_image,
                  title: item.title,
                })) || []}
            />
          )}
        </div>
      </div>
    </section>
  );
}

