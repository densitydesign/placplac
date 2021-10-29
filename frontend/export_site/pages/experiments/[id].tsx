import type { NextPage } from "next";
import { ExperimentShow } from "frontend-components";
import path from "path";
import { promises as fs } from "fs";
import Link from "../../components/link";

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const experiments = JSON.parse(fileContents).experiments.map(
    (experiment: any) => ({ params: { id: experiment.id.toString() } })
  );
  return {
    paths: experiments,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  const filePath = path.join(process.cwd(), "data.json");
  const fileContents = JSON.parse(await fs.readFile(filePath, "utf8"));
  const experiment = fileContents.experiments.find(
    (experiment: any) => experiment.id.toString() === params.id.toString()
  );

  return {
    props: {
      experiment,
      glossaryTerms: fileContents.glossary_terms,
    },
  };
}

const Experiment: NextPage = ({ experiment, glossaryTerms }: any) => {
  return (
    <ExperimentShow
      basePath=""
      glossaryTerms={glossaryTerms}
      experiment={experiment}
      backend={false}
      linkComponent={Link}
    />
  );
};

export default Experiment;
