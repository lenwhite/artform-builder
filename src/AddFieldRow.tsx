import React, { useState } from 'react';
import { useFormBuilderStore, Field } from './store';

const fieldTypes = [
    'string_input',
    'string_textarea',
    'string_picker',
    'string_radio',
    'date',
    'email',
    'url',
    'checkbox',
    'boolean_radio',
    'number_input',
] as const;

type FieldType = (typeof fieldTypes)[number];

export const AddFieldRow = () => {
    const store = useFormBuilderStore();
    const { addField } = store;

    const [fieldType, setFieldType] = useState<FieldType>('string_input');
    const [title, setTitle] = useState<string>('');
    const [defaultValue, setDefaultValue] = useState<string | number | boolean>(
        ''
    );
    const [required, setRequired] = useState<boolean>(false);
    const [order, setOrder] = useState<number>(0);
    const [helpText, setHelpText] = useState<string>('');

    const handleAddField = (e: React.FormEvent) => {
        e.preventDefault();
        const newField: Field = {
            type: fieldType,
            title,
            default: defaultValue,
            required,
            order,
            helpText,
        };
        addField(newField);
    };

    return (
        <form
            onSubmit={handleAddField}
            className="field is-grouped is-grouped-multiline"
        >
            <div className="control">
                <label className="label">Field Type</label>
                <div className="select">
                    <select
                        value={fieldType}
                        onChange={(e) =>
                            setFieldType(e.target.value as FieldType)
                        }
                    >
                        {fieldTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="control">
                <label className="label">Title</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="control">
                <label className="label">Default Value</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Default Value"
                    value={defaultValue.toString()}
                    onChange={(e) => setDefaultValue(e.target.value)}
                />
            </div>
            <div className="control">
                <label className="label">Required</label>
                <div className="select">
                    <select
                        value={required ? 'true' : 'false'}
                        onChange={(e) => setRequired(e.target.value === 'true')}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
            <div className="control">
                <label className="label">Order</label>
                <input
                    className="input"
                    type="number"
                    placeholder="Order"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                />
            </div>
            <div className="control">
                <label className="label">Help Text</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Help Text"
                    value={helpText}
                    onChange={(e) => setHelpText(e.target.value)}
                />
            </div>
            <div
                className="control is-expanded has-text-centered"
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
