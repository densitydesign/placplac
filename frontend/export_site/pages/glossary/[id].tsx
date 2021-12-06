import type { NextPage } from "next";
import { ExperimentShow, GlossaryCategoryShow } from "frontend-components";
import path from "path";
import { promises as fs } from "fs";
import Link from "../../components/link";
import dynamic from "next/dynamic";

export async function getStaticPaths() {
  const filePath = process.env.FILE_PATH!;

  const fileContents = await fs.readFile(filePath, "utf8");
  const categories = JSON.parse(fileContents).glossary_categories.map(
    (category: any) => ({ params: { id: category.id.toString() } })
  );
  return {
    paths: categories,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  const filePath = path.join(process.cwd(), "data.json");
  const fileContents = JSON.parse(await fs.readFile(filePath, "utf8"));
  const category = fileContents.glossary_categories.find(
    (category: any) => category.id.toString() === params.id.toString()
  );
  const terms = fileContents.glossary_terms.filter(
    (term: any) => category.title === term.category_title
  );

  return {
    props: {
      experiments: fileContents.experiments,
      category,
      terms,
    },
  };
}
const Layout = dynamic(() => import("../../components/layout"), { ssr: false });

const GlossaryCategory: NextPage = ({ category, terms, experiments }: any) => {
  return (
    <Layout experiments={experiments}>
      <GlossaryCategoryShow glossaryCategory={category} glossaryTerms={terms} />
    </Layout>
  );
};

export default GlossaryCategory;