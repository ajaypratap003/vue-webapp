<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
    name: 'InputField',
    inheritAttrs: false,
    props: {
        value: {
            type: String as PropType<string>,
            required: false,
        },
        label: {
            type: String as PropType<string>,
            default: '',
        },
        type: {
            type: String as PropType<string>,
            default: 'text',
        },
        placeholder: {
            type: String as PropType<string>,
            default: 'Enter text here',
        },
        name: {
            type: String as PropType<string>,
            default: 'input-field',
        },
        error: {
            type: String as PropType<string | null>,
            default: '',
        },
    },
    emits: ['change:value'],
    setup(props, { emit }) {
        const onChangeValue = (event: Event) => {
            const target = event.target as HTMLInputElement;
            emit('change:value', target.value);
        };

        return {
            onChangeValue,
        };
    },
});
</script>

<template>
    <div class="input-field">
        <label :for="name" v-if="label">{{ label }}</label>
        <input
            :id="name"
            :type="type"
            :placeholder="placeholder"
            :value="value"
            @input="onChangeValue"
            @change="onChangeValue"
            v-bind="$attrs"
        />
        <span v-if="error" class="error">{{ error }}</span>
    </div>
</template>

<style scoped>
.input-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    width: 400px;
}

label {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}
.error {
    color: red;
    font-size: 0.9em;
}
</style>