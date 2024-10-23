import React from 'react';
import { useForm } from 'react-hook-form';
import { useFormBuilderStore, Field } from './store';

const fieldTypeMapping: Record<string, Field['type']> = {
    'Enter number': 'number_input',
    'Enter text': 'string_input',
    'Enter text (multiple lines)': 'string_textarea',
    'Choose option from list': 'string_picker',
    'Choose number from list': 'string_radio',
    'Choose yes or no': 'boolean_radio',
    Checkboxes: 'checkbox',
    'Enter date': 'date',
    'Take a picture': 'camera_upload',
    'Upload a file': 'file_upload',
};

type FormValues = {
    required: string;
    title: string;
    helpText: string;
    fieldType: Field['type'];
};

export const AddFieldRow = () => {
    const store = useFormBuilderStore();
    const { addField } = store;
    const fieldLength = useFormBuilderStore((state) => state.fields.length);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            title: '',
            helpText: '',
            fieldType: 'string_input',
            required: 'true',
        },
    });

    const onSubmit = (data: FormValues) => {
        addField({
            order: fieldLength + 1,
            title: data.title,
            helpText: data.helpText,
            type: data.fieldType,
            required: data.required === 'true',
            default: null,
        });
        // Reset form state
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="field is-grouped is-grouped-multiline"
        >
            <div className="control">
                <label className="label">Question</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Title"
                    {...register('title', { required: true })}
                />
                {errors.title && <p className="error">Title is required</p>}
            </div>
            <div className="control">
                <label className="label">Help text</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Help Text"
                    {...register('helpText')}
                />
            </div>
            <div className="control">
                <label className="label">Answer type</label>
                <div className="select">
                    <select {...register('fieldType')}>
                        {Object.keys(fieldTypeMapping).map((key) => (
                            <option key={key} value={fieldTypeMapping[key]}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="control">
                <label className="label">Required</label>
                <div className="select">
                    <select {...register('required')}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
            <div
                className="control has-text-centered"
                style={{ alignSelf: 'flex-end' }}
            >
                <button className="button is-primary" type="submit">
                    Add Field
                </button>
            </div>
        </form>
    );
};

export default AddFieldRow;
