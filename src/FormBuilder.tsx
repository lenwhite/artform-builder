import React from 'react';
import { useFormBuilderStore } from './store';
import AddFieldRow from './AddFieldRow';
import { FormCode } from './FormCode';

const FormBuilder: React.FC = () => {
    const store = useFormBuilderStore();

    const { formTitle, setFormTitle, formDescription, setFormDescription } =
        store;

    return (
        <div className="container">
            <h1 className="title">Artform Builder</h1>
            <div className="field">
                <label className="label" htmlFor="formTitle">
                    Form Title:
                </label>
                <div className="control">
                    <input
                        className="input"
                        id="formTitle"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="formDescription">
                    Form Description:
                </label>
                <div className="control">
                    <textarea
                        className="textarea"
                        id="formDescription"
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                    />
                </div>
            </div>
            <AddFieldRow />
            <FormCode />
        </div>
    );
};

export default FormBuilder;
