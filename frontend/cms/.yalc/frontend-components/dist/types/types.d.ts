export declare type Step = {
    title: string;
    description: string;
    step_number: number;
    content: any;
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
export declare type Project = {
    title: string;
    short_description: string;
    experiments_description: string;
    long_description: string;
    experiments: Experiment[];
    glossary_terms: GlossaryTerm[];
};
export declare type Experiment = {
    id: number;
    cover: string;
    title: string;
    description: string;
    context?: any[];
    research_question?: string;
    experiment_setup?: any[];
    findings?: any[];
    steps: Step[];
    disclaimers?: string[];
    tags: string[];
};
