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

    uiSchema['ui:order'] = sortedFields.map((field) =>
        field.title.replace(/\s+/g, '_').toLowerCase()
    );

    store.fields.forEach((field) => {
        const fieldName = field.title.replace(/\s+/g, '_').toLowerCase();

        let fieldSchema;
        let uiFieldSchema = {};

        switch (field.type) {
            case 'string_input':
                fieldSchema = {
                    title: field.title,
                    type: 'string',
                    default: field.default,
                };
                break;

            case 'string_textarea':
                fieldSchema = {
                    title: field.title,
                    type: 'string',
                    default: field.default,
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
                    type: 'boolean',
                    default: field.default,
                };
                break;

            case 'boolean_radio':
                fieldSchema = {
                    title: field.title,
                    type: 'boolean',
                    default: field.default,
                };
                uiFieldSchema = { 'ui:widget': 'radio' };
                break;

            case 'number_input':
                fieldSchema = {
                    title: field.title,
                    type: 'integer',
                    default: field.default,
                };
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
