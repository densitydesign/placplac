import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  Theme,
} from "@material-ui/core";
// import "./mention.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import contentUiCss from "!!raw-loader!frontend-components/dist/index.css";

import { useGetList, useGetMany, useGetOne } from "ra-core";
import { Editor } from "@tinymce/tinymce-react";
import { useMemo, useRef } from "react";
import {
  FieldTitle,
  InputHelperText,
  TextInputProps,
  useInput,
} from "react-admin";

const useStyles = makeStyles<Theme, CustomRichTextInputProps>((theme) => ({
  label: { position: "relative" },
}));

interface CustomRichTextInputProps extends TextInputProps {
  project?: number;
  small?: boolean;
}

export const CustomRichTextInput = (props: CustomRichTextInputProps) => {
  const {
    options,
    toolbar,
    fullWidth = true,
    classes: classesOverride,
    configureQuill,
    helperText,
    placeholder,
    label,
    source,
    resource,
    variant,
    margin = "dense",
    project: projectId,
    small,
    ...rest
  } = props;

  const {
    id,
    isRequired,
    input: { value, onChange },
    meta: { touched, error },
  } = useInput({ source, ...rest });

  const { ids, data } = useGetList(
    "glossary-terms",
    { page: 1, perPage: Infinity },
    { field: "title", order: "ASC" },
    {
      project: props.project,
    },
    { enabled: !!props.project }
  );
  const glossaryItems = useMemo(() => {
    if (props.project && data) {
      return ids.map((id) => {
        const record = data[id];
        return {
          value: record,
          text: record.title,
        };
      });
    }
    return [];
  }, [data, ids, props.project]);

  const { ids: idsReferences, data: references } = useGetList(
    "references",
    { page: 1, perPage: Infinity },
    { field: "title", order: "ASC" },
    {
      project: props.project,
    },
    { enabled: !!props.project }
  );

  const referenceItems = useMemo(() => {
    if (props.project && references) {
      return idsReferences.map((id) => {
        const record = references[id];
        return {
          value: id.toString() as any,
          text: record.title,
        };
      });
    }
    return [];
  }, [idsReferences, props.project, references]);

  const classes = useStyles(props);

  const editorRef = useRef<any>(null);
  return (
    <>
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
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          tinymceScriptSrc={
            process.env.PUBLIC_URL + "/tinymce/js/tinymce/tinymce.min.js"
          }
          value={value}
          onEditorChange={onChange}
          init={{
            height: small ? 250 : 500,
            menubar: false,
            branding: false,
            placeholder,
            plugins: [
              "noneditable emoticons",
              "advlist autolink lists link charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent emoticons table image link example | " +
              "removeformat  | help ",
            content_style: contentUiCss,
            body_class: "main-application",
            setup: (editor) => {
              const getMatchedChars = function (pattern: string) {
                console.log(pattern);
                if (pattern === "") return glossaryItems;
                return glossaryItems.filter(function (char) {
                  return char.text.indexOf(pattern) !== -1;
                });
              };

              const openDialog = function () {
                return editor.windowManager.open({
                  title: "References",
                  body: {
                    type: "panel",
                    items: [
                      {
                        type: "selectbox", // component type
                        name: "reference", // identifier
                        label: "Select reference",
                        items: referenceItems,
                      },
                    ],
                  },
                  buttons: [
                    {
                      type: "cancel",
                      text: "Close",
                    },
                    {
                      type: "submit",
                      text: "Save",
                      primary: true,
                    },
                  ],
                  onSubmit: function (api) {
                    const data = api.getData() as any;
                    /* Insert content when the window form is submitted */
                    const text = editor.selection.getContent({
                      format: "html",
                    });
                    const index = referenceItems.findIndex(
                      (reference) => reference.value === data.reference
                    );
                    const html = `${text}<sup class="toReferenceTag mceNonEditable"  data-reference="${
                      data.reference
                    }">
                        [<a href='#reference${data.reference}'>
                            <span>${index + 1}</span>
                        </a>]</sup>`;
                    editor.insertContent(html);
                    api.close();
                  },
                });
              };
              /* Add a button that opens a window */
              editor.ui.registry.addButton("example", {
                text: "Add reference",
                onAction: function () {
                  /* Open window */
                  openDialog();
                },
              });

              editor.ui.registry.addAutocompleter("glossary_autocomplete", {
                ch: "#",
                minChars: 0,
                columns: 1,
                highlightOn: ["char_name"],
                onAction: (api, rng, value: any) => {
                  const html = `
                    <span class="mceNonEditable mention" style="background-color:${value.color}"> 
                        <a href='#glossary/${value.id}'>
                            <span>${value.title}</span>
                        </a>
                    </span>`;

                  editor.selection.setRng(rng);
                  editor.insertContent(html);
                  api.hide();
                },
                fetch: function (pattern) {
                  return new Promise(function (resolve) {
                    var results = getMatchedChars(pattern).map(function (char) {
                      return {
                        type: "cardmenuitem",
                        value: char.value,
                        label: char.text,
                        items: [
                          {
                            type: "cardcontainer",
                            direction: "vertical",
                            items: [
                              {
                                type: "cardtext",
                                text: char.text,
                                name: "char_name",
                              },
                              {
                                type: "cardtext",
                                text: char.value.category_title,
                              },
                            ],
                          },
                        ],
                      };
                    }) as any;
                    resolve(results);
                  });
                },
              });
            },
          }}
        />
      </FormControl>
    </>
  );
};
