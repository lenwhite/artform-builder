import { FormBuilderStore } from './store';

export function convertStoreToSchemas(store: FormBuilderStore) {
    const fieldsSchema = {
        type: 'object',
        title: store.formTitle,
        description: store.formDescription,
        properties: {} as Record<string, any>,
        required: [] as string[],
    };

    const uiSchema = {} as Record<string, any>;

    // Sort fields based on their order

    const sortedFields = [...store.fields].sort((a, b) => a.order - b.order);

    // Create the ui:order array to maintain the order in ui_schema

    uiSchema['ui:order'] = sortedFields.map((field) => field.order.toString());

    store.fields.forEach((field) => {
        const fieldName = field.order.toString();

        let fieldSchema;
        let uiFieldSchema = {};

        switch (field.type) {
            case 'string_input':
                fieldSchema = {
                    title: field.title,
                    type: 'string',
                };
                break;

            case 'string_textarea':
                fieldSchema = {
                    title: field.title,
                    type: 'string',
                };
                uiFieldSchema = { 'ui:widget': 'textarea' };
                break;

            case 'string_picker':
            case 'string_radio':
                fieldSchema = {
                    title: field.title,
                    type: 'string',
                    enum: field.enum,
                };
                uiFieldSchema = {
                    'ui:widget':
                        field.type === 'string_radio' ? 'radio' : 'select',
                };
                break;

            case 'date':
                fieldSchema = {
                    title: field.title,
                    type: 'string',
                    format: 'date',
                };
                break;

            case 'email':
                fieldSchema = {
                    title: field.title,
                    type: 'string',
                    format: 'email',
                };
                uiFieldSchema = {
                    'ui:help': 'Uses special email keyboard on mobile',
                };
                break;

            case 'url':
                fieldSchema = {
                    title: field.title,
                    type: 'string',
                    format: 'uri',
                };
                break;

            case 'checkbox':
                fieldSchema = {
                    title: field.title,
                    type: 'array',
                    items: {
                        enum: field.enum,
                        type: 'string',
                    },
                };
                break;

            case 'boolean_radio':
                fieldSchema = {
                    title: field.title,
                    type: 'boolean',
                };
                uiFieldSchema = { 'ui:widget': 'radio' };
                break;

            case 'number_input':
                fieldSchema = {
                    title: field.title,
                    type: 'integer',
                };
                break;

            case 'camera_upload':
                fieldSchema = {
                    title: field.title,
                    type: 'camera',
                };
                uiFieldSchema = { 'ui:widget': 'camera' };
                break;

            case 'file_upload':
                fieldSchema = {
                    title: field.title,
                    type: 'file',
                };
                uiFieldSchema = { 'ui:widget': 'file' };
                break;

            default:
                throw new Error(`Unsupported field type: ${field.type}`);
        }

        if (field.required) {
            fieldsSchema.required.push(fieldName);
        }

        fieldsSchema.properties[fieldName] = fieldSchema;
        uiSchema[fieldName] = uiFieldSchema;
    });

    return { fieldsSchema, uiSchema };
}
