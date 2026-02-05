import { getSliderData, getSectors } from "@/app/api/api";
import { SectorsSectionProps } from "@/types";
import SectorsClient from "./SectorsClient";

export default async function SectorsSection({ slug }: SectorsSectionProps) {
    let headerData = null;
    let sectorsData = null;
    
    try {
        const headerResponse = await getSliderData(slug);
        if (headerResponse?.success && headerResponse?.data) {
            headerData = headerResponse.data;
        }

        const sectorsResponse = await getSectors();
        if (sectorsResponse?.success && sectorsResponse?.data) {
            sectorsData = sectorsResponse.data;
        }
    } catch (error) {
        console.error("Failed to fetch sectors data:", error);
    }

    if (!headerData || !sectorsData || !Array.isArray(sectorsData)) {
        return null;
    }

    const { title, description, short_description } = headerData;

    let finalSectorsData = sectorsData;
    if (sectorsData.length < 8) {
        const duplicatesNeeded = Math.ceil(8 / sectorsData.length);
        finalSectorsData = [];
        for (let i = 0; i < duplicatesNeeded; i++) {
            sectorsData.forEach((sector, idx) => {
                finalSectorsData.push({
                    ...sector,
                    _uniqueKey: `${sector.id}-dup-${i}-${idx}`
                });
            });
        }
    }

    return (
        <SectorsClient 
            title={title}
            description={description}
            short_description={short_description}
            sectors={finalSectorsData}
        />
    );
}