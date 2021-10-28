import { makeStyles } from "@material-ui/core";
import RichTextInput, { RichTextInputProps } from "ra-input-rich-text";

import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import { useDataProvider, useGetList } from "ra-core";
import { useMemo } from "react";
const useStyles = makeStyles((theme) => ({
  "@global": {
    ".ra-rich-text-input": {
      "& .ql-editor": {
        minHeight: "300px",
      },
    },
  },
}));

export const CustomRichTextInput = (
  props: RichTextInputProps & { project?: number }
) => {
  const dataProvider = useDataProvider();

  const classes = useStyles();
  const modules = useMemo(() => {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ["clean"],
    ];
    if (props.project) {
      return {
        modules: {
          toolbar: toolbarOptions,
          mention: {
            linkTarget: "_self",
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ["#"],
            source: async function (
              searchTerm: any,
              renderList: any,
              mentionChar: any
            ) {
              const { data } = await dataProvider.getList("glossary-terms", {
                pagination: { page: 1, perPage: Infinity },
                sort: { field: "title", order: "ASC" },
                filter: {
                  project: props.project,
                },
              });
              const glossaryItems = data.map((record) => {
                const { id } = record;
                const value = `<span style="background-color:${record.color}">${record.title}</span>`;
                const link = `#glossary/${id}`;
                return { id, value, link, denotationChar: "", target: "_self" };
              });
              let values;
              values = glossaryItems;
              if (searchTerm.length === 0) {
                renderList(values, searchTerm);
              } else {
                const matches = [];
                for (let i = 0; i < values.length; i++)
                  if (
                    ~values[i].value
                      .toLowerCase()
                      .indexOf(searchTerm.toLowerCase())
                  )
                    matches.push(values[i]);
                renderList(matches, searchTerm);
              }
            },
          },
        },
      };
    }
    return { modules: { toolbar: toolbarOptions } };
  }, [dataProvider, props.project]);

  return <RichTextInput {...props} classes={classes} options={modules} />;
};
