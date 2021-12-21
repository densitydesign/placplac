export declare type RowType = {
    divided: boolean;
    cols: any[];
};
export declare type Step = {
    title: string;
    description: string;
    step_number: number;
    content: RowType[];
    glossary_terms: GlossaryTerm[];
    downloads: {
        id: string;
        file: string;
        title: string;
        name: string;
    }[];
};
export declare type GlossaryTerm = {
    id: string;
    title: string;
    color: string;
    glossary_category: string;
    category_title: string;
    more_info_url: string;
    image: string | null;
    description: string;
};
export declare type GlossaryCategory = {
    id: number;
    title: string;
    description: string;
    color: string;
};
export declare type Reference = {
    id: number;
    description: string;
};
export declare type LanguageOptions = "it" | "en";
export declare type Project = {
    title: string;
    short_description: string;
    experiments_description: string;
    long_description: string;
    experiments: Experiment[];
    glossary_terms: GlossaryTerm[];
    language: LanguageOptions;
    references: Reference[];
};
export declare type Experiment = {
    id: number;
    cover: string;
    title: string;
    description: string;
    context?: RowType[];
    research_question?: string;
    experiment_setup?: RowType[];
    findings?: RowType[];
    steps: Step[];
    tags: string[];
    glossary_terms: GlossaryTerm[];
    references: Reference[];
};
export declare type Footer = {
    partners?: {
        link: string;
        image: string;
    }[];
    founded_by?: {
        link: string;
        image: string;
    }[];
    socials?: {
        facebook?: string;
        twitter?: string;
        mail?: string;
    };
};
