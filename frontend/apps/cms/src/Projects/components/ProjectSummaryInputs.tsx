import { SelectInput, TextInput, required, maxLength } from 'react-admin';
import { STATUS_CHOICES, LANGUAGE_CHOICES } from '../../choices';
import { CustomRichTextInput } from '../../components/CustomRichTextInput';

export const ProjectSummaryInputs = () => {
  return (
    <>
      <SelectInput
        defaultValue="2"
        choices={STATUS_CHOICES}
        source="status"
        helperText="Is the project ready?"
      />
      <SelectInput
        defaultValue="en"
        choices={LANGUAGE_CHOICES}
        source="language"
        helperText="The language of the project"
      />
      <TextInput
        source="title"
        label="Title (70)"
        fullWidth
        validate={[required(), maxLength(70)]}
        helperText="The project title"
      />

      <CustomRichTextInput
        fullWidth
        placeholder="A good idea is to fill this area with a short but effective description"
        label="Description (255)"
        source="short_description"
        small
        helperText={'A small summary description'}
      />
      <CustomRichTextInput
        fullWidth
        placeholder="Explain the project in few lines"
        label="Small project explanation (255)"
        source="project_explanation"
        small
        helperText={'An explanation of the project objective'}
      />
      <CustomRichTextInput
        placeholder="A good idea is to fill this area with the main concept of the project."
        helperText={'Describe the project'}
        label="About the project"
        source="long_description"
      />
    </>
  );
};
