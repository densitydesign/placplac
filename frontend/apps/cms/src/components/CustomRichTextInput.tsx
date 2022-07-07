import { FormControl, FormHelperText, InputLabel } from '@mui/material';
// eslint-disable-next-line import/no-webpack-loader-syntax
import contentUiCss from '!!raw-loader!../../../../libs/shared/styles/src/index.css';

import { CommonInputProps, useResourceContext } from 'react-admin';
import { Editor } from '@tinymce/tinymce-react';
import { useMemo } from 'react';
import { FieldTitle, InputHelperText, useInput } from 'react-admin';
import { Box } from '@mui/material';
import { useProjectContext } from '../contexts/project-context';

interface CustomRichTextInputProps extends CommonInputProps {
  placeholder?: string;
  small?: boolean;
  onlyStyle?: boolean;
}

export const CustomRichTextInput = (props: CustomRichTextInputProps) => {
  const {
    defaultValue = '',
    helperText,
    label,
    source,
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

  const {
    glossaryTerms: unformattedGlossaryItems,
    references: unformattedReferences,
    anchors,
  } = useProjectContext();

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
  const rerenderKey =
    JSON.stringify(glossaryItems) + JSON.stringify(referenceItems);
  return (
    <FormControl
      style={{ marginTop: '20px' }}
      error={(isTouched || isSubmitted) && invalid}
      fullWidth={true}
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
          tinymceScriptSrc={'/assets/tinymce6/tinymce.min.js'}
          value={field.value ?? ''}
          onEditorChange={(a, editor) => {
            field.onChange(a);
          }}
          key={rerenderKey}
          init={{
            height: small ? 250 : 500,
            menubar: false,
            branding: false,
            placeholder,
            convert_urls: false,
            plugins: [
              'emoticons',
              'advlist',
              'autolink',
              'lists',
              'link',
              'charmap',
              'preview',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'help',
              'wordcount',
            ],
            extended_valid_elements: 'span[data-anchor-id|class]',
            toolbar: onlyStyle
              ? 'undo redo | bold italic underline | '
              : 'undo redo | formatselect | ' +
                'bold italic underline backcolor forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent emoticons table image link anchorsExperiment createAnchor example glossary | ' +
                'removeformat  | help ',
            content_style: contentUiCss,
            body_class: 'main-application',
            init_instance_callback: (editor) => {
              //set reference numbers
              unformattedReferences.forEach((reference, index) => {
                const references = editor.contentDocument.querySelectorAll(
                  `[data-reference="${reference.id.toString()}"]`
                );
                references.forEach((referenceEl) => {
                  referenceEl.innerHTML = `${reference.in_text_citation}`;
                });
              });

              const glossarySpans =
                editor.contentDocument.querySelectorAll<HTMLElement>(
                  'span.mention'
                );
              glossarySpans.forEach((span, index) => {
                const link = span.querySelector('a');
                const glossaryId = link?.hash.replace('#glossary/', '');
                const term = unformattedGlossaryItems!.find(
                  (term) => term.id.toString() === glossaryId
                );
                if (term) {
                  span.style.backgroundColor = term.color;
                }
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

                    const reference = unformattedReferences.find(
                      (reference) => reference.id.toString() === data.reference
                    );
                    const html = `${text}<span class="toReferenceTag referenceStyle mceNonEditable">
                        (<a data-reference="${
                          data.reference
                        }" href='#reference${data.reference}'>${
                      reference!.in_text_citation
                    }</a>)</span>`;
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
              const openDialogAnchors = function () {
                const text = editor.selection.getContent({
                  format: 'text',
                });
                return editor.windowManager.open({
                  title: 'Anchors',
                  initialData: { content: text, link: '' },
                  body: {
                    type: 'panel',
                    items: [
                      {
                        type: 'listbox', // component type
                        name: 'link', // identifier
                        label: 'Select anchor',
                        items: [{ text: 'None', value: '' }, ...anchors],
                      },
                      {
                        type: 'input', // component type
                        name: 'content', // identifier
                        inputMode: 'text',
                        label: 'Content', // text for the label
                        placeholder: 'Example', // placeholder text for the input
                        maximized: false, // grow width to take as much space as possible
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
                    if (!data?.link || !data?.content)
                      alert('Make sure you selected anchor and display value!');
                    else {
                      const html = `
                        <a class="anchorExperiments" data-href='${data.link}' href='${data.link}'>
                        ${data.content}
                        </a>`;
                      editor.insertContent(html);

                      api.close();
                    }
                  },
                });
              };
              const openDialogCreateAnchor = function () {
                return editor.windowManager.open({
                  title: 'Anchors',
                  body: {
                    type: 'panel',
                    items: [
                      {
                        type: 'input', // component type
                        name: 'anchor_id', // identifier
                        inputMode: 'text',
                        label: 'ID', // text for the label
                        placeholder: 'Example', // placeholder text for the input
                        maximized: false, // grow width to take as much space as possible
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
                    if (!data?.anchor_id)
                      alert('Make sure you defined the anchor id!');
                    else {
                      const html = `<span class="mce-item-anchor-exp mceNonEditable" data-anchor-id='${data.anchor_id}'></span>`;
                      editor.insertContent(html);

                      api.close();
                    }
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
              editor.ui.registry.addButton('anchorsExperiment', {
                text: 'Add link to anchor',
                onAction: function () {
                  openDialogAnchors();
                },
              });
              editor.ui.registry.addButton('createAnchor', {
                text: 'Create anchor',
                onAction: function () {
                  openDialogCreateAnchor();
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
  );
};
