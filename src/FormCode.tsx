import React, { useState } from 'react';
import { useFormBuilderStore } from './store';
import { convertStoreToSchemas } from './convertToSchemas';

export const FormCode = () => {
    const store = useFormBuilderStore();
    const { fieldsSchema, uiSchema } = convertStoreToSchemas(store);
    const [fieldsCopied, setFieldsCopied] = useState(false);
    const [uiCopied, setUiCopied] = useState(false);

    const handleCopy = (
        text: string,
        setCopied: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="columns is-multiline">
            <div className="column is-half">
                <div className="is-flex is-align-items-center">
                    <h2 className="title mb-0 is-5 mr-2">Fields Schema</h2>
                    <button
                        className="button is-small"
                        onClick={() =>
                            handleCopy(
                                JSON.stringify(fieldsSchema, null, 2),
                                setFieldsCopied
                            )
                        }
                    >
                        {fieldsCopied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <pre style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {JSON.stringify(fieldsSchema, null, 2)}
                </pre>
            </div>
            <div className="column is-half">
                <div className="is-flex is-align-items-center">
                    <h2 className="title mb-0 is-5 mr-2">UI Schema</h2>
                    <button
                        className="button is-small"
                        onClick={() =>
                            handleCopy(
                                JSON.stringify(uiSchema, null, 2),
                                setUiCopied
                            )
                        }
                    >
                        {uiCopied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <pre style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {JSON.stringify(uiSchema, null, 2)}
                </pre>
            </div>
        </div>
    );
};
