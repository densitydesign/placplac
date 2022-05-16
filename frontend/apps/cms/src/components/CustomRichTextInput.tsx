import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  PropTypes,
  Theme,
} from '@mui/material';
// eslint-disable-next-line import/no-webpack-loader-syntax
import contentUiCss from '!!raw-loader!../../../../libs/shared/styles/src/index.css';

import {
  CommonInputProps,
  InputProps,
  useGetMany,
  useResourceContext,
} from 'react-admin';
import { Editor } from '@tinymce/tinymce-react';
import { ComponentProps, useEffect, useMemo, useRef } from 'react';
import { FieldTitle, InputHelperText, useInput } from 'react-admin';
import { Box } from '@mui/material';
import { GlossaryTerm, Reference } from '@algocount/shared/types';
import { Editor as TinyMCEEditor } from 'tinymce';

interface CustomRichTextInputProps extends CommonInputProps {
  label?: string | false;
  source: string;

  fullWidth?: boolean;
  record?: Record<any, any>;
  resource?: string;
  placeholder?: string;

  small?: boolean;
  glossaryTermsIds?: number[];
  referencesIds?: number[];
  onlyStyle?: boolean;
}

export const CustomRichTextInput = (props: CustomRichTextInputProps) => {
  const {
    defaultValue = '',
    fullWidth,
    helperText,
    label,
    source,
    referencesIds = [],
    glossaryTermsIds = [],
    small,
    placeholder,
    onlyStyle,
  } = props;

  const {
    id,
    isRequired,
    field,
    fieldState,
    formState: { isSubmitted },
  } = useInput({ ...props, source, defaultValue });
  const { error, invalid, isTouched } = fieldState;
  const resource = useResourceContext(props);
  const { data: unformattedGlossaryItems, isLoading: loadingG } =
    useGetMany<GlossaryTerm>(
      'glossary-terms',
      { ids: glossaryTermsIds },
      {
        enabled: glossaryTermsIds.length > 0,
        initialData: [],
      }
    );

  const glossaryItems = useMemo(() => {
    if (unformattedGlossaryItems && unformattedGlossaryItems.length > 0) {
      return unformattedGlossaryItems
        .filter((record) => !!record)
        .map((record) => {
          return {
            value: record.id.toString(),
            text: record.title,
          };
        });
    }
    return [];
  }, [unformattedGlossaryItems]);

  const { data: unformattedReferences, isLoading: loadingR } =
    useGetMany<Reference>(
      'references',
      { ids: referencesIds },
      {
        enabled: referencesIds.length > 0,
        initialData: [],
      }
    );
  const referenceItems = useMemo(() => {
    if (unformattedReferences && unformattedReferences.length > 0) {
      return unformattedReferences
        .filter((record) => !!record)
        .map((record) => {
          return {
            value: record.id.toString(),
            text: record.description,
          };
        });
    }
    return [];
  }, [unformattedReferences]);
  const editor = useRef<any>(null);
  const rerenderKey =
    JSON.stringify(glossaryItems) + JSON.stringify(referenceItems);

  return !loadingG && !loadingR ? (
    <FormControl
      style={{ marginTop: '20px' }}
      error={(isTouched || isSubmitted) && invalid}
      fullWidth={fullWidth}
      className="ra-rich-text-input"
    >
      <InputLabel shrink htmlFor={id}>
        <FieldTitle
          label={label}
          source={source}
          resource={resource}
          isRequired={isRequired}
        />
      </InputLabel>
      <Box mt={'8px'}>
        <Editor
          onInit={(evt, editorInit) => (editor.current = editorInit)}
          tinymceScriptSrc={'/assets/tinymce/js/tinymce/tinymce.min.js'}
          value={field.value ?? ''}
          onEditorChange={(a, editor) => {
            console.log(a, editor);
            field.onChange(a);
          }}
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
                'alignright alignjustify | bullist numlist outdent indent emoticons table image link example glossary | ' +
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
              const openDialogGlossary = function () {
                return editor.windowManager.open({
                  title: 'Glossary ',
                  body: {
                    type: 'panel',
                    items: [
                      {
                        type: 'selectbox', // component type
                        name: 'glossaryterm', // identifier
                        label: 'Select glossary term',
                        items: glossaryItems,
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
                    const term = unformattedGlossaryItems!.find(
                      (glossaryTerm) =>
                        glossaryTerm.id.toString() ===
                        data.glossaryterm.toString()
                    ) as any;
                    if (term) {
                      const html = `
                    <span class="mceNonEditable mention" style="background-color:${term.color}"> 
                        <a href='#glossary/${term.id}'>
                            <span>${term.title}</span>
                        </a>
                    </span>`;
                      editor.insertContent(html);
                    }
                    api.close();
                  },
                });
              };
              /* Add a button that opens a window */
              editor.ui.registry.addButton('example', {
                text: 'Add reference',
                onAction: function () {
                  openDialog();
                },
              });
              editor.ui.registry.addButton('glossary', {
                text: 'Add glossary term',
                onAction: function () {
                  openDialogGlossary();
                },
              });
            },
          }}
        />
      </Box>
      <FormHelperText
        error={(isTouched || isSubmitted) && invalid}
        className={error ? 'ra-rich-text-input-error' : ''}
      >
        <InputHelperText
          helperText={
            (isTouched || isSubmitted) && invalid ? error?.message : helperText
          }
          touched={!!isTouched}
        />
      </FormHelperText>
    </FormControl>
  ) : null;
};
