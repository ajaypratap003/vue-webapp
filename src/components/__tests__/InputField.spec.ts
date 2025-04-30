import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import InputField  from '../InputField/InputField.vue';

describe("InputField",()=>{
    it('should exist InputField component in dom',()=>{
        const wrapper=mount(InputField);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render label as by default label is hidden',()=>{
        const wrapper=mount(InputField, {props: {label: 'UserName'}});
        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('label').text()).toBe('UserName');
    });

    it('should label not render as by default label is hidden',()=>{
        const wrapper=mount(InputField);
        expect(wrapper.find('label').exists()).toBe(false);
    });

    it('should get the input on change event', async()=>{
        const wrapper=mount(InputField);
       
        wrapper.vm.$emit('change', 'test');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted()).toHaveProperty('change');
        expect(wrapper.emitted('change')).toHaveLength(1);
        expect(wrapper.emitted('change')?.[0]).toEqual(['test']);
        // assert event has been emitted
        expect(wrapper.emitted().change).toBeTruthy();
        // assert event count
        expect(wrapper.emitted().change.length).toBe(1);
    });
});