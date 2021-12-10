import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  Theme,
} from "@material-ui/core";
import RichTextInput, { RichTextInputProps } from "ra-input-rich-text";

import "quill-mention";
import "quill-emoji";
import "quill-emoji/dist/quill-emoji.css";
import "quill-mention/dist/quill.mention.css";
import { useDataProvider } from "ra-core";
import { Editor } from "@tinymce/tinymce-react";

import { useMemo, useRef, useState } from "react";
import {
  FieldTitle,
  InputHelperText,
  TextInputProps,
  useInput,
} from "react-admin";
const useStyles = makeStyles<Theme, CustomRichTextInputProps>((theme) => ({
  "@global": {
    ".ra-rich-text-input": {
      "& .ql-editor": {
        minHeight: "300px",
        backgroundColor: "unset",
      },
      "& .ql-container": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
      },
      "& .small": {
        "& .ql-editor": {
          minHeight: "150px",
        },
      },
    },
  },
  label: { position: "relative" },
}));
interface CustomRichTextInputProps extends TextInputProps {
  project?: number;
  small?: boolean;
}
export const CustomRichTextInput = (props: CustomRichTextInputProps) => {
  const dataProvider = useDataProvider();
  const {
    options = {}, // Quill editor options
    toolbar = true,
    fullWidth = true,
    classes: classesOverride,
    configureQuill,
    helperText,
    label,
    source,
    resource,
    variant,
    margin = "dense",
    project,
    small,
    ...rest
  } = props;
  const {
    id,
    isRequired,
    input: { value, onChange },
    meta: { touched, error },
  } = useInput({ source, ...rest });
  const classes = useStyles(props);
  const modules = useMemo(() => {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ["clean"],
      ["emoji"],
    ];
    const mentionModule = {
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
                ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
              )
                matches.push(values[i]);
            renderList(matches, searchTerm);
          }
        },
      },
    };

    return {
      modules: {
        toolbar: toolbarOptions,
        "emoji-toolbar": true,
        "emoji-shortname": true,
        ...(props.project ? mentionModule : {}),
      },
    };
  }, [dataProvider, props.project]);
  const editorRef = useRef<any>(null);
  const [j, setJ] = useState<number>();
  console.log(j);
  return (
    <FormControl
      error={!!(touched && error)}
      fullWidth={fullWidth}
      className="ra-rich-text-input"
      margin={margin}
    >
      <InputLabel shrink htmlFor={id} className={classes.label}>
        <FieldTitle
          label={label}
          source={source}
          resource={resource}
          isRequired={isRequired}
        />
      </InputLabel>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        tinymceScriptSrc={
          process.env.PUBLIC_URL + "/tinymce/js/tinymce/tinymce.min.js"
        }
        value={value}
        onEditorChange={onChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "emoticons",
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat emoticons | help | myCustomToolbarButton",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          setup: (editor) => {
            editor.ui.registry.addButton("myCustomToolbarButton", {
              text: "My Custom Button",
              onAction: () => setJ(12),
            });
          },
        }}
      />
      <FormHelperText
        error={!!error}
        className={!!error ? "ra-rich-text-input-error" : ""}
      >
        <InputHelperText
          error={error}
          helperText={helperText}
          touched={!!touched}
        />
      </FormHelperText>
    </FormControl>
  );
};
