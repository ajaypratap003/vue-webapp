<template>
    <div class="dropdown">
        <label :for="id" class="dropdown-label">{{ label }}</label>
        <select :id="id" class="dropdown-select" v-model="selectedValue" @change="onChange"   v-bind="$attrs">
            <option v-for="{label, value} in options" :key="value" :value="value">
                {{ label }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

interface DropdownOption {
    label: string;
    value: string | number;
}

export default defineComponent({
    name: 'Dropdown',
    inheritAttrs: false,
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        options: {
            type: Array as PropType<DropdownOption[]>,
            required: true,
        },
        modelValue: {
            type: [String, Number] as PropType<string | number>,
            required: true,
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            selectedValue: this.modelValue,
        };
    },
    watch: {
        modelValue(newValue) {
            this.selectedValue = newValue;
        },
    },
    methods: {
        onChange() {
            this.$emit('update:modelValue', this.selectedValue);
        },
    },
});
</script>

<style scoped>
.dropdown {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.dropdown-label {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.dropdown-select {
    padding: 0.5rem;
    font-size: 1rem;
}
</style>