import React from 'react';
import { useFormBuilderStore } from './store';
import FieldPreview from './FieldPreview';

const FieldsPreview = () => {
    const { fields, removeField, moveField } = useFormBuilderStore();

    return (
        <div>
            {fields.map((field, index) => (
                <FieldPreview
                    key={field.order}
                    field={field}
                    onDelete={() => removeField(index)}
                    onMoveDown={
                        index < fields.length - 1
                            ? () => moveField(index, index + 1)
                            : undefined
                    }
                    onMoveUp={
                        index > 0
                            ? () => moveField(index, index - 1)
                            : undefined
                    }
                />
            ))}
        </div>
    );
};

export default FieldsPreview;
