export interface Risk {
    'Asset Name': string;
    Lat: number;
    Long: number;
    'Business Category': string;
    'Risk Rating': number;
    'Risk Factors': {
        Earthquake?: number;
        'Extreme heat'?: number;
        Wildfire?: number;
        Tornado?: number;
        Flooding?: number;
        Volcano?: number;
        Hurricane?: number;
        Drought?: number;
        'Extreme cold'?: number;
        'Sea level rise'?: number;
    };
    Year: number;
}

export interface LineChartData {
    year: string;
    aggregatedRisk: number;
    riskFactors: {
        Hurricane: number;
        ExtremeHeat?: number;
        Tornado?: number;
        Wildfire?: number;
        Flooding?: number;
        Drought?: number;
        Volcano?: number;
        ExtremeCold?: number;
        Earthquake?: number;
        SeaLevelRise?: number;
    };
}

export interface LineChartDataset {
    label: string;
    data: LineChartData;
    borderColor: string;
    backgroundColor: string;
}

export interface TableRiskData {
    data: Risk[];
    totalPages: number;
    currentPage: number;
}

export interface MapChartData {
    [key: string]: {
        totalRiskRating: number;
        businessCategories: { [key: string]: boolean };
        assetsNum: number;
    };
}

export interface FilterContext {
    selectedYear: number | '';
    setSelectedYear: React.Dispatch<React.SetStateAction<number | ''>>;
    riskFactorLists: { [key: string]: boolean };
    setRiskFactorLists: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    selectedAsset: string;
    setSelectedAsset: React.Dispatch<React.SetStateAction<string>>;
    selectedBusinessCategory: string;
    setSelectedBusinessCategory: React.Dispatch<React.SetStateAction<string>>;
    selectedLocation: string;
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
}
