import OtherSectors from "@/components/sectors/OtherSectors";
import { Sector } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSectors } from "../../api/api";

export default async function SectorDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const response = await getSectors();
    // @ts-ignore
    const sectors: Sector[] = response.data || [];
    const sector = sectors.find((s) => s.slug === params.slug);

    if (!sector) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            <section className="relative h-[100vh] w-full bg-black/40">
                <Image
                    src={sector.horizontal_thumbnail}
                    alt={sector.name}
                    fill
                    priority
                    className="object-cover -z-10"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 relative z-10 text-white">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-20">{sector.name}</h1>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="px-20 mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-serif text-[#C5A96F] mb-8 font-bold flex flex-col items-center">
                            Overview
                            <span className="h-1 w-16 bg-[#C5A96F] mt-4" />
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            {sector.short_description && <p className="text-xl mb-6 font-medium">{sector.short_description}</p>}
                            <div dangerouslySetInnerHTML={{ __html: sector.description || "" }} />
                        </div>
                    </div>
                </div>
            </section>

            <OtherSectors sectors={sectors} currentSectorId={sector.id} />
        </main>
    );
}
