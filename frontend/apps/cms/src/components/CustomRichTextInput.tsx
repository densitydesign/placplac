import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  PropTypes,
  Theme,
} from '@material-ui/core';
// eslint-disable-next-line import/no-webpack-loader-syntax
import contentUiCss from '!!raw-loader!../../../../libs/shared/styles/src/index.css';

import { InputProps, useGetMany } from 'ra-core';
import { Editor } from '@tinymce/tinymce-react';
import { ComponentProps, useMemo, useRef } from 'react';
import { FieldTitle, InputHelperText, useInput } from 'react-admin';

const useStyles = makeStyles<Theme, CustomRichTextInputProps>((theme) => ({
  label: { position: 'relative' },
}));

interface CustomRichTextInputProps extends InputProps {
  label?: string | false;
  source: string;

  fullWidth?: boolean;
  helperText?: ComponentProps<typeof InputHelperText>['helperText'];
  record?: Record<any, any>;
  resource?: string;
  placeholder?: string;
  variant?: string;
  margin?: PropTypes.Margin;
  small?: boolean;
  glossaryTermsIds?: number[];
  referencesIds?: number[];
  onlyStyle?: boolean;
}

function useReferences(referencesIds: number[]) {
  const { data, loading } = useGetMany('references', referencesIds, {
    enabled: referencesIds.length > 0,
  });
  const actualData = useMemo(() => {
    if (data && data.length > 0) {
      return data
        .filter((record) => !!record)
        .map((record) => {
          return {
            value: record.id.toString() as any,
            text: record.description,
          };
        });
    }
    return [];
  }, [data]);
  return { data: actualData, loading };
}

function useGlossaryTerms(glossaryTermsIds: number[]) {
  const { data, loading } = useGetMany('glossary-terms', glossaryTermsIds, {
    enabled: glossaryTermsIds.length > 0,
  });
  const actualData = useMemo(() => {
    if (data && data.length > 0) {
      return data
        .filter((record) => !!record)
        .map((record) => {
          return {
            value: record,
            text: record.title,
          };
        });
    }
    return [];
  }, [data]);
  return { data: actualData, loading };
}

export const CustomRichTextInput = (props: CustomRichTextInputProps) => {
  const {
    fullWidth = true,
    helperText,
    placeholder,
    label,
    source,
    resource,
    variant,
    margin = 'dense',
    small,
    referencesIds = [],
    glossaryTermsIds = [],
    onlyStyle = false,

    ...rest
  } = props;

  const {
    id,
    isRequired,
    input: { value, onChange },
    meta: { touched, error },
  } = useInput({ source, ...rest });

  const { data: glossaryItems, loading: loadingG } =
    useGlossaryTerms(glossaryTermsIds);

  const { data: referenceItems, loading: loadirngR } =
    useReferences(referencesIds);

  const classes = useStyles(props);

  const editorRef = useRef<any>(null);
  return !loadingG && !loadirngR ? (
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
        className={error ? 'ra-rich-text-input-error' : ''}
      >
        <InputHelperText
          error={error}
          helperText={helperText}
          touched={!!touched}
        />
      </FormHelperText>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        tinymceScriptSrc={'/assets/tinymce/js/tinymce/tinymce.min.js'}
        value={value}
        onEditorChange={onChange}
        init={{
          height: small ? 250 : 500,
          menubar: false,
          branding: false,
          placeholder,

          plugins: [
            'noneditable emoticons',
            'advlist autolink lists link charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste help wordcount',
          ],
          toolbar: onlyStyle
            ? 'undo redo | bold italic underline | '
            : 'undo redo | formatselect | ' +
              'bold italic underline backcolor forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent emoticons table image link example | ' +
              'removeformat  | help ',
          content_style: contentUiCss,
          body_class: 'main-application',
          init_instance_callback: (editor) => {
            //set reference numbers
            referenceItems.forEach((reference, index) => {
              const references = editor.contentDocument.querySelectorAll(
                `[data-reference="${reference.value}"]`
              );
              references.forEach((reference) => {
                reference.innerHTML = `${index + 1}`;
              });
            });
          },
          setup: (editor) => {
            const getMatchedChars = function (pattern: string) {
              console.log(pattern);
              if (pattern === '') return glossaryItems;
              return glossaryItems.filter(function (char) {
                return char.text.indexOf(pattern) !== -1;
              });
            };

            const openDialog = function () {
              return editor.windowManager.open({
                title: 'References',
                body: {
                  type: 'panel',
                  items: [
                    {
                      type: 'selectbox', // component type
                      name: 'reference', // identifier
                      label: 'Select reference',
                      items: referenceItems,
                    },
                  ],
                },
                buttons: [
                  {
                    type: 'cancel',
                    text: 'Close',
                  },
                  {
                    type: 'submit',
                    text: 'Save',
                    primary: true,
                  },
                ],
                onSubmit: function (api) {
                  const data = api.getData() as any;
                  /* Insert content when the window form is submitted */
                  const text = editor.selection.getContent({
                    format: 'html',
                  });
                  const index = referenceItems.findIndex(
                    (reference) => reference.value === data.reference
                  );
                  const html = `${text}<sup class="toReferenceTag mceNonEditable">
                        [<a data-reference="${
                          data.reference
                        }" href='#reference${data.reference}'>
                          ${index + 1}
                        </a>]</sup>`;
                  editor.insertContent(html);
                  api.close();
                },
              });
            };
            /* Add a button that opens a window */
            editor.ui.registry.addButton('example', {
              text: 'Add reference',
              onAction: function () {
                /* Open window */
                openDialog();
              },
            });

            editor.ui.registry.addAutocompleter('glossary_autocomplete', {
              ch: '#',
              minChars: 0,
              columns: 1,
              highlightOn: ['char_name'],
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
                  const results = getMatchedChars(pattern).map(function (char) {
                    return {
                      type: 'cardmenuitem',
                      value: char.value,
                      label: char.text,
                      items: [
                        {
                          type: 'cardcontainer',
                          direction: 'vertical',
                          items: [
                            {
                              type: 'cardtext',
                              text: char.text,
                              name: 'char_name',
                            },
                            {
                              type: 'cardtext',
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
  ) : null;
};
