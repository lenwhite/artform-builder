import React from 'react';
import { Field } from './store';
import { ArrowUp, ArrowDown, Trash2, Camera, File } from 'react-feather';

const FieldPreview = ({
    field,
    onMoveUp,
    onMoveDown,
    onDelete,
}: {
    field: Field;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    onDelete: () => void;
}) => {
    return (
        <div
            className="field-preview"
            style={{ border: '1px solid #dbdbdb', padding: '1rem' }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h3 className="title is-5 mb-0">{field.title}</h3>
                <div className="buttons has-addons">
                    {onMoveUp && (
                        <button
                            className="button is-small is-info"
                            onClick={onMoveUp}
                        >
                            <span className="icon">
                                <ArrowUp size={16} />
                            </span>
                        </button>
                    )}
                    {onMoveDown && (
                        <button
                            className="button is-small is-info"
                            onClick={onMoveDown}
                        >
                            <span className="icon">
                                <ArrowDown size={16} />
                            </span>
                        </button>
                    )}
                    <button
                        className="button is-small is-danger"
                        onClick={onDelete}
                    >
                        <span className="icon">
                            <Trash2 size={16} />
                        </span>
                    </button>
                </div>
            </div>
            <p className="help mt-0 mb-2">{field.helpText}</p>
            <div className="control">
                {field.type === 'string_input' && (
                    <input
                        className="input"
                        type="text"
                        placeholder="Type your answer here"
                    />
                )}
                {field.type === 'string_textarea' && (
                    <textarea
                        className="textarea"
                        defaultValue={field.default as string}
                        placeholder="Type your answer here"
                    />
                )}
                {field.type === 'string_radio' &&
                    field.enum &&
                    field.enum.map((option, index) => (
                        <label className="radio mr-6" key={field.title + index}>
                            <input
                                type="radio"
                                value={option}
                                className="mr-2"
                            />
                            {field.enumNames ? field.enumNames[index] : option}
                        </label>
                    ))}
                {field.type === 'date' && (
                    <input className="input" type="date" />
                )}
                {field.type === 'email' && (
                    <input className="input" type="email" />
                )}
                {field.type === 'url' && <input className="input" type="url" />}
                {field.type === 'checkbox' &&
                    field.enum &&
                    field.enum.map((option, index) => (
                        <label className="checkbox mr-6" key={index}>
                            <input
                                type="checkbox"
                                value={option}
                                className="mr-2"
                            />
                            {field.enumNames ? field.enumNames[index] : option}
                        </label>
                    ))}
                {field.type === 'boolean_radio' && (
                    <>
                        <label className="radio mr-6">
                            <input type="radio" value="true" className="mr-2" />
                            Yes
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="false"
                                className="mr-2"
                            />
                            No
                        </label>
                    </>
                )}
                {field.type === 'number_input' && (
                    <input className="input" type="number" />
                )}
                {field.type === 'number_radio' &&
                    field.enum &&
                    field.enum.map((option, index) => (
                        <label className="radio" key={index}>
                            <input
                                type="radio"
                                name={field.title}
                                value={option}
                            />
                            {field.enumNames ? field.enumNames[index] : option}
                        </label>
                    ))}
                {field.type === 'camera_upload' && (
                    <div>
                        <button className="button is-primary">
                            <span className="icon-text">
                                <span className="icon">
                                    <Camera size={16} />
                                </span>
                                <span>Open camera</span>
                            </span>
                        </button>
                    </div>
                )}
                {field.type === 'file_upload' && (
                    <div>
                        <button className="button is-primary">
                            <span className="icon-text">
                                <span className="icon">
                                    <File size={16} />
                                </span>
                                <span>Choose file</span>
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FieldPreview;
