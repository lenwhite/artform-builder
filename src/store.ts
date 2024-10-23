import { create } from 'zustand';

export type Field = {
    order: number;
    type:
        | 'string_input'
        | 'string_textarea'
        | 'string_picker'
        | 'string_radio'
        | 'date'
        | 'email'
        | 'url'
        | 'checkbox'
        | 'boolean_radio'
        | 'number_input'
        | 'number_radio'
        | 'camera_upload'
        | 'file_upload';
    title: string;
    default: string | number | boolean | null;
    required: boolean;
    enum?: (string | number)[];
    enumNames?: string[];
    helpText?: string;
};

export type FormBuilderStore = {
    formTitle: string;
    formDescription: string;
    fields: Field[];
    setFormTitle: (title: string) => void;
    setFormDescription: (description: string) => void;
    addField: (field: Field) => void;
    removeField: (fieldIndex: number) => void;
};

export const useFormBuilderStore = create<FormBuilderStore>()((set) => ({
    formTitle: 'Untitled Form',
    formDescription: 'No description',
    fields: [],
    setFormTitle: (title) => set(() => ({ formTitle: title })),
    setFormDescription: (description) =>
        set(() => ({ formDescription: description })),
    addField: (field) => set((state) => ({ fields: [...state.fields, field] })),
    removeField: (fieldIndex) =>
        set((state) => ({
            fields: state.fields.filter((_, index) => index !== fieldIndex),
        })),
}));
