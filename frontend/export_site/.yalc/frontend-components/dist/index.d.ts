import React, { CSSProperties, ComponentType } from 'react';

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
    style?: CSSProperties;
}
declare const TextShow: ({ text, style }: TextShowProps) => JSX.Element;

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
    image: string | null;
    description: string;
};
declare type GlossaryCategory = {
    id: number;
    title: string;
    description: string;
    color: string;
};
declare type Project = {
    title: string;
    short_description: string;
    experiments_description: string;
    long_description: string;
    experiments: Experiment[];
    glossary_terms: GlossaryTerm[];
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
    disclaimers?: string[];
};

interface LayoutProps {
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    children: React.ReactNode;
}
declare const Layout: (props: LayoutProps) => JSX.Element;

interface ProjectProps {
    project: Project;
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
    glossaryTerms: GlossaryTerm[];
}
declare const ProjectShow: (props: ProjectProps) => JSX.Element;

interface ExperimentShowProps {
    experiment: Experiment;
    glossaryTerms: GlossaryTerm[];
    basePath: string;
    linkComponent: ComponentType<{
        href: string;
    }>;
}
declare const ExperimentShow: (props: ExperimentShowProps) => JSX.Element;

export { Experiment, ExperimentSetupListShow, ExperimentShow, GlossaryCategory, GlossaryTerm, ImageShow, Layout, Project, ProjectShow, SectionTitle, Step, TextShow };
