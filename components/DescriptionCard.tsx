import Image from "next/image";
import React from "react";

interface FeatureCardProps {
    imageSrc: string;
    altText: string;
    description: string;
}

const DescriptionCard: React.FC<FeatureCardProps> = ({
    imageSrc,
    altText,
    description,
}) => {
    return (
        <div className="flex flex-col basis-1/3 md:basis-1/5  items-center text-center gap-2">
            <Image src={imageSrc} alt={altText} width={60} height={60} />
            <p className="text-white">{description}</p>
        </div>
    );
};

export default DescriptionCard;
