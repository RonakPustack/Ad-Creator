export interface Variant {
    id: string;
    variantNo: string;
    adType: string;
    confidence: string | null;
    imageUrl: string | null;
    oneLiner: string;
    imageDescription: string;
    adOrientation: string;
    text: string | null;
    rationale: string;
    adCreativeId: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdCreative {
    id: string;
    conversationId: string;
    adObjective: string;
    json: string;
    companyName: string;
    disclaimer: string;
    summary: string;
    variants: Variant[];
    createdAt: string;
    updatedAt: string;
}