import React from 'react';
import { useForm } from 'react-hook-form';
import { useFormBuilderStore, Field } from './store';

const fieldTypeMapping: Record<string, Field['type']> = {
    'Enter text': 'string_input',
    'Enter text (multiple lines)': 'string_textarea',
    'Choose option from list': 'string_radio',
    'Enter number': 'number_input',
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
    options: string;
    description: string;
};

export const AddFieldRow = () => {
    const store = useFormBuilderStore();
    const { addField } = store;
    const fieldLength = useFormBuilderStore((state) => state.fields.length);

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            title: '',
            helpText: '',
            fieldType: 'string_input',
            required: 'true',
            options: 'Option 1, Option 2',
            description: '',
        },
    });

    const onSubmit = (data: FormValues) => {
        const field: Field = {
            order: fieldLength + 1,
            title: data.title,
            helpText: data.helpText,
            type: data.fieldType,
            required: data.required === 'true',
            description: data.description,
            default: null,
        };
        if (data.fieldType === 'boolean_radio') {
            field.enum = ['Yes', 'No'];
            field.enumNames = ['Yes', 'No'];
        }
        if (
            data.fieldType === 'string_radio' ||
            data.fieldType === 'checkbox'
        ) {
            field.enum = data.options.split(',').map((option) => option.trim());
            field.enumNames = field.enum as string[];
        }
        addField(field);
        // Reset form state
        reset();
    };

    const fieldType = watch('fieldType');

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="fixed-grid has-6-cols"
        >
            <div className="grid">
                <div className="cell control is-col-span-2">
                    <label className="label">Question title</label>
                    <input
                        className="input"
                        type="text"
                        {...register('title', { required: true })}
                    />
                    {errors.title && <p className="error">Title is required</p>}
                </div>
                <div className="cell control">
                    <label className="label">Help text / subtitle</label>
                    <input
                        className="input"
                        type="text"
                        {...register('helpText')}
                    />
                </div>
                <div className="cell control">
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

                <div className="cell control">
                    <label className="label">Required</label>
                    <div className="select is-fullwidth">
                        <select {...register('required')}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
                <div className="cell control" style={{ alignSelf: 'flex-end' }}>
                    <button
                        className="button is-primary is-fullwidth"
                        type="submit"
                    >
                        Add Field
                    </button>
                </div>
                {(fieldType === 'string_radio' || fieldType === 'checkbox') && (
                    <div className="cell control is-col-span-5">
                        <label className="label">
                            Options (comma separated)
                        </label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Options"
                            {...register('options', { required: true })}
                        />
                        {errors.options && (
                            <p className="error">Options are required</p>
                        )}
                    </div>
                )}
                <div className="cell is-row-span-2 is-col-span-5 control">
                    <label className="label">Question description</label>
                    <textarea
                        className="textarea"
                        {...register('description')}
                    />
                </div>
            </div>
        </form>
    );
};

export default AddFieldRow;
