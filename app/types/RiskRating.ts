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
    [key: number]: number;
}

export interface LineChartDataset {
    label: string;
    data: LineChartData;
    borderColor: string;
    backgroundColor: string;
}
