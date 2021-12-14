import React, { ComponentType } from 'react';

interface ExperimentSetupListShowProps {
    title: string;
    subtitle: string;
    list: string[];
}
declare const ExperimentSetupListShow: (props: ExperimentSetupListShowProps) => JSX.Element;

interface ImageShowProps {
    caption?: string;
    title?: string;
    subtitle?: string;
    image: string;
    imageTitle?: string;
    isWide?: boolean;
    description?: string;
}
declare const ImageShow: (props: ImageShowProps) => JSX.Element;

declare const SectionTitle: (props: {
    title: string;
}) => JSX.Element;

interface TextShowProps {
    text: string;
}
declare const TextShow: ({ text }: TextShowProps) => JSX.Element;

declare type Step = {
    title: string;
    description: string;
    step_number: number;
    content: any;
};
declare type GlossaryTerm = {
    id: string;
    title: string;
    color: string;
    glossary_category: string;
    category_title: string;
    more_info_url: string;
    image: string | null;
    description: string;
};
declare type GlossaryCategory = {
    id: number;
    title: string;
    description: string;
    color: string;
};
declare type LanguageOptions = "it" | "en";
declare type Project = {
    title: string;
    short_description: string;
    experiments_description: string;
    long_description: string;
    experiments: Experiment[];
    glossary_terms: GlossaryTerm[];
    language: LanguageOptions;
};
declare type Experiment = {
    id: number;
    cover: string;
    title: string;
    description: string;
    context?: any[];
    research_question?: string;
    experiment_setup?: any[];
    findings?: any[];
    steps: Step[];
    tags: string[];
    glossary_terms: GlossaryTerm[];
};

interface LayoutProps {
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    children: React.ReactNode;
    experiments: Experiment[];
    language: LanguageOptions;
}
declare const Layout: (props: LayoutProps) => JSX.Element;

interface ProjectProps {
    project: Project;
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    glossaryTerms: GlossaryTerm[];
    glossaryCategories: GlossaryCategory[];
}
declare const ProjectShow: (props: ProjectProps) => JSX.Element;

interface ExperimentShowProps {
    experiment: Experiment;
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    glossaryCategories: GlossaryCategory[];
    language: LanguageOptions;
}
declare const ExperimentShow: (props: ExperimentShowProps) => JSX.Element;

interface GlossaryShowProps {
    glossaryCategories: GlossaryCategory[];
    glossaryTerms: GlossaryTerm[];
    linkComponent: ComponentType<{
        href: string;
    }>;
    basePath: string;
    language: LanguageOptions;
}
declare const GlossaryShow: (props: GlossaryShowProps) => JSX.Element;

interface GlossaryCategoryShowProps {
    glossaryCategory: GlossaryCategory;
    glossaryTerms: GlossaryTerm[];
}
declare const GlossaryCategoryShow: (props: GlossaryCategoryShowProps) => JSX.Element;

export { Experiment, ExperimentSetupListShow, ExperimentSetupListShowProps, ExperimentShow, ExperimentShowProps, GlossaryCategory, GlossaryCategoryShow, GlossaryShow, GlossaryTerm, ImageShow, LanguageOptions, Layout, Project, ProjectShow, SectionTitle, Step, TextShow, TextShowProps };
